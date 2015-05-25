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
cd .../dokuwiki/lib/tpl
git clone URL
```

Then go to your admin panel to change the template used. It is recommanded to enable CSS and Javascript compressing.


## For development

Install the template:

```bash
cd .../dokuwiki/lib/tpl
git clone URL
```

Then go to your admin panel to change the template used.

Install node.js: [download](//nodejs.org/)

Install Bower:

```bash
sudo npm install -g bower
```

Install Grunt:

```bash
sudo npm install -g grunt-cli
```

Install LESS:

```bash
bower install less
```

[Next section](directory-structure.md)
