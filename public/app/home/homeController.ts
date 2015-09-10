/// <reference path="../../../typings/tsd.d.ts" />

module myApp {
    export const homeModuleId = 'app.home';
    export const homeControllerId = 'homeController';
    export const homeStateName = 'app.home';

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
        
        public static $inject = [dataServiceId];
        
        public data: any[];
        
        constructor(private dataService: myApp.IDataService) {
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