---
title: set-config in frappe
layout: default
order: 9

prev_page: /docs/08-nginx/
prev_title: Nginx Reverse Proxy for Frappe

next_page: /docs/10-kill-frappe-process/
next_title: Kill Frappe Process

---

## Enable developer mode
```bash
bench set-config developer_mode 1
bench set-config server_script_enabled true
```

or modify the `path_to_bench/sites/your_site/site_config.json`

```json
{
 "allow_cors": "*",
 "db_name": "_eecd1f0e0648ca00",
 "db_password": "hZCoi4VZZWwjXUw5",
 "db_type": "mariadb",
 "db_user": "_eecd1f0e0648ca00", 
 "encryption_key": "vGY_AK9QNC8cFfrphkpYe1D9cXLEzhmBNaBNBDBA3eQ=",
  
 "developer_mode": 1,
 "server_script_enabled": true
}
```

