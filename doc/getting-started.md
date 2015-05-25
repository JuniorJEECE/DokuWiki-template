# Getting started

Read throughfully the `Directory structure` before starting, else you're doomed to fail.


## Updates project

Get the last version of the project:

```bash
git pull -u origin master
```

Update the composant used:

```bash
cd .../jeece-dokuwiki-template
sudo npm update    # updates nodes.js
bower update       # updates Bower components
```

Be sure to follow the good [Git workflow](//wiki.jeece.fr/developpeur/git).


## Grunt tasks

Grunt is a task manager, use it to ease your development, checking your code and deploying your code.

Build the whole project:

```bash
grunt build
```

Clean the project (remove all symlinks and output files):

```bash
grunt clean
```

Watch files:

```bash
grunt watch
```

Start working without wondering which task to perfom:

```bash
grunt start
```

Validate Javascript:

```bash
grunt test-js
```

Note: since DokuWiki already compress the Javascript and CSS, it is not needed to do so with Grunt, although it does it pretty well.

[Previous section](directory-structure.md)
