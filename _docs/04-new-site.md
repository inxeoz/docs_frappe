---
title: Creating a New Site
layout: default
order: 4

prev_page: /docs/04-new-site/
prev_title: Creating a New Site

next_page: /docs/02-custom-app/
next_title: Creating a New Site

---


## Create New Site

this will ask for 
MariaDB root password (password which You set during sudo mysql_secure_installation )
Administrator password to set (which will be used for frappe desktop login)


```
bench new-site msite.local

```

```
(menv) ubuntu@ip-172-31-39-119:~/mbench$ bench new-site msite.local
Enter mysql super user [root]:
MySQL root password:

Installing frappe...
Updating DocTypes for frappe        : [========================================] 100%
Set Administrator password:
Updating Dashboard for frappe
msite.local: SystemSettings.enable_scheduler is UNSET
*** Scheduler is disabled ***
(menv) ubuntu@ip-172-31-39-119:~/mbench$
```



## Use a site
```bash
bench use msite.local
```

