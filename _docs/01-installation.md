---
title: Installation (Ubuntu)
layout: default
order: 1
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
this will ask for 
MariaDB root password (password which You set during sudo mysql_secure_installation )
Administrator password to set (which will be used for frappe desktop login)


```
bench new-site msite.local

```

```
(menv) ubuntu@ip-172-31-39-119:~/mbench$ bench new-site msite.local
Enter mysql super user [root]:
MySQL root password:

Installing frappe...
Updating DocTypes for frappe        : [========================================] 100%
Set Administrator password:
Updating Dashboard for frappe
msite.local: SystemSettings.enable_scheduler is UNSET
*** Scheduler is disabled ***
(menv) ubuntu@ip-172-31-39-119:~/mbench$
```



## Step 8 - Use New Site

```bash
bench use msite.local
```


## Step 9 - Build And Start Server

```bash
bench build
bench start
```
Here is the Command and Their execution output

```
[inxeoz@manjaro-i3 | prob | 04:11:59 PM]$ bench build
-------------------------------------------------------------
Assets for Commit c6032ebdb9c0b427d0e9234cc38e806ebff4dbb0 don't exist
✔ Application Assets Linked


yarn run v1.22.22
warning ../../../../package.json: No license field
$ node esbuild --production --run-build-command
Browserslist: caniuse-lite is outdated. Please run:
------------------------------------------------------------------
frappe/dist/js/
├─ billing.bundle.QQE2RPCA.js                               4.44 Kb
├─ bootstrap-4-web.bundle.FOZOVELL.js                       1.73 Kb
├─ calendar.bundle.4A4YITIU.js                              264.60 Kb
├─ controls.bundle.ABXYTQCU.js                              883.38 Kb
├─ data_import_tools.bundle.44FYB4HH.js                     129.08 Kb
├─ desk.bundle.XFDCSUZ4.js                                  1113.95 Kb
├─ dialog.bundle.JOPO3YHJ.js                                58.82 Kb

 DONE  Total Build Time: 7.037s
-------------------------------------------------------------------
 WARN  Cannot connect to redis_cache to update assets_json
Done in 7.57s.
Compiling translations for frappe
MO file already up to date at /home/inxeoz/proj/prob/sites/assets/locale/af/LC_MESSAGES/frappe.mo
MO file already up to date at /home/inxeoz/proj/prob/sites/assets/locale/ar/LC_MESSAGES/frappe.mo
MO file already up to date at /home/inxeoz/proj/prob/sites/assets/locale/fi/LC_MESSAGES/frappe.mo
--------------------------------------------------------
Compiling translations for itsupport_frappe
Compiling translations for cerp
Compiling translations for mapit
Compiling translations for erpnext
Compiling translations for digipass
Compiling translations for wiki
--------------------------------------------------------------------
```




```bash
[inxeoz@manjaro-i3 | prob | 04:11:44 PM]$ bench start
-----------------------------------------------------------
16:11:46 socketio.1    | Realtime service listening on:  9000
16:11:47 watch.1       |
16:11:47 watch.1       | yarn run v1.22.22
16:11:47 watch.1       | warning ../../../../package.json: No license field
16:11:47 watch.1       | $ node esbuild --watch --live-reload
16:11:47 web.1         | WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
16:11:47 web.1         |  * Running on all addresses (0.0.0.0)
16:11:47 web.1         |  * Running on http://127.0.0.1:8000
16:11:47 web.1         |  * Running on http://10.120.10.9:8000
16:11:47 web.1         | Press CTRL+C to quit
-------------------------------------------------------------
```
`Visit  http://127.0.0.1:8000 in browser`