/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../declarations.ts" />
/// <reference path="../common/authorization.ts" />
/// <reference path="../common/logging.ts" />



module myApp {
    angular.module(shellModuleId, [
        'ui.router'
    ])
    .config(ShellStateConfiguration);
  
    function ShellStateConfiguration($stateProvider: ng.ui.IStateProvider) {
        $stateProvider
            .state("app", {
                abstract: true,
                url: '/',
                templateUrl: 'app/layout/shell.html',
                controller: ShellController,
                controllerAs: 'shell'
            });
    }
    ShellStateConfiguration.$inject = ['$stateProvider'];

    class ShellController {
        // nothing needed...yet.
    }
}