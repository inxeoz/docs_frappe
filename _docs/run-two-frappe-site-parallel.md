---
title: Two Frappe Apps Simultaneously
label: Two Frappe Apps Simultaneously
slug: two-frappe-apps-simultaneously
visibility: PUBLIC
---
## How to Run Two Frappe Apps Simultaneously: Different Methods Explained

The Frappe framework, via the **Bench** tool, is built for modular, multi-app, and multi-site scenarios. There are several ways to run two (or more) Frappe apps on a single system—each method serving different use cases, levels of isolation, and operational complexity.

## 1. **Multi-Site, Single Bench (Recommended and Most Common)**

**Overview:**\
Run both apps inside the same bench folder, installing each app on a different site. This leverages Frappe's built-in multi-tenancy support and lets you host and run any number of apps across any number of sites at the same time.

**Steps:**

* Create a bench:

  ```bash
  bench init my-bench
  cd my-bench
  ```

* Add both apps:

  ```bash
  bench get-app app_a [repo-url-A]
  bench get-app app_b [repo-url-B]
  ```

* Create two (or more) sites:

  ```bash
  bench new-site sitea.local
  bench new-site siteb.local
  ```

* Install each app on its respective site:

  ```bash
  bench --site sitea.local install-app app_a
  bench --site siteb.local install-app app_b
  ```

* Enable DNS multitenancy and configure `/etc/hosts`:

  ```bash
  bench config dns_multitenant on
  ```

  ```bash
  text127.0.0.1 sitea.local
  127.0.0.1 siteb.local
  ```

* Start bench:

  ```bash
  bench start
  ```

* Access both apps at `http://sitea.local:8000` and `http://siteb.local:8000` in your browser.

**Benefits:**\
Fast development, minimal resource overhead, each site can have its own app stack—<a target="_blank" href="https://discuss.frappe.io/t/how-to-run-two-sites-simultaneously-in-development-environment/55565">5</a><a target="_blank" href="https://discuss.frappe.io/t/want-to-run-two-projects-at-the-same-time/107617">3</a><a target="_blank" href="https://discuss.frappe.io/t/is-it-possible-to-run-multiple-sites-simultaneously/15274">2</a><a target="_blank" href="https://discuss.frappe.io/t/how-to-setup-multiple-sites-on-single-bench-instance/129147">4</a>.

## 2. **Port-Based Multi-Site / Multi-App**

**Overview:**\
Instead of using different domains, assign different ports to each site so you can access, for example, `http://localhost:8001` and `http://localhost:8002`.

**Method:**

* Turn **DNS multi-tenancy OFF**:

  ```bash
  bench config dns_multitenant off
  ```

* Assign a port per site:

  ```bash
  bench set-nginx-port sitea.local 8001
  bench set-nginx-port siteb.local 8002
  bench setup nginx
  sudo systemctl reload nginx   # or 'sudo service nginx reload' on non-Arch systems
  ```

* Then access `http://localhost:8001` and `http://localhost:8002`.

**Benefits:**\
Direct, domain-free access; suitable for quick testing or when DNS/domain setup is impractical.

**Challenges:**\
Prone to port conflicts, less flexible, can require more manual tweaking, and some users have reported display issues on second port/site<a target="_blank" href="https://discuss.frappe.io/t/is-it-possible-to-run-multiple-sites-simultaneously/15274">2</a><a target="_blank" href="https://discuss.frappe.io/t/want-to-run-two-projects-at-the-same-time/107617">3</a>.

## 3. **Multi-Bench, Multi-App**

**Overview:**\
Run each app in a completely separate bench instance (folder/environment), which is useful when you need strict isolation (e.g., different Frappe or Python versions, or divergent dependencies).

**Method:**

* Create two separate benches:

  ```bash
  bench init bench_a
  bench init bench_b
  ```

* Set up separate virtual environments; install respective apps and sites as above.

* Start both benches (the development server will attempt to use a free port for each).

**Benefits:**\
Maximum isolation, no risk of version or dependency clashes.

**Costs:**\
Requires more resources; each bench is heavyweight, best for advanced or conflicting setups.

## 4. **Multiple Frappe Instances (Experimental)**

**Tools like** <a target="_blank" href="https://discuss.frappe.io/t/frappe-manager-v0-10-enable-multiple-frappe-instances-simultaneously/117214">**Frappe-Manager v0.10+**</a> **are being developed** to make managing multiple Frappe “instances” or environments easier, each potentially with its own set of benches and apps. This is still less common but is gaining interest for larger multi-instance deployments<a target="_blank" href="https://discuss.frappe.io/t/frappe-manager-v0-10-enable-multiple-frappe-instances-simultaneously/117214">7</a>.

## Advanced: Both Apps on a Single Site

You can also **install both apps on the same Frappe site** (using `bench --site <sitename> install-app <appname>` for both applications). They will “coexist” on the same database and site. Use this when the apps are tightly coupled or meant to extend a single system, but note that version or namespace conflicts can arise.

## Key Considerations

| Method                              | Isolation | Setup Complexity | Best For                                   |
| ----------------------------------- | --------- | ---------------- | ------------------------------------------ |
| Single Bench, Multi-Site (DNS)      | Medium    | Easy             | Most dev/production and standard needs     |
| Single Bench, Port-Based Multi-Site | Medium    | Moderate         | Quick tests, restricted DNS environments   |
| Multi Bench                         | High      | Advanced         | Strict isolation, conflicting dependencies |
| Frappe Manager                      | Very High | Experimental     | Multi-customer, multi-stack deployments    |
| Multiple Apps, Single Site          | Low       | Easiest          | Tight app coupling, plugin-like extensions |

##
