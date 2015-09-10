# node-angular-typescript
Example implementation of a node-angular-typescript application

##Running this example
To run this example, first install all the necessary dependencies.
```bash
npm install && bower install
```
Optionally, install the `tsd` dependencies
```bash
tsd install
```
Then you may run the unit tests (Karma and Protractor).
```bash
karma start
```
To run the Protractor
```bash
node_modules/.bin/webdriver-manager update --standalone
node_modules/.bin/webdriver-manager start
```
Then, in a separate console,
```bash
node_modules/.bin/protractor
```