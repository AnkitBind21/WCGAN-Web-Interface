import torch
import torch.nn as nn


class Generator(nn.Module):
    def __init__(self, latent_dim=100, n_attrs=2, embed_dim=32, channels=3):
        super().__init__()

        self.label_embedding = nn.Sequential(
            nn.Linear(n_attrs, embed_dim),
            nn.LeakyReLU(0.2, inplace=True),
            nn.Linear(embed_dim, embed_dim),
        )

        self.fc = nn.Linear(latent_dim + embed_dim, 512 * 4 * 4)

        self.upsample = nn.Sequential(
            # 4x4
            nn.BatchNorm2d(512),
            nn.ReLU(True),

            # 4x4 -> 8x8
            nn.ConvTranspose2d(512, 256, 4, 2, 1, bias=False),
            nn.BatchNorm2d(256),
            nn.ReLU(True),

            # 8x8 -> 16x16
            nn.ConvTranspose2d(256, 128, 4, 2, 1, bias=False),
            nn.BatchNorm2d(128),
            nn.ReLU(True),

            # 16x16 -> 32x32
            nn.ConvTranspose2d(128, 64, 4, 2, 1, bias=False),
            nn.BatchNorm2d(64),
            nn.ReLU(True),

            # 32x32 -> 64x64
            nn.ConvTranspose2d(64, channels, 4, 2, 1, bias=False),
            nn.Tanh(),
        )

        self._init_weights()

    def _init_weights(self):
        for m in self.modules():
            if isinstance(m, (nn.ConvTranspose2d, nn.Linear)):
                nn.init.normal_(m.weight, 0.0, 0.02)
                if m.bias is not None:
                    nn.init.zeros_(m.bias)
            elif isinstance(m, nn.BatchNorm2d):
                nn.init.normal_(m.weight, 1.0, 0.02)
                nn.init.zeros_(m.bias)

    def forward(self, z, attrs):
        emb = self.label_embedding(attrs)
        x = torch.cat([z, emb], dim=1)
        x = self.fc(x)
        x = x.view(x.size(0), 512, 4, 4)
        x = self.upsample(x)
        return x


class Critic(nn.Module):
    def __init__(self, n_attrs=2, embed_dim=32, channels=3):
        super().__init__()

        self.label_embedding = nn.Sequential(
            nn.Linear(n_attrs, embed_dim),
            nn.LeakyReLU(0.2, inplace=True),
            nn.Linear(embed_dim, 64 * 64),
        )

        self.conv = nn.Sequential(
            # 64x64 -> 32x32
            nn.Conv2d(channels + 1, 64, 4, 2, 1, bias=False),
            nn.LeakyReLU(0.2, inplace=True),

            # 32x32 -> 16x16
            nn.Conv2d(64, 128, 4, 2, 1, bias=False),
            nn.LeakyReLU(0.2, inplace=True),

            # 16x16 -> 8x8
            nn.Conv2d(128, 256, 4, 2, 1, bias=False),
            nn.LeakyReLU(0.2, inplace=True),

            # 8x8 -> 4x4
            nn.Conv2d(256, 512, 4, 2, 1, bias=False),
            nn.LeakyReLU(0.2, inplace=True),
        )

        self.fc = nn.Linear(512 * 4 * 4, 1)

        self._init_weights()

    def _init_weights(self):
        for m in self.modules():
            if isinstance(m, (nn.Conv2d, nn.Linear)):
                nn.init.normal_(m.weight, 0.0, 0.02)
                if m.bias is not None:
                    nn.init.zeros_(m.bias)

    def forward(self, img, attrs):
        emb = self.label_embedding(attrs)
        emb = emb.view(emb.size(0), 1, 64, 64)
        x = torch.cat([img, emb], dim=1)
        x = self.conv(x)
        x = x.view(x.size(0), -1)
        x = self.fc(x)
        return x


def compute_gradient_penalty(critic, real, fake, attrs, device, lambda_gp=10):
    batch_size = real.size(0)
    alpha = torch.rand(batch_size, 1, 1, 1, device=device)
    alpha = alpha.expand_as(real)

    interpolated = (alpha * real + (1 - alpha) * fake).requires_grad_(True)

    critic_output = critic(interpolated, attrs)

    gradients = torch.autograd.grad(
        outputs=critic_output,
        inputs=interpolated,
        grad_outputs=torch.ones_like(critic_output),
        create_graph=True,
        retain_graph=True,
    )[0]

    gradients = gradients.view(batch_size, -1)
    gradient_norm = gradients.norm(2, dim=1)
    gradient_penalty = lambda_gp * ((gradient_norm - 1) ** 2).mean()
    return gradient_penalty
