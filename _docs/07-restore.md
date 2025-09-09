---
title: Restoring Database
layout: default
order: 7

prev_page: /docs/04-new-site/
prev_title: Creating a New Site

next_page: /docs/02-custom-app/
next_title: Creating a New Site

---

## Restore from SQL backup
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

