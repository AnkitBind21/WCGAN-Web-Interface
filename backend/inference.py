import torch
import numpy as np
from PIL import Image
from model import Generator


def get_attr_vector(gender, smile):
    male = 1.0 if gender == "male" else 0.0
    smiling = 1.0 if smile else 0.0
    return np.array([male, smiling], dtype=np.float32)


def generate_face(generator, gender, smile, latent_dim=100, device=None):
    if device is None:
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    generator.eval()
    generator.to(device)

    with torch.no_grad():
        z = torch.randn(1, latent_dim, device=device)
        attrs = torch.from_numpy(get_attr_vector(gender, smile)).unsqueeze(0).to(device)
        attrs = attrs.float()

        fake = generator(z, attrs)
        fake = fake.squeeze(0).cpu()

    fake = fake * 0.5 + 0.5
    fake = fake.clamp(0, 1)
    fake = fake.numpy().transpose(1, 2, 0)
    fake = (fake * 255).astype(np.uint8)

    return Image.fromarray(fake)

import os

if __name__ == "__main__":
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    checkpoint_path = "checkpoints/wcgan_gp_epoch_30.pth"

    generator = Generator(latent_dim=100)

    checkpoint = torch.load(
        checkpoint_path,
        map_location=device
    )

    print("Checkpoint:", checkpoint_path)

    for k, v in checkpoint["generator_state_dict"].items():
        print(k, v.shape)
        break

    generator.load_state_dict(
        checkpoint["generator_state_dict"]
    )

    generator.to(device)

    os.makedirs("generated", exist_ok=True)

    samples = [
        ("male", True, "male_smiling.png"),
        ("male", False, "male_neutral.png"),
        ("female", True, "female_smiling.png"),
        ("female", False, "female_neutral.png"),
    ]

    for gender, smile, filename in samples:
        img = generate_face(
            generator,
            gender=gender,
            smile=smile,
            device=device
        )

        save_path = os.path.join("generated", filename)
        img.save(save_path)

        print(f"Saved: {save_path}")

    print("Generation complete.")