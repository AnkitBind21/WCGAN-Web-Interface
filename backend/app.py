import os
import uuid
import traceback
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from inference import generate_face
from model import Generator
from utils import init_dirs, load_history, add_to_history, GENERATED_DIR
import torch

app = Flask(__name__, static_folder="static")
CORS(app)

generator = None
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
LATENT_DIM = 100


def load_generator(path):
    global generator

    print(f"[startup] Loading checkpoint: {path}")

    try:
        ckpt = torch.load(path, map_location=device)

        print(
            "[startup] Checkpoint label_embedding.0.weight shape:",
            ckpt["generator_state_dict"]["label_embedding.0.weight"].shape,
        )

        generator = Generator(latent_dim=100).to(device)
        generator.load_state_dict(ckpt["generator_state_dict"])
        generator.eval()

        print("[startup] Generator loaded successfully.")

    except Exception:
        print(f"[startup] ERROR — failed to load checkpoint '{path}':")
        traceback.print_exc()
        print("[startup] Flask will start but /api/generate will not work until a valid checkpoint is loaded.")


@app.route("/api/generate", methods=["POST"])
def api_generate():
    data = request.get_json()
    gender = data.get("gender", "male")
    smile = data.get("smile", True)

    if gender not in ("male", "female"):
        return jsonify({"error": "gender must be 'male' or 'female'"}), 400
    if not isinstance(smile, bool):
        return jsonify({"error": "smile must be a boolean"}), 400

    img = generate_face(generator, gender, smile, latent_dim=LATENT_DIM, device=device)

    filename = f"{uuid.uuid4().hex}.png"
    filepath = os.path.join(GENERATED_DIR, filename)
    img.save(filepath, "PNG")

    entry = add_to_history({
        "gender": gender,
        "smile": smile,
        "image_url": f"/static/generated/{filename}",
    })

    return jsonify({
        "id": entry["id"],
        "image_url": entry["image_url"],
        "gender": entry["gender"],
        "smile": entry["smile"],
        "timestamp": entry["timestamp"],
    }), 201


@app.route("/api/history", methods=["GET"])
def api_history():
    history = load_history()
    return jsonify(history[::-1]), 200


@app.route("/static/generated/<filename>")
def serve_generated(filename):
    return send_from_directory(GENERATED_DIR, filename)


@app.route("/api/health", methods=["GET"])
def api_health():
    return jsonify({
        "status": "ok",
        "device": str(device),
        "generator_loaded": generator is not None,
    }), 200


if __name__ == "__main__":
    init_dirs()
    ckpt = os.environ.get("CHECKPOINT_PATH", "checkpoints/wcgan_gp_epoch_30.pth")
    load_generator(ckpt)

    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
