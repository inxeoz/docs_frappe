# MBlog - Jekyll Tech Blog Project

## **Project Overview**
This is a **Jekyll static site** focused on technical tutorials and development guides, particularly for Frappe-Bench and system administration.

## **Technology Stack**
- **Framework**: Jekyll 4.4.1 (Ruby-based static site generator)
- **Theme**: Minima (default Jekyll theme)
- **Plugins**: jekyll-feed for RSS
- **Markup**: Markdown with YAML front matter

## **Project Structure**

```
mblog/
├── _config.yml          # Main Jekyll configuration
├── Gemfile             # Ruby dependencies
├── index.markdown      # Homepage
├── about.markdown      # About page
├── _posts/            # Blog posts directory
├── _site/             # Generated site (build output)
├── .jekyll-cache/     # Jekyll cache
└── vendor/            # Bundler gems
```

## **Key Configuration**

Site configuration in `_config.yml`:
- **Site Title**: "Tech Blog - Development Guides & Tutorials"
- **Email**: contact@techblog.local
- **Theme**: minima
- **Social**: twitter_username, github_username
- **Base URL**: Currently empty (localhost setup)

## **Content Structure**

### **Pages**
- **Homepage** (`index.markdown`): Simple Jekyll site homepage
- **About** (`about.markdown`): Tech blog mission and content overview

### **Posts**
- Located in `_posts/` directory
- Example: `2025-09-08-frappe-bench-complete-guide.markdown`
- YAML front matter with categories, tags, and excerpts

## **Customization Options**

### **Site Branding**
Edit `_config.yml`:
```yaml
title: Your Blog Title
email: your@email.com
description: Your blog description
twitter_username: yourhandle
github_username: yourgithub
```

### **Theme Customization**
- **Current**: Minima theme
- **Change**: Replace `gem "minima"` with another theme in `Gemfile`
- **Custom**: Override theme files in project root

### **Content Management**
- **Posts**: Add `.markdown` files to `_posts/` with format `YYYY-MM-DD-title.markdown`
- **Pages**: Add `.markdown` files to root with YAML front matter
- **Navigation**: Modify theme files or use plugins

## **Quick Start Commands**

```bash
# Install dependencies
bundle install

# Run development server
bundle exec jekyll serve

# Build for production  
bundle exec jekyll build
```

## **Development**

### **Running the Site**
```bash
bundle exec jekyll serve    # Development server (http://localhost:4000)
bundle exec jekyll build    # Generate static site
```

### **Adding Content**

#### New Post
Create file in `_posts/` with this format:
```markdown
---
layout: post
title: "Your Post Title"
date: 2025-09-08 10:00:00 +0530
categories: category1 category2
tags: tag1 tag2
excerpt: "Brief description"
---

Your content here...
```

#### New Page
Create `.markdown` file in root:
```markdown
---
layout: page
title: Page Title
permalink: /page-url/
---

Page content...
```

## **Deployment Options**
- **GitHub Pages**: Uncomment github-pages gem in `Gemfile`
- **Netlify/Vercel**: Deploy `_site/` directory
- **Custom Server**: Upload `_site/` contents

## **Features**
- Clean, responsive design
- RSS feed support
- Mobile-friendly
- SEO optimized with meta tags
- Syntax highlighting for code
- Markdown support

---

The site focuses on comprehensive technical guides, particularly Frappe-Bench tutorials, with a clean structure optimized for developer documentation.