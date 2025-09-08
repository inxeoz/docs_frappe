---
title: Installation
layout: default
---


This page covers installing system dependencies, Node/Yarn, enabling services, configuring MariaDB, and creating a Python virtual environment.

## Step 1 — System update & dependencies
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl wget   python-is-python3 python3-dev python3-pip python3-venv build-essential   redis-server libmariadb-dev mariadb-server mariadb-client pkg-config
```

## Step 2 — Node.js, npm and Yarn
```bash
sudo apt install -y nodejs npm
sudo npm install --global yarn
```

## Step 3 — Enable services
```bash
sudo systemctl enable --now mariadb
sudo systemctl enable --now redis-server
```
