# WCGAN Web Interface

A full-stack web application for conditional face generation using a Wasserstein Conditional Generative Adversarial Network (WCGAN). The project combines a PyTorch-based deep learning backend with a modern React frontend, enabling users to generate synthetic human faces based on selected attributes through an intuitive web interface.

## Overview

WCGAN Web Interface provides an interactive platform for generating realistic facial images conditioned on specific attributes such as gender and expression. The system leverages the stability of Wasserstein GAN training and offers a seamless user experience through a responsive web-based interface.

## Features

* Conditional face generation using WCGAN
* Attribute-based image synthesis
* Flask REST API backend
* React and Vite frontend
* Generation history tracking
* Responsive and modern user interface
* Modular and scalable project structure
* PyTorch-based deep learning implementation

## Technology Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* JavaScript

### Backend

* Flask
* Python
* PyTorch

### Machine Learning

* Wasserstein Conditional GAN (WCGAN)
* Deep Convolutional Neural Networks
* Conditional Image Generation

## Project Structure

```text
WCGAN-Web-Interface/
│
├── backend/
│   ├── app.py
│   ├── inference.py
│   ├── model.py
│   ├── train.py
│   ├── utils.py
│   └── req.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── .gitignore
```

## Installation

### Clone the Repository

```bash
git clone https://github.com/AnkitBind21/WCGAN-Web-Interface.git
cd WCGAN-Web-Interface
```

### Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r req.txt
```

### Frontend Setup

```bash
cd frontend

npm install
```

## Running the Application

### Start Backend Server

```bash
cd backend
python app.py
```

### Start Frontend

```bash
cd frontend
npm run dev
```

The frontend will be available on the local Vite development server, while the Flask backend will handle image generation requests.

## Model Weights

The trained WCGAN model weights are not included in this repository due to file size limitations. Download or train the model separately and place the generated weight files in the appropriate backend directory before running inference.

## Applications

* AI-generated face synthesis
* Deep learning research and experimentation
* Conditional image generation studies
* Computer vision demonstrations
* Educational GAN projects

## Future Improvements

* Additional facial attributes
* User authentication
* Cloud deployment
* Image download and sharing features
* Real-time generation optimization
* Multiple pretrained model support

## Author

Ankit Bind

B.Sc. Information Technology
Machine Learning | Deep Learning | Computer Vision | Artificial Intelligence

## License

This project is intended for educational and research purposes.
