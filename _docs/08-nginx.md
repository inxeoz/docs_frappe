---
title: Nginx Reverse Proxy for Frappe
layout: default
---

## Install nginx
```bash
sudo apt update
sudo apt install -y nginx
systemctl status nginx
```

## Example nginx config
```nginx
server {
    listen 80;
    server_name YOUR_SERVER_IP;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /assets {
        alias /home/frappe/frappe-bench/sites/assets;
    }
}
```

## Enable & reload
```bash
sudo ln -s /etc/nginx/sites-available/frappe /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Troubleshooting
```bash
bench build
bench restart
```
