---
title: Creating a Custom Frappe App
layout: default
order: 2
---

```bash
bench new-app mapp
```
it will ask bunch of details (fill as You need)
```
(menv) ubuntu@ip-172-31-39-119:~/mbench$ bench new-app mapp
App Title [Mapp]:
App Description: inxeoz
App Publisher: inxeoz
App Email: inxeoz@inxeoz.com
App License (agpl-3.0, apache-2.0, bsd-2-clause, bsd-3-clause, bsl-1.0, cc0-1.0, epl-2.0, gpl-2.0, gpl-3.0, lgpl-2.1, mit, mpl-2.0, unlicense) [mit]:
Create GitHub Workflow action for unittests [y/N]: N
Branch Name [develop]:
'mapp' created at /home/ubuntu/mbench/apps/mapp
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
