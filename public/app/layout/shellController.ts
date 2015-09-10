/// <reference path="../../../typings/tsd.d.ts" />

module myApp {
    export const shellModuleId = 'app.shell';
    
    
    angular.module(shellModuleId, [
        'ui.router'
    ])
    .config(Config);
  
    function Config($stateProvider: ng.ui.IStateProvider) {
        $stateProvider
            .state("app", {
                abstract: true,
                url: '/',
                templateUrl: 'app/layout/shell.html',
                controller: ShellController,
                controllerAs: 'shell'
            });
    }
    Config.$inject = ['$stateProvider'];

    class ShellController {
        
        public static $inject = [];
        
        constructor() {
            
        }
    }
}