---
title: Backing Up Data
layout: default
order: 6

prev_page: /docs/04-new-site/
prev_title: Creating a New Site

next_page: /docs/02-custom-app/
next_title: Creating a New Site

---

## Full backup
```bash
bench --site mysite.localhost backup
```

Backups stored in:
```
sites/mysite.localhost/private/backups
```

## Database-only backup
```bash
bench --site mysite.localhost backup --with-files=false
```

