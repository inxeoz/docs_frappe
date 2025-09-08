---
title: Creating a Custom Frappe App
layout: default
---


## Initialize bench & create bench folder
```bash
bench init mbench
cd mbench
```

## Create a new site
```bash
bench new-site msite.local
```

## Use the site
```bash
bench use msite.local
```

## Enable developer mode
```bash
bench set-config developer_mode 1
bench set-config server_script_enabled true
```

## Create new app
```bash
bench new-app mapp
```

## Install app to site
```bash
bench --site msite.local install-app mapp
```

## Build & start
```bash
bench build
bench start
```
