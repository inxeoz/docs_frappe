# Creating Your Own Blog with Jekyll on Manjaro i3

## Table of Contents
1. [Introduction](#introduction)
2. [Prerequisites and Installation](#prerequisites-and-installation)
3. [Creating Your First Jekyll Blog](#creating-your-first-jekyll-blog)
4. [Understanding Jekyll Structure](#understanding-jekyll-structure)
5. [Customizing Your Blog](#customizing-your-blog)
6. [Creating Posts](#creating-posts)
7. [Themes and Customization](#themes-and-customization)
8. [Deployment Options](#deployment-options)
9. [Troubleshooting](#troubleshooting)
10. [Advanced Tips for Manjaro i3](#advanced-tips-for-manjaro-i3)

## Introduction

Jekyll is a static site generator that transforms your plain text into static websites and blogs. It's perfect for developers who want a simple, fast, and secure blogging platform. This guide will walk you through setting up Jekyll on Manjaro Linux with i3 window manager.

## Prerequisites and Installation

### Update Your System

First, ensure your Manjaro system is up to date:

```bash
sudo pacman -Syu
```

### Install Ruby and Development Tools

Jekyll is built with Ruby, so we need to install Ruby and its development tools:

```bash
# Install Ruby and development tools
sudo pacman -S ruby ruby-rdoc ruby-irb base-devel

# Install additional dependencies
sudo pacman -S gcc make
```

### Install RubyGems Dependencies

Some gems require additional system packages:

```bash
sudo pacman -S libffi openssl zlib
```

### Configure Ruby Environment

Add Ruby gems bin directory to your PATH. Add this to your `~/.bashrc` or `~/.zshrc`:

```bash
# Ruby gems
export PATH="$PATH:$(ruby -e 'puts Gem.user_dir')/bin"
export GEM_HOME="$(ruby -e 'puts Gem.user_dir')"
```

Reload your shell configuration:

```bash
source ~/.bashrc
# or
source ~/.zshrc
```

### Install Bundler and Jekyll

Now install the required gems:

```bash
gem install bundler jekyll
```

If you encounter permission issues, you can install gems to your user directory:

```bash
gem install --user-install bundler jekyll
```

### Verify Installation

Check if Jekyll is installed correctly:

```bash
jekyll --version
bundler --version
```

## Creating Your First Jekyll Blog

### Generate a New Site

Create your new Jekyll blog:

```bash
jekyll new my-awesome-site
```

This creates a new directory called `my-awesome-site` with all the necessary files.

### Navigate to Your Site

```bash
cd my-awesome-site
```

### Install Dependencies

Install the required gems for your site:

```bash
bundle install
```

### Serve Your Site Locally

Start the development server:

```bash
bundle exec jekyll serve
```

Your site will be available at `http://localhost:4000` or `http://127.0.0.1:4000`

### i3 Tip: Quick Browser Launch

In i3, you can quickly open your browser to view the site. Add this to your i3 config (`~/.config/i3/config`):

```
bindsym $mod+Shift+j exec firefox http://localhost:4000
```

Then use `Super+Shift+J` to quickly open your local Jekyll site.

## Understanding Jekyll Structure

Your new Jekyll site has this structure:

```
my-awesome-site/
├── _config.yml          # Site configuration
├── _posts/              # Blog posts directory
│   └── 2024-01-01-welcome-to-jekyll.markdown
├── _site/               # Generated site (don't edit)
├── .jekyll-cache/       # Cache directory
├── 404.html             # 404 error page
├── about.markdown       # About page
├── Gemfile              # Ruby dependencies
├── Gemfile.lock         # Locked dependency versions
└── index.markdown       # Homepage
```

### Key Files Explained

- **_config.yml**: Main configuration file for your site
- **_posts/**: Directory containing your blog posts
- **_site/**: Generated static site (automatically created)
- **Gemfile**: Specifies Ruby gem dependencies
- **index.markdown**: Your site's homepage

## Customizing Your Blog

### Edit Site Configuration

Open `_config.yml` in your favorite editor:

```bash
# For i3 users who prefer terminal editors
vim _config.yml
# or
nano _config.yml
```

Customize these basic settings:

```yaml
title: Your Awesome Blog
email: your-email@example.com
description: >- # this means to ignore newlines until "baseurl:"
  Write an awesome description for your new site here. You can edit this
  line in _config.yml.
baseurl: "" # the subpath of your site, e.g. /blog
url: "" # the base hostname & protocol for your site, e.g. http://example.com
twitter_username: yourusername
github_username: yourusername

# Build settings
markdown: kramdown
theme: minima
plugins:
  - jekyll-feed

# Exclude files from processing
exclude:
  - Gemfile
  - Gemfile.lock
  - node_modules
  - vendor/
```

### Customize the About Page

Edit `about.markdown`:

```markdown
---
layout: page
title: About
permalink: /about/
---

This is your about page. Tell visitors about yourself, your blog's purpose,
or anything else you'd like to share.

Some ideas for your about page:
- Your background and interests
- Why you started this blog
- Contact information
- Links to your social media profiles
```

## Creating Posts

### Post File Naming Convention

Jekyll posts must follow this naming convention:
```
YEAR-MONTH-DAY-title.MARKUP
```

Example: `2024-03-15-my-first-post.markdown`

### Create Your First Post

Create a new post file:

```bash
touch _posts/2024-03-15-my-first-post.markdown
```

Add this content:

```markdown
---
layout: post
title:  "My First Blog Post"
date:   2024-03-15 10:30:00 +0100
categories: blogging tutorial
tags: jekyll blog first-post
---

# Welcome to My Blog!

This is my first blog post using Jekyll. Here are some things I can do:

## Code Syntax Highlighting

```python
def hello_world():
    print("Hello, World!")
    
hello_world()
```

## Lists

### Things I love about Jekyll:
- Fast static site generation
- Markdown support
- Easy deployment
- Great for developers

## Links and Images

Check out [Jekyll's documentation](https://jekyllrb.com/docs/).

![Jekyll Logo](https://jekyllrb.com/img/logo-2x.png)

## Mathematical Expressions (with MathJax)

You can add math: $E = mc^2$

That's it for my first post!
```

### Post Front Matter Options

The front matter (between `---`) can include:

```yaml
---
layout: post                    # Layout to use
title: "Your Post Title"        # Post title
date: 2024-03-15 10:30:00 +0100 # Publication date
author: Your Name               # Author name
categories: [category1, category2] # Categories
tags: [tag1, tag2, tag3]        # Tags
excerpt: "Short description"    # Custom excerpt
published: true                 # Set to false for drafts
---
```

### i3 Workflow Tip: Quick Post Creation

Create a script for quick post creation. Save this as `~/bin/new-jekyll-post`:

```bash
#!/bin/bash
# Quick Jekyll post creator

if [ -z "$1" ]; then
    echo "Usage: new-jekyll-post 'Post Title'"
    exit 1
fi

TITLE="$1"
DATE=$(date +"%Y-%m-%d")
TIME=$(date +"%Y-%m-%d %H:%M:%S %z")
FILENAME="_posts/${DATE}-$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g').markdown"

cat > "$FILENAME" << EOF
---
layout: post
title: "$TITLE"
date: $TIME
categories: blog
tags: 
---

Write your post content here...
EOF

echo "Created: $FILENAME"
# Open in your preferred editor
vim "$FILENAME"
```

Make it executable:

```bash
chmod +x ~/bin/new-jekyll-post
```

Add `~/bin` to your PATH in `~/.bashrc`:

```bash
export PATH="$PATH:$HOME/bin"
```

Now create posts quickly:

```bash
new-jekyll-post "My Amazing New Post"
```

## Themes and Customization

### Using Different Themes

#### Option 1: Gem-based Themes

Add a theme to your `Gemfile`:

```ruby
gem "minimal-mistakes-jekyll"
# or
gem "beautiful-jekyll"
# or 
gem "tale"
```

Update your `_config.yml`:

```yaml
theme: minimal-mistakes-jekyll
```

Install and update:

```bash
bundle install
bundle update
```

#### Option 2: Fork-based Themes

1. Find a theme on GitHub (e.g., [Jekyll Themes](https://jekyllthemes.org/))
2. Fork the repository
3. Clone your fork
4. Customize as needed

### Custom CSS

Create `assets/css/style.scss`:

```scss
---
---

@import "{{ site.theme }}";

/* Custom styles */
body {
    font-family: 'Source Sans Pro', sans-serif;
}

.site-header {
    background-color: #2c3e50;
    
    .site-title {
        color: #ecf0f1;
    }
}

/* i3-inspired styling */
.post-content {
    h1, h2, h3 {
        color: #3498db;
        border-left: 4px solid #3498db;
        padding-left: 10px;
    }
}
```

### Custom Layout

Create `_layouts/custom-post.html`:

```html
---
layout: default
---

<article class="post h-entry" itemscope itemtype="http://schema.org/BlogPosting">
  <header class="post-header">
    <h1 class="post-title p-name" itemprop="name headline">{{ page.title | escape }}</h1>
    <p class="post-meta">
      <time class="dt-published" datetime="{{ page.date | date_to_xmlschema }}" itemprop="datePublished">
        {{ page.date | date: "%b %-d, %Y" }}
      </time>
      {% if page.author %}
        • <span itemprop="author" itemscope itemtype="http://schema.org/Person">
            <span class="p-author h-card" itemprop="name">{{ page.author }}</span>
          </span>
      {% endif %}
      {% if page.tags.size > 0 %}
        • Tags: 
        {% for tag in page.tags %}
          <span class="tag">{{ tag }}</span>
        {% endfor %}
      {% endif %}
    </p>
  </header>

  <div class="post-content e-content" itemprop="articleBody">
    {{ content }}
  </div>

  <footer class="post-footer">
    <p>Thanks for reading!</p>
  </footer>
</article>
```

## Deployment Options

### GitHub Pages (Free)

1. Create a GitHub repository named `username.github.io`
2. Push your Jekyll site to the repository
3. Your site will be available at `https://username.github.io`

Add to `_config.yml`:

```yaml
url: "https://username.github.io"
```

### Netlify (Free)

1. Push your code to GitHub/GitLab
2. Connect your repository to [Netlify](https://netlify.com)
3. Set build command: `bundle exec jekyll build`
4. Set publish directory: `_site`

### Manual Server Deployment

Build your site:

```bash
bundle exec jekyll build
```

Upload the `_site` directory to your web server.

### i3 Deployment Script

Create `~/bin/deploy-blog`:

```bash
#!/bin/bash
# Deploy Jekyll blog

cd ~/path/to/your/blog

echo "Building site..."
bundle exec jekyll build

echo "Deploying to server..."
rsync -avz --delete _site/ user@your-server:/path/to/web/root/

echo "Deployment complete!"

# Send i3 notification
notify-send "Blog Deployed" "Your Jekyll blog has been deployed successfully!"
```

## Troubleshooting

### Common Issues in Manjaro

#### Ruby Version Issues

If you encounter Ruby version conflicts:

```bash
# Check Ruby version
ruby --version

# If needed, install rbenv for version management
yay -S rbenv ruby-build

# Install specific Ruby version
rbenv install 3.1.0
rbenv global 3.1.0
```

#### Bundle Install Fails

Missing dependencies:

```bash
sudo pacman -S ruby-bundler ruby-rdoc
```

#### Permission Issues

Use `--user-install` flag:

```bash
gem install --user-install jekyll bundler
```

#### Port Already in Use

Change the port:

```bash
bundle exec jekyll serve --port 4001
```

#### i3 Specific: No Browser Opening

Install a browser if not present:

```bash
sudo pacman -S firefox
# or
sudo pacman -S chromium
```

Add to i3 config for quick access:

```
bindsym $mod+b exec firefox
```

## Advanced Tips for Manjaro i3

### Auto-reload with File Watching

Use `entr` for automatic rebuilds:

```bash
# Install entr
sudo pacman -S entr

# Auto-reload on changes
find . -name "*.md" -o -name "*.yml" -o -name "*.scss" | entr -r bundle exec jekyll serve
```

### i3 Workspace Setup

Create a dedicated workspace for blogging. Add to `~/.config/i3/config`:

```
# Workspace for blogging
set $ws_blog "9: blog"
bindsym $mod+9 workspace $ws_blog

# Auto-assign applications
assign [class="firefox" title="localhost:4000"] $ws_blog

# Quick blog workspace
bindsym $mod+Shift+b workspace $ws_blog; exec terminal -e "cd ~/my-awesome-site && bundle exec jekyll serve"; exec firefox http://localhost:4000
```

### Terminal Integration

Add these aliases to `~/.bashrc`:

```bash
# Jekyll aliases
alias jserve="bundle exec jekyll serve"
alias jbuild="bundle exec jekyll build"
alias jnew="jekyll new"
alias blog="cd ~/my-awesome-site"

# Quick post creation with current date
alias newpost='~/bin/new-jekyll-post'
```

### Backup Script

Create `~/bin/backup-blog`:

```bash
#!/bin/bash
# Backup Jekyll blog

BLOG_DIR="$HOME/my-awesome-site"
BACKUP_DIR="$HOME/backups/blog"
DATE=$(date +"%Y%m%d_%H%M%S")

mkdir -p "$BACKUP_DIR"

tar -czf "$BACKUP_DIR/blog_backup_$DATE.tar.gz" -C "$HOME" my-awesome-site

echo "Blog backed up to: $BACKUP_DIR/blog_backup_$DATE.tar.gz"

# Keep only last 5 backups
cd "$BACKUP_DIR"
ls -t blog_backup_*.tar.gz | tail -n +6 | xargs -r rm

notify-send "Backup Complete" "Blog backup created successfully"
```

### Live Editing Setup

For a complete live-editing setup, create this i3 layout script `~/bin/blog-layout`:

```bash
#!/bin/bash
# Setup i3 layout for blogging

# Switch to blog workspace
i3-msg workspace "9: blog"

# Open terminal with Jekyll server
i3-msg exec "terminal -e 'cd ~/my-awesome-site && bundle exec jekyll serve'"

sleep 2

# Split and open editor
i3-msg split h
i3-msg exec "terminal -e 'cd ~/my-awesome-site && vim .'"

sleep 1

# Split and open browser
i3-msg split v
i3-msg exec "firefox http://localhost:4000"

notify-send "Blog Environment" "Jekyll blog environment is ready!"
```

Make it executable:

```bash
chmod +x ~/bin/blog-layout
```

Add a keybinding to i3 config:

```
bindsym $mod+Shift+Alt+b exec ~/bin/blog-layout
```

## Conclusion

You now have a complete Jekyll blog setup optimized for Manjaro i3! Your workflow includes:

- Quick post creation scripts
- Efficient i3 workspace configuration  
- Automated deployment options
- Live-reload development environment
- Backup and maintenance scripts

Happy blogging! Your Jekyll site combines the power of static site generation with the efficiency of i3 window management, creating an optimal environment for technical writing and content creation.

## Additional Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Jekyll Themes](https://jekyllthemes.org/)
- [Liquid Template Language](https://shopify.github.io/liquid/)
- [Kramdown Syntax](https://kramdown.gettalong.org/syntax.html)
- [i3 User's Guide](https://i3wm.org/docs/userguide.html)