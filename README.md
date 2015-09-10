# node-angular-typescript
Example implementation of a [Node.js](https://nodejs.org/en/)/[Angular.js](https://angular.io/)/[Typescript](http://www.typescriptlang.org/) application

##Running this example
To run this example, first install all the necessary dependencies and compile the Typscript files.
```bash
npm install && bower install && tsd install && grunt ts
```
Then you may run the unit tests ([Karma](http://karma-runner.github.io/0.13/index.html) and [Protractor](https://angular.github.io/protractor/#/)).
```bash
node_modules/.bin/karma start
```

>NOTE: By the default configuration in this project, Karma requires [PhantomJS](http://phantomjs.org/) to be installed and in your `PATH`.

To run the Protractor tests, first setup [Selenium](http://www.seleniumhq.org/).
```bash
node_modules/.bin/webdriver-manager update --standalone
node_modules/.bin/webdriver-manager start
```
Then, in a separate console, start Protractor.
```bash
node_modules/.bin/protractor
```