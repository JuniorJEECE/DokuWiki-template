# Dependencies

## For production

Javascript must be enabled.

* [Git](//git-scm.com): Versioning constrol system.


## For development

All deployment dependencies are required.

* [node.js](//nodejs.org/): Software platform for scalable server-side and networking applications.
* [npm](//www.npmjs.org): Package manager for node.js (included in node in the lastest versions).
* [Bower](//bower.io): Package manager.
* [Grunt](//gruntjs.com): Task runner.
* [Less](//lesscss.org/): Grade CSS extension language.


# Install

## For production

Just go to your DokuWiki template folder and clone the project:

```bash
cd ../dokuwiki/lib/tpl
git clone https://github.com/JuniorJEECE/DokuWiki-template.git --single-branch --branch=master
```

Now you have the `master` branch installed. But the latest commit may not be production ready! To get the latest stable version, do the following:

```bash
# Get new tags from the remote
git fetch --tags

# Get the latest tag name
latestTag=$(git describe --tags `git rev-list --tags --max-count=1`)

# Checkout the latest tag
git checkout $latestTag
```

Then go to your admin panel to change the template used. It is recommanded to enable CSS and Javascript compressing.


## For development

1. Install the template:

```bash
cd ../dokuwiki/lib/tpl
git clone https://github.com/JuniorJEECE/DokuWiki-template.git
```

2. Then go to your admin panel to change the template used.

3. Install node.js: [download](//nodejs.org/)

4. Install Bower:

```bash
sudo npm install -g bower
```

4. Install Grunt:

```bash
sudo npm install -g grunt-cli
```

5. Install LESS:

```bash
bower install less
```

[Next section](directory-structure.md)
