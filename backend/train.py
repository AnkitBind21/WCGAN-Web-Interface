import os
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, Dataset
from torchvision import transforms
from PIL import Image
import numpy as np
import pandas as pd
from model import Generator, Critic, compute_gradient_penalty


class CelebASubset(Dataset):
    def __init__(self, root_dir, attr_file, transform=None, subset_size=10000):
        self.root_dir = root_dir
        self.transform = transform

        df = pd.read_csv(attr_file)

        existing_files = set(os.listdir(root_dir))

        df = df[df["image_id"].isin(existing_files)]

        df = df.iloc[:subset_size]

        self.samples = [
            (
                row["image_id"],
                np.array(
                    [
                        1.0 if row["Male"] == 1 else 0.0,
                        1.0 if row["Smiling"] == 1 else 0.0,
                    ],
                    dtype=np.float32,
                ),
            )
            for _, row in df.iterrows()
        ]

    def __len__(self):
        return len(self.samples)

    def __getitem__(self, idx):
        img_name, attrs = self.samples[idx]
        img_path = os.path.join(self.root_dir, img_name)
        image = Image.open(img_path).convert("RGB")
        if self.transform:
            image = self.transform(image)
        return image, torch.from_numpy(attrs)


def train_wcgan_gp(
    data_root,
    attr_file,
    output_dir="checkpoints",
    latent_dim=100,
    batch_size=32,
    epochs=50,
    lr=0.0001,
    n_critic=3,
    lambda_gp=10,
    save_interval=10,
):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    os.makedirs(output_dir, exist_ok=True)

    transform = transforms.Compose([
        transforms.Resize(64),
        transforms.CenterCrop(64),
        transforms.ToTensor(),
        transforms.Normalize([0.5] * 3, [0.5] * 3),
    ])

    dataset = CelebASubset(data_root, attr_file, transform=transform)
    dataloader = DataLoader(dataset, batch_size=batch_size, shuffle=True, num_workers=2)

    generator = Generator(latent_dim=latent_dim).to(device)
    critic = Critic().to(device)

    opt_g = optim.Adam(generator.parameters(), lr=lr, betas=(0.5, 0.9))
    opt_c = optim.Adam(critic.parameters(), lr=lr, betas=(0.5, 0.9))

    print(f"Training on {device} | Dataset size: {len(dataset)} | Epochs: {epochs}")

    for epoch in range(1, epochs + 1):
        for i, (real_imgs, attrs) in enumerate(dataloader):
            batch = real_imgs.size(0)
            real_imgs = real_imgs.to(device)
            attrs = attrs.to(device)

            for _ in range(n_critic):
                z = torch.randn(batch, latent_dim, device=device)
                fake_imgs = generator(z, attrs).detach()

                real_validity = critic(real_imgs, attrs)
                fake_validity = critic(fake_imgs, attrs)
                gp = compute_gradient_penalty(critic, real_imgs, fake_imgs, attrs, device, lambda_gp)

                c_loss = fake_validity.mean() - real_validity.mean() + gp

                opt_c.zero_grad()
                c_loss.backward()
                opt_c.step()

            z = torch.randn(batch, latent_dim, device=device)
            fake_imgs = generator(z, attrs)
            fake_validity = critic(fake_imgs, attrs)
            g_loss = -fake_validity.mean()

            opt_g.zero_grad()
            g_loss.backward()
            opt_g.step()

            if i % 50 == 0:
                print(f"Epoch [{epoch}/{epochs}] Batch [{i}/{len(dataloader)}] "
                      f"C_loss: {c_loss.item():.4f} G_loss: {g_loss.item():.4f}")

        if epoch % save_interval == 0 or epoch == epochs:
            ckpt_path = os.path.join(output_dir, f"wcgan_gp_epoch_{epoch}.pth")
            torch.save({
                "epoch": epoch,
                "generator_state_dict": generator.state_dict(),
                "critic_state_dict": critic.state_dict(),
                "opt_g_state_dict": opt_g.state_dict(),
                "opt_c_state_dict": opt_c.state_dict(),
            }, ckpt_path)
            print(f"Checkpoint saved: {ckpt_path}")

    print("Training complete.")
    return generator, critic


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--data_root", required=True)
    parser.add_argument("--attr_file", required=True)
    parser.add_argument("--output_dir", default="checkpoints")
    parser.add_argument("--epochs", type=int, default=50)
    parser.add_argument("--batch_size", type=int, default=16)
    parser.add_argument("--lr", type=float, default=0.0001)
    args = parser.parse_args()

    train_wcgan_gp(
        data_root=args.data_root,
        attr_file=args.attr_file,
        output_dir=args.output_dir,
        epochs=args.epochs,
        batch_size=args.batch_size,
        lr=args.lr,
    )
