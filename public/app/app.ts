/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="declarations.ts" />
/// <reference path="common/services.ts" />
/// <reference path="common/logging.ts" />
/// <reference path="config.ts" />


module myApp {
    'use strict';

    angular.module(appModuleId, [
        shellModuleId,
        homeModuleId,
        dataModuleId,
        commonModuleId,
        'ui.router',
        'ngCookies'
    ])
    .config(LoggerConfiguration)
    .config(ExceptionHandlerConfiguration)
    .config(ApplicationConfiguration)
    .run(Run);

    
    function Run($rootScope: angular.IRootScopeService, $state: angular.ui.IStateService, $stateParams: angular.ui.IStateParamsService) {
        
        $rootScope["$state"] = $state;
        $rootScope["$stateParams"] = $stateParams;
        $rootScope.$on('$stateChangeSuccess', function (event: angular.IAngularEvent, toState: angular.ui.IState) {
            if (angular.isDefined(toState.data)) {
                if (angular.isDefined(toState.data.pageTitle)) {
                    $rootScope["pageTitle"] = toState.data.pageTitle + ' | Troi';
                }
            }
        });
    }
    Run.$inject = ['$rootScope', '$state', '$stateParams']; 
}