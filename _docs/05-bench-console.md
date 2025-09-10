---
title: Using Bench Console
layout: default
order: 5
---

## Open console
```bash
bench --site mysite.localhost console
```

## Examples (i.e python script)
```python
frappe.get_doc("User", "Administrator").full_name

user = frappe.get_doc("User", "test@example.com")
user.enabled = 0
user.save()
frappe.db.commit()
```
