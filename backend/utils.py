import os
import json
from datetime import datetime


HISTORY_FILE = "generation_history.json"
GENERATED_DIR = os.path.join("static", "generated")


def init_dirs():
    os.makedirs(GENERATED_DIR, exist_ok=True)


def load_history():
    if os.path.exists(HISTORY_FILE):
        with open(HISTORY_FILE, "r") as f:
            try:
                return json.load(f)
            except json.JSONDecodeError:
                return []
    return []


def save_history(history):
    with open(HISTORY_FILE, "w") as f:
        json.dump(history, f, indent=2)


def add_to_history(entry):
    history = load_history()
    entry["id"] = len(history) + 1
    entry["timestamp"] = datetime.now().isoformat()
    history.append(entry)
    save_history(history)
    return entry