---
title: Export / Import Frappe
layout: default
order: 5

prev_page: 
prev_title:

next_page:
next_title: 
---


# Export / Import Frappe

---

## 1. Exporting Customizations & Schema

### Enable Developer Mode

Set `developer_mode = 1` in your `site_config.json`.
This ensures DocTypes and customizations are stored as JSON files inside your app directory.
👉 [Database Migrations](https://docs.frappe.io/framework/user/en/database-migrations) | [Deployment Migrations](https://docs.frappe.io/framework/user/en/guides/deployment/migrations)

---

### Export Customizations

1. In your site, open **Customize Form**.
2. Click **Export Customizations** → select your app’s module → export.

This saves custom fields and settings as JSON files inside your app.
👉 [Exporting Customizations](https://docs.frappe.io/framework/user/en/guides/app-development/exporting-customizations)

---

### Export Fixtures (Optional)

For custom DocTypes such as **Custom Field** or **Workflow**, define them in `hooks.py`:

```python
fixtures = ["Custom Field", "Workflow"]
```

Run:

```bash
bench --site [site-name] export-fixtures
```

This generates JSON files in your app’s `/fixtures` directory.

---

## 2. Exporting Data

### Using Data Export Tool

* Go to the list view of the DocType.
* Click **Menu > Data Export**.
* Filter/select fields → Export as CSV.

---

### Using Bench Backup

For larger migrations:

```bash
bench --site [site-name] backup
```

This creates:

* `database.sql.gz` (DB backup)
* `files` and `private` directories

Backups are stored in:
`sites/[site-name]/private/backups`
👉 [Data Migration Discussion](https://discuss.frappe.io/t/data-migration-from-one-personal-frappe-to-another-personal-frappe-is-it-possible/124723)

---

## 3. Migrating the App to Another Instance

### Move App Code

Copy your app directory into the new instance’s `apps/`.

### Install the App

```bash
bench --site [new-site-name] install-app your_app
```

### Sync Schema

```bash
bench --site [new-site-name] migrate
```

This updates DB tables and syncs DocTypes.
👉 [Migrate Command](https://docs.frappe.io/framework/user/en/bench/reference/migrate)

---

## 4. Importing / Restoring Data

### Import CSV

* Use **Data Import Tool**.
* Upload CSV → map fields → import.

---

### Restore Database

If migrating the whole site:

```bash
bench --site [new-site-name] restore /path/to/backup.sql.gz
```

⚠️ Ensure all required apps are installed **before** restoring.

---

## 5. Advanced / Cloud Migration

Frappe Cloud provides tools like `bench migrate-to` or their CLI to move sites between local and cloud environments.
👉 [Migrate Existing Site (Cloud)](https://docs.frappe.io/cloud/sites/migrate-an-existing-site)

---

## Notes & Best Practices

* Always **move DocTypes and code first**. Data imports will fail if DocTypes are missing.
* Schema migrations are **not reversible**. Test in staging before applying to production.
* For external systems, use the [Data Migration Tool](https://docs.frappe.io/framework/user/en/guides/data/using-data-migration-tool).
* After migration, always run:

  ```bash
  bench --site [site-name] migrate
  ```

---

## Summary Table

| What to Move             | How to Export                       | How to Import / Restore |
| ------------------------ | ----------------------------------- | ----------------------- |
| App code & DocTypes      | Copy app dir, Export Customizations | Install app → `migrate` |
| Custom fields/workflow   | Export Fixtures / Customizations    | Install app → `migrate` |
| Data (bulk / multi-type) | `bench backup`                      | `bench restore`         |
| Data (single DocType)    | Data Export (CSV)                   | Data Import Tool        |
| External integrations    | Data Migration Tool                 | Data Migration Tool     |

---
