# Frappe-Bench Complete Guide for Ubuntu

## Table of Contents
1. [Installation](#installation)
2. [Creating a Custom Frappe App](#creating-a-custom-frappe-app)
3. [Installing Apps](#installing-apps)
4. [Creating a New Site](#creating-a-new-site)
5. [Using Bench Console](#using-bench-console)
6. [Backing Up Data/Database](#backing-up-datadatabase)
7. [Restoring Database](#restoring-database)

## Installation

### Prerequisites

First, update your Ubuntu system:

```bash
sudo apt update && sudo apt upgrade -y
```

Install required dependencies:

```bash
# Install Python and development tools
sudo apt install -y python3-dev python3-pip python3-venv
sudo apt install -y software-properties-common

# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install yarn
npm install -g yarn

# Install Git
sudo apt install -y git

# Install other dependencies
sudo apt install -y build-essential libssl-dev libffi-dev
sudo apt install -y python3-setuptools python3-wheel
sudo apt install -y redis-server
sudo apt install -y mariadb-server mariadb-client
```

### Install Bench

Install bench using pip:

```bash
pip3 install frappe-bench
```

Add the local bin directory to PATH (add this to your ~/.bashrc or ~/.zshrc):

```bash
export PATH=$PATH:~/.local/bin
```

Reload your shell or run:

```bash
source ~/.bashrc
```

### Configure MariaDB

Secure MariaDB installation:

```bash
sudo mysql_secure_installation
```

Configure MariaDB for Frappe:

```bash
sudo mysql -u root -p
```

In the MySQL prompt:

```sql
CREATE USER 'frappe'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON *.* TO 'frappe'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EXIT;
```

Edit MariaDB configuration:

```bash
sudo nano /etc/mysql/mariadb.conf.d/50-server.cnf
```

Add these lines under `[mysqld]`:

```ini
character-set-client-handshake = FALSE
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
```

Restart MariaDB:

```bash
sudo systemctl restart mariadb
```

### Initialize Bench

Create a new bench directory:

```bash
bench init frappe-bench --frappe-branch version-15
cd frappe-bench
```

## Creating a Custom Frappe App

### Generate App Structure

Create a new custom app:

```bash
bench new-app your_app_name
```

This will prompt you for:
- App Title
- App Description
- App Publisher
- App Email
- App License
- App Icon

Example:

```bash
bench new-app custom_inventory
# Follow the prompts with your app details
```

### App Structure

Your new app will be created in `apps/your_app_name/` with this structure:

```
your_app_name/
├── your_app_name/
│   ├── __init__.py
│   ├── hooks.py
│   ├── modules.txt
│   └── your_app_name/
├── setup.py
├── requirements.txt
└── README.md
```

### Customize Your App

Edit the hooks.py file to customize your app:

```python
# apps/your_app_name/your_app_name/hooks.py

from . import __version__ as app_version

app_name = "your_app_name"
app_title = "Your App Name"
app_publisher = "Your Company"
app_description = "Your app description"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "your_email@company.com"
app_license = "MIT"

# Include js, css files in header of desk.html
# app_include_css = "/assets/your_app_name/css/your_app_name.css"
# app_include_js = "/assets/your_app_name/js/your_app_name.js"
```

## Installing Apps

### Install App to Bench

First, install the app to your bench:

```bash
bench get-app https://github.com/username/app_name.git
# Or for local apps:
bench install-app your_app_name
```

### Install App to Site

Install the app to a specific site:

```bash
bench --site site_name install-app app_name
```

Example:

```bash
bench --site mysite.local install-app custom_inventory
```

### List Available Apps

See all available apps in your bench:

```bash
bench list-apps
```

## Creating a New Site

### Create Site

Create a new site with database:

```bash
bench new-site site_name --db-name database_name
```

Example:

```bash
bench new-site mysite.local --db-name mysite_db
```

You'll be prompted to set an administrator password.

### Set Site as Current

Set the newly created site as the current site:

```bash
bench use site_name
```

### Install ERPNext (Optional)

If you want to install ERPNext:

```bash
bench get-app erpnext --branch version-15
bench --site site_name install-app erpnext
```

### Start Development Server

Start the development server:

```bash
bench start
```

Access your site at `http://site_name:8000`

## Using Bench Console

### Enter Console

Access the bench console for interactive Python/Frappe operations:

```bash
bench --site site_name console
```

### Common Console Operations

#### Import Frappe

```python
import frappe
```

#### Create a Document

```python
# Create a new document
doc = frappe.get_doc({
    "doctype": "User",
    "email": "newuser@example.com",
    "first_name": "John",
    "last_name": "Doe"
})
doc.insert()
frappe.db.commit()
```

#### Query Database

```python
# Get a document
user = frappe.get_doc("User", "administrator")
print(user.full_name)

# Get list of documents
users = frappe.get_all("User", fields=["name", "email", "full_name"])
print(users)

# SQL query
result = frappe.db.sql("SELECT * FROM tabUser LIMIT 5", as_dict=True)
print(result)
```

#### Run Methods

```python
# Run a document method
doc = frappe.get_doc("User", "administrator")
doc.some_method()

# Run server scripts
frappe.utils.execute_in_shell("ls -la")
```

#### Clear Cache

```python
frappe.clear_cache()
```

### Exit Console

```python
exit()
```

## Backing Up Data/Database

### Automatic Backup

Enable automatic backups:

```bash
bench --site site_name set-config backup_frequency "Daily"
bench --site site_name set-config backup_limit 3
```

### Manual Database Backup

Create a manual backup:

```bash
bench --site site_name backup
```

This creates backups in `sites/site_name/private/backups/`

### Backup with Files

Include uploaded files in backup:

```bash
bench --site site_name backup --with-files
```

### Custom Backup Location

Specify backup location:

```bash
bench --site site_name backup --backup-path /path/to/backup/location
```

### Database-Only Backup

For database-only backup:

```bash
bench --site site_name backup --only-database
```

### List Backups

View available backups:

```bash
ls sites/site_name/private/backups/
```

## Restoring Database

### Restore from Backup

Restore a site from backup:

```bash
bench --site site_name restore /path/to/backup.sql.gz
```

### Restore with Files

If you backed up with files:

```bash
bench --site site_name restore /path/to/backup.sql.gz --with-private-files /path/to/private-files.tar --with-public-files /path/to/public-files.tar
```

### Force Restore

Force restore (drops existing database):

```bash
bench --site site_name --force restore /path/to/backup.sql.gz
```

### Restore to New Site

Create a new site and restore:

```bash
bench new-site new_site_name --source_sql /path/to/backup.sql.gz
```

### Migrate After Restore

After restoring, run migrations:

```bash
bench --site site_name migrate
```

## Additional Useful Commands

### Update Apps

Update all apps:

```bash
bench update
```

Update specific app:

```bash
bench update --app app_name
```

### Restart Services

```bash
bench restart
```

### View Logs

```bash
bench logs
```

### Clear Cache

```bash
bench --site site_name clear-cache
```

### Enable/Disable Maintenance Mode

```bash
bench --site site_name set-maintenance-mode on
bench --site site_name set-maintenance-mode off
```

### Drop Site

**Warning: This will permanently delete the site and database**

```bash
bench drop-site site_name
```

## Troubleshooting

### Common Issues

1. **Permission Issues**: Use `sudo` for system-level operations
2. **Port Already in Use**: Kill existing processes or use different ports
3. **Database Connection**: Check MariaDB credentials and service status
4. **Node/NPM Issues**: Ensure Node.js version compatibility

### Log Files

Check these log files for debugging:

- `logs/web.error.log`
- `logs/web.log` 
- `logs/worker.error.log`
- `logs/worker.log`

### Reset Admin Password

```bash
bench --site site_name set-admin-password
```

This comprehensive guide covers all the essential aspects of working with Frappe-Bench in Ubuntu. Remember to always backup your data before making significant changes to your site or database.