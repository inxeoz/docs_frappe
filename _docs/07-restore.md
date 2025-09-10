---
title: Restoring Database
layout: default
order: 7
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

