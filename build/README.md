# agencyQ Starter Theme

This theme based on Zurb Foundation 6.5.3

## Requirements

This project requires [Node.js](http://nodejs.org) LTS 8 or 10 along with NPM to be installed on your machine.

This project uses [EditorConfig](https://editorconfig.org/) for code consistency between different IDE's.  If using an editor such as Visual Studio Code, Sublime, Atom, etc, please install the appropriate plugin to activate this functionality.

This project uses [ESLint](https://eslint.org/) for javascript linting.  Please install an ESLint plugin for your preferred IDE/editor.


All **npm** commands need to be run from within this **/build** folder.

To install dependencies simply run:

    **npm install**

After it finishes you will need to setup your gulp config file.  There is an example one located in:
    
    /build/gulpfile.js/config-example.json

Copy this file into a new one named:

    /build/gulpfile.js/config.json

If you need to need to setup a proxy you will need to change the BrowserSync "proxy" value to match the url of your 
own personal Dev website (Usually only needed if the starter-kit is directly integrated into an existing site).

One you have the config file setup you can start the task runner by running this command in the build folder: 

    **npm run start**

This will compile the existing sass, javascript, and panini templates (if they are used).  
It will open a tab in your browser and display the compiled results.  Any changes made to the sass, 
html templates, or javascript should automatically be recompiled and updated in this browser window.


To build for production distribution (minifies css and javascript) run:

    **npm run production**
