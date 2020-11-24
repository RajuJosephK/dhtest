# Snipcart-web-and-API-automation using cypress

### Introduction
* The test was written using cypress io, both the UI and API test.
* Used mochawesome for html report generation.
* There are 4 spec files, one for each of the scenario.  path: \cypress\integration
* The test reports are located in \cypress\report\mochawesome-report.  There are 4 html reports one for each spec file.
* Added config variable "chromeWebSecurity":false, to fix cross-origin error on page load in cypress.json, apart from other config variables.
* Added 'uncaught:exception' handler in index.js, for exception handling.
* Added additional comments as part of the tests.

### Setting up the project
* Clone the repository.
* Ensure that you have latest node version is installed.
* From the root of project run the below commands.

* npm install  -- This will intall all the required dependencies.
* npx cypress open  -- This will open the cypress test runner to run the test in GUI mode
or 
* node_modules/.bin/cypress open
* npx cypress run   -- This will run the cypress test in non GUI mode also will generated the mochawesome reports.
* node_modules/.bin/cypress run

## Issues
### On changing the spec file the changes are not being picked up by cypress runner
  
* Add the the below code to clear the serviceWorkerCache.  https://github.com/cypress-io/cypress/issues/702

  before(function () {
  // run this once before all code
  return window.caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        return window.caches.delete(cacheName);
      })
    );
  })
})


