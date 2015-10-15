/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="declarations.ts" />
/// <reference path="common/services.ts" />




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
    .config(ApplicationConfiguration)
    .run(Run);

    function ApplicationConfiguration($urlRouterProvider: angular.ui.IUrlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
    }
    ApplicationConfiguration.$inject = ['$urlRouterProvider'];

    function Run($rootScope: angular.IRootScopeService, $state: angular.ui.IStateService, $stateParams: angular.ui.IStateParamsService, appConfig: IAppConfigService) {
        
        // set configuration values
        appConfig.DataApiUrl = "/api";
        
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
    Run.$inject = ['$rootScope', '$state', '$stateParams', appConfigServiceId]; 
}