---
title: Backing Up Data
layout: default
order: 6
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


<span style="color:orange">
--with-files=false</span> → a flag that controls whether uploaded files (attachments, images, etc.) are included.<br>
true (default) → database + public/private files are backed up.<br>
false → only the database is backed up, without the files.
