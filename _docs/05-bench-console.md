---
title: Using Bench Console
layout: default
order: 5

prev_page: /docs/04-new-site/
prev_title: Creating a New Site

next_page: /docs/02-custom-app/
next_title: Creating a New Site

---

## Open console
```bash
bench --site mysite.localhost console
```

## Examples
```python
frappe.get_doc("User", "Administrator").full_name

user = frappe.get_doc("User", "test@example.com")
user.enabled = 0
user.save()
frappe.db.commit()
```
