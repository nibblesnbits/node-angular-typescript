/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="declarations.ts" />
/// <reference path="common/services.ts" />
/// <reference path="common/logging.ts" />

module myApp {
    'use strict';

    angular.module(appModuleId, [
        shellModuleId,
        homeModuleId,
        dataModuleId,
        commonModuleId,
        authModuleId,
        'ui.router',
        'ngCookies'
    ])
    .config(LoggerConfiguration)
    .config(ApplicationConfiguration)
    .run(Run);

    function ApplicationConfiguration($urlRouterProvider: angular.ui.IUrlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
    }
    ApplicationConfiguration.$inject = ['$urlRouterProvider'];

    function LoggerConfiguration(provider: NotifierService, $logProvider: angular.ILogProvider,  $provide: angular.auto.IProvideService) {
        $logProvider.debugEnabled(true);
        provider.setNotifiers(new ConsoleNotifier());
    }
    LoggerConfiguration.$inject = [notifierProviderId, '$logProvider', '$provide'];

    function Run($rootScope: angular.IRootScopeService, $state: angular.ui.IStateService, $stateParams: angular.ui.IStateParamsService, appConfig: IAppConfigService) {
        
        // set configuration values
        appConfig.DataApiUrl = "/api";
        appConfig.AuthApiUrl = "/auth";
        appConfig.AuthClientId = "node-angular-typescript";
        
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