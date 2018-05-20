# Webpack-Angular-Karma-Solution

### Quick Start

* Run 'npm install' in order to install Packages.
* Run 'npm run start' to see the outcome at http://localhost:8090.
* Run 'npm run test' to launch Karma page, and click Debug to check test result.

### Code Structure

* config/ --- Webpack and Karma configuration
* src/ --- Source code
  * app/ --- Main component, display dropdown menu and pass data to product component
    * services/ --- Read data from Json file
    * components/product/ --- Product component, display product details according to the data passed from Main component
  * assets/ --- Top css file, product images and Json file
