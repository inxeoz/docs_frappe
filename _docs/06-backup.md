---
title: Backing Up Data
layout: default
order: 6

prev_page: /docs/05-bench-console/
prev_title: Using Bench Console

next_page: /docs/07-restore/
next_title: Restoring Database

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

