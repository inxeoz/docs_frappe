---
title: Backing Up Data
layout: default
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

