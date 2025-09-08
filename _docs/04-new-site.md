---
title: Creating a New Site
layout: default
---

## Create a new site
```bash
bench new-site msite.local
```

## Use a site
```bash
bench use msite.local
```

## Post-creation steps
```bash
bench set-config developer_mode 1
bench set-config server_script_enabled true
bench build
bench start
```
