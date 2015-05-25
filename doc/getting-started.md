# Getting started

Read throughfully the [Directory structure](doc/directory-structure.md) before starting, else you're doomed to fail.


## Updates project

Get the last version of the project:

```bash
git pull -u origin master
```

Update the composant used:

```bash
cd ../jeece-dokuwiki-template
sudo npm update    # updates nodes.js
bower update       # updates Bower components
```

Be sure to follow a good [Git workflow](//wiki.jeece.fr/developpeur/git).


## Grunt tasks

Grunt is a task manager, use it to ease your development, checking your code and deploying your code. To run a grunt task named `mytask`, do `grunt mytask`.

Available tasks:
* `build`: build the whole project
* `clean`: clean the project (remove all symlinks and output files)
* `watch`: watch files to rebuild on change
* `start`: start working without wondering which task to perfom:
* `test-js`: validate Javascript

Note: since DokuWiki already compress the Javascript and CSS, it is not needed to do so with Grunt, although Grunt could do it pretty well.

[Previous section](directory-structure.md)
