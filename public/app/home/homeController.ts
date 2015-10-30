/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../declarations.ts" />
/// <reference path="../data/dataservice.ts" />
/// <reference path="../common/services.ts" />
/// <reference path="../common/logging.ts" />

/*
    --- Angular.js Controllers and ui-router in TypeScript ---
    
    This file demonstrates a consistent method of defining Angular.js
    Controllers and ui-router States in TypeScript.
    
    Since controllers and states go hand-in-hand when using ui-router,
    we follow a simple pattern:
    -  Define a unique module that contains the state and controller
    -  Define the controller the state will use
    -  Pass the name of the controller into the $stateProvider.state()
       function
    
    Defining these two elements is as follows.
    
    Controllers:
    Angular Controllers in TypeScript are simply classes with thier
    dependencies defined in their constructors.
    Like other Angular/TypeScript patterns, we provide a public
    static `$inject` property that defines the array of actual identifiers
    for the dependencies.  This allows us to simply pass the name
    of the controller class into the Angular controller() function,
    and the dependency injection is taken care of cleanly.
    
    States:
    To simplify defining and registering ui-router states, we define
    a function named {myStateName}StateConfiguration, where we define
    the configuration, and inject $stateProvider into it.  This function
    calls the $stateProvider.state() function, passing in the configuration
    of the state.  With this function defined, we can simply pass the name
    of the function into our state-specfic module's config() function.
    This causes Angular to immediately call the function, which registers
    the state with ui-router.
*/

module myApp {
    angular.module(homeModuleId, [
        'ui.router'
    ]).config(HomeStateConfiguration);

    function HomeStateConfiguration($stateProvider: angular.ui.IStateProvider) {
        $stateProvider.state(homeStateName, {
            url: 'home',
            controller: HomeController,
            controllerAs: 'vm',
            templateUrl: 'app/home/home.html'
        });
    }
    HomeStateConfiguration.$inject = ['$stateProvider'];

    /**
     * Controller for the 'Home' state.
     */
    export class HomeController {
        public static $inject = [dataServiceId, loggerServiceId];
        
        public data: any[];
        private logger: ILogger;
        
        constructor(
            private dataService: myApp.IDataService,
            loggerService: ILoggerService) {
            
            this.logger = loggerService.getLogger(homeControllerId);
            this.activate();
            this.logger.log('State '+homeStateName + ' loaded');
        }

        private activate() {
            this.dataService.getData().then(data => {
                this.data = data;
            });
        }
    }

    angular.module(homeModuleId).controller(homeControllerId, HomeController);
}