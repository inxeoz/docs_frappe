---
title: Kill Frappe Process
layout: default
order: 10

prev_page: /docs/04-new-site/
prev_title: Creating a New Site

next_page: /docs/02-custom-app/
next_title: Creating a New Site

---

## Use  kill & lsof command to terminate the frappe process

sometime it happenns that the frappe process is running in background and we dont have access to it 

and then if we try to run 'bench start'
we get this type of error (because of background running frappe process)

```


17:25:27 redis_cache.1 | 99370:M 08 Sep 2025 17:25:27.676 # Warning: Could not create server TCP listening socket 127.0.0.1:13000: bind: Address already in use
17:25:27 redis_queue.1 | 99372:M 08 Sep 2025 17:25:27.676 # Warning: Could not create server TCP listening socket 127.0.0.1:11000: bind: Address already in use
17:25:27 system        | socketio.1 stopped (rc=-15)
17:25:27 system        | redis_queue.1 stopped (rc=1)
17:25:27 system        | watch.1 stopped (rc=-15)

```
## To Fix it find the process id and kill with sudo

```bash
bench start | grep port
```

```
[inxeoz@manjaro-i3 | prob | 05:31:12 PM]$ bench start | grep port
17:31:18 redis_cache.1 | 102389:M 08 Sep 2025 17:31:18.457 * Running mode=standalone, port=13000.
17:31:18 redis_cache.1 | 102389:M 08 Sep 2025 17:31:18.457 # Failed listening on port 13000 (tcp), aborting.
17:31:18 redis_queue.1 | 102391:M 08 Sep 2025 17:31:18.458 * Running mode=standalone, port=11000.
17:31:18 redis_queue.1 | 102391:M 08 Sep 2025 17:31:18.458 # Failed listening on port 11000 (tcp), aborting.
(cenv)
[inxeoz@manjaro-i3 | prob | 05:31:18 PM]$
```
## find process id which using these port

for each port

```bash
sudo lsof -t -i :PORT_NUMBER
```
and then kill that PID

```bash
sudo kill PID
```


