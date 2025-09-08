---
title: Installation
layout: default
---


This page covers installing system dependencies, Node/Yarn, enabling services, configuring MariaDB, and creating a Python virtual environment.

## Step 1 — System update & dependencies
```bash

# 1) system update
sudo apt update && sudo apt upgrade -y

# 2) install OS packages (prereqs)
sudo apt install -y git curl wget \
  python-is-python3 python3-dev python3-pip python3-venv build-essential \
  redis-server libmariadb-dev mariadb-server mariadb-client pkg-config

# (optional but useful)
sudo apt install -y software-properties-common

```

## Step 2 — Node.js, npm and Yarn
```bash

sudo apt install nodejs
sudo apt install npm
sudo npm install --global yarn

```

## Step 3 — Enable services
```bash
sudo systemctl enable --now mariadb
sudo systemctl enable --now redis-server
```


## Step 3 — MySql Secure installation:
```bash
sudo mysql_secure_installation
```

it will ask for

```
Enter current password for root (enter for none): # press enter if this not done before

Switch to unix_socket authentication [Y/n] y

Change the root password? [Y/n] y

```

Set Password for Mysql database
```
New password: 
Re-enter new password:
```
```
Remove anonymous users? [Y/n] y

Disallow root login remotely? [Y/n] y

Remove test database and access to it? [Y/n] y

Reload privilege tables now? [Y/n] y
```
## Step 4 - Configure Python Virtual Env

create python env

```
python3 -m venv menv
```
source the menv/bin/activate

```
source menv/bin/activate
```

## Step 5 - Install frappe-bench

```
pip install frappe-bench

bench --version
```

## Step 6 - Create new bench & goto that bench folder

```
bench init mbench

cd mbench

```

## Step 7 - Create New Site

- [Creating a New Site](/docs/04-new-site/)


## Step 7 - Use New Site

```bash
bench use msite.local
```
