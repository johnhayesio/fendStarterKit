# JohnHayes.io 2018 Starter Kit

This is how I start my projects, maybe you can use it too. This starter file is a collection of code snippets I have created and collected from other people.

***

## Requirements
This project has some requirements you need to meet in order to compile it. First of all, you need NodeJS in order to run JavaScript on the console. You can go to the [NodeJS](http://nodejs.org) site and follow the installation process. After you get the `node` command on the console, you will have the node package manager `npm` as well. Now you need to install Gulp with the following command.

```
npm install -g gulp
```
Gulp is the pre-processor that will run all the compilation, watchers, and other tasks. To learn more about Gulp and all it's magical abilities, check out their website [here.](https://gulpjs.com/)

***

## Install
In order to start using the project, you need to clone the repo to your pc. You can download the zip version.

After you have it on your pc, you need to go into the console to the project folder and execute the following command to gather all the dependencies.
```
npm install
```

***

## How to use
If you want to create a Bootstrap 4 project, then you need to open terminal and type: `gulp bsjs bscss`. This will copy all the Bootstrap files to the proper folders. Next, delete the index.html file from the build folder and rename bs4.html to index.html. Last, delete all folders from source/sass but leave main.sass. You can now run the `gulp` command in your terminal to begin creating your Bootstrap 4 project!

If you are creating a project from scratch, you should be able to open your terminal and type `gulp` in the command line. Here are the commands you can run in the terminal.

* **default**: Compile and watch for changes
* **scripts**: Compile the JavaScript files
* **sass**: Compile the Sass styles
* **images**: Copy the newer to the build folder
* **bsjs**: Copy the JavaScript Bootstrap files to the build folder
* **bscss**: Copy the CSS Bootstrap files to the build folder
* **vendors**: Copy the vendors to the build folder
* **watch**: Watch for any changes on the each section

The `gulp` command is the best choice in most cases. Go to the project folder in the console and execute `gulp`, it will compile the project and start a server that will refresh every time you change something in the code. Gulp will be watching for changes and will tell you how to access the project from the local and public url. Every browser that points to that url, will be auto-refreshed. As an extra feature for testing purposes, any interaction on one browser will be reflected on any others. Try it on a phone, tablet, and pc at the same time.

For projects, I have disabled opening in the browser automatically. If you would like to have a browser window open automatically after running the `gulp` command, delete this line `open: false` in the gulpfile.js file.

If you want to use SCSS or LESS, feel free to make that change in the file types and update the gulpfile to look for the right file types also.

Feel free to add onto this project by forking it and making it your own. This is just a basic start, but works for most basic projects without a lot of fancy bells and whistles.

Good Luck! 😉️
