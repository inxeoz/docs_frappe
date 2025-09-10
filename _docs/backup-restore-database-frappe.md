---
title: How to Backup and Restore a Frappe/ERPNext Database Safely
label: How to Backup and Restore a Frappe/ERPNext Database Safely
slug: how-to-backup-and-restore-a-frappeerpnext-database-safely
visibility: PUBLIC
---


## 🔹 1. Creating a Backup

Frappe provides a built-in command to generate backups. Run this from your bench folder:

```bash
bench --site yoursite.local backup
```

This creates three files under `sites/yoursite.local/private/backups/`:

* `dbname-database.sql.gz` → compressed SQL dump of your MariaDB database

* `dbname-files.tar` → archive of public files (uploaded files visible on website)

* `dbname-private-files.tar` → archive of private files (restricted uploads)

👉 These files are timestamped for easy identification.

***

## 🔹 2. Restoring Into a New Site

Suppose you want to restore this backup into a **new site** because your current one broke or you’re testing migration.

### Step 1: Create a new site

```bash
bench new-site newsite.local
```

This initializes a fresh database, user, and configuration.

***

### Step 2: Restore the database dump

Decompress and load the SQL dump into the new site’s database.

```bash
gunzip dbname-database.sql.gz
mysql -u root -p new_dbname < dbname-database.sql
```

⚠️ `new_dbname` comes from `sites/newsite.local/site_config.json` under `"db_name"`.

***

### Step 3: Sync schema and patches

Run migrations so Frappe aligns doctypes and applies missing patches:

```bash
bench --site newsite.local migrate
```

***

### Step 4: Restore files

If you also want uploaded files restored:

```bash
tar -xvf dbname-files.tar -C sites/newsite.local/public/files/
tar -xvf dbname-private-files.tar -C sites/newsite.local/private/files/
```

***

### Step 5: Restore site config (optional)

If your old backup had a specific encryption key or special settings, copy them into `sites/newsite.local/site_config.json`.

At minimum, ensure the `"encryption_key"` from the backup site matches. Otherwise, stored passwords and tokens may not decrypt properly.

***

## 🔹 3. Testing the Restored Site

* Start your bench:

  ```bash
  bench start
  ```

* Clear caches:

  ```bash
  bench --site newsite.local clear-cache
  bench --site newsite.local clear-website-cache
  ```

* Log in to confirm the site is working.

***

## 🔹 4. Tips & Best Practices

* Always back up **before running** `bench update` or migrations.

* Store backups offsite (e.g., S3, GDrive, or self-hosted storage).

* Match **Frappe/ERPNext versions** between backup and restore environment. Restoring a v13 backup into a v16 bench will cause schema issues.

* If apps have been split out (like Blogs, Newsletter, or Offsite Backups in v16), install them separately via `bench get-app`.

***
