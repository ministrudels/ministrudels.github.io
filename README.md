# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn`
Install all packages.

### `yarm dev`
Start the development server.

### `yarn build`
Build the application for production. to the `/dist` directory.

## Node v
16.15.0
## Deploy to gh pages
Run the following commands to publish to gh-pages

1. `yarn build`

2. `node`
3. ```js
    var ghpages = require('gh-pages');

    ghpages.publish('dist', function(err) {});
    ```
