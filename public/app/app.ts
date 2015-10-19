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
        'ui.router',
        'ngCookies'
    ])
    .config(LoggerConfiguration)
    .config(ExceptionHandlerConfiguration)
    .config(ApplicationConfiguration)
    .run(Run);

    function ApplicationConfiguration($urlRouterProvider: angular.ui.IUrlRouterProvider, appConfig: AppConfigService ) {
        $urlRouterProvider.otherwise('/home');
        
        appConfig.DataApiUrl = "/api";
        appConfig.AuthApiUrl = "/auth";
        appConfig.AuthClientId = "node-angular-typescript";
    }
    ApplicationConfiguration.$inject = ['$urlRouterProvider', appConfigProviderId];

    function LoggerConfiguration(provider: NotifierService, $logProvider: angular.ILogProvider,  $provide: angular.auto.IProvideService) {
        $logProvider.debugEnabled(true);
        provider.setNotifiers(new ConsoleNotifier());
    }
    LoggerConfiguration.$inject = [notifierProviderId, '$logProvider', '$provide'];
    
    function ExceptionHandlerConfiguration($provide: angular.auto.IProvideService) {
        $provide.decorator('$exceptionHandler',['$delegate', loggerServiceId,  ($delegate: angular.IExceptionHandlerService, logger: ILogger) => {
            return (exception: Error, cause) => {
                $delegate(exception, cause);
                logger.error(exception.message);
            }
        }]);
    }
    ExceptionHandlerConfiguration.$inject = ['$provide'];

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