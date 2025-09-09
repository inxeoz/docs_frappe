---
title: Restoring Database
layout: default
order: 7

prev_page: /docs/06-backup/
prev_title: Backing Up Data

next_page: /docs/08-nginx/
next_title: Nginx Reverse Proxy for Frappe

---

## Restore
```bash
bench --site mysite.localhost --force restore path/to/database.sql.gz
```

## Restore with files
```bash
bench --site mysite.localhost --force restore path/to/database.sql.gz --with-public-files --with-private-files
```

## After restore
```bash
bench --site mysite.localhost migrate
```

