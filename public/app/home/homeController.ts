/// <reference path="../../../typings/tsd.d.ts" />

module myApp {
    angular.module(homeModuleId, [
        'ui.router'
    ]).config(Config);

    function Config($stateProvider: angular.ui.IStateProvider) {
        $stateProvider.state(homeStateName, {
            url: 'home',
            controller: HomeController,
            controllerAs: 'vm',
            templateUrl: 'app/home/home.html',
            data: { pageTitle: 'Home' }
        });
    }
    Config.$inject = ['$stateProvider'];

    export class HomeController {
        
        public static $inject = [dataServiceId, greetingProviderId];
        
        public data: any[];
        public message: string;
        
        constructor(private dataService: myApp.IDataService, greetingProvider: IGreetingProvider) {
            
            this.message = greetingProvider.getGreeting();
            
            this.activate();
        }

        private activate() {
            this.dataService.getData().then(data => {
                this.data = data;
            });
        }
    }

    angular.module(homeModuleId).controller(homeControllerId, HomeController);
    
}