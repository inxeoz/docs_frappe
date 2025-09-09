---
title: Installing Apps
layout: default
order: 3

prev_page: /docs/04-new-site/
prev_title: Creating a New Site

next_page: /docs/02-custom-app/
next_title: Creating a New Site

---


## Install from GitHub
```bash
bench get-app erpnext --branch version-15
bench --site mysite.localhost install-app erpnext
```

## Install a local app
```bash
bench --site mysite.localhost install-app my_custom_app
```

## List installed apps
```bash
bench --site mysite.localhost list-apps
```

## Hosts file setup
```bash
sudo nano /etc/hosts
# add:
127.0.0.1   mysite.localhost
```