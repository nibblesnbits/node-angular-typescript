/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="declarations.ts" />
/// <reference path="common/services.ts" />
/// <reference path="common/logging.ts" />

module myApp {
    /* Application Configuration */
	export function ApplicationConfiguration($urlRouterProvider: angular.ui.IUrlRouterProvider, appConfig: AppConfigService ) {
        $urlRouterProvider.otherwise('/home');
        
        appConfig.DataApiUrl = "/api";
        appConfig.AuthApiUrl = "/auth";
        appConfig.AuthClientId = "node-angular-typescript";
    }
    ApplicationConfiguration.$inject = ['$urlRouterProvider', appConfigProviderId];

    /* Logger Configuration */
    export function LoggerConfiguration(provider: NotifierService, $logProvider: angular.ILogProvider,  $provide: angular.auto.IProvideService) {
        $logProvider.debugEnabled(true);
        provider.setNotifiers(new ConsoleNotifier());
    }
    LoggerConfiguration.$inject = [notifierProviderId, '$logProvider', '$provide'];
    
    /* $exceptionHandler Decoration */
    export function ExceptionHandlerConfiguration($provide: angular.auto.IProvideService) {
        $provide.decorator('$exceptionHandler', ['$delegate', loggerServiceId,  ($delegate: angular.IExceptionHandlerService, logger: ILogger) => {
            return (exception: Error, cause) => {
                $delegate(exception, cause);
                logger.error(exception.message);
            }
        }]);
    }
    ExceptionHandlerConfiguration.$inject = ['$provide'];
}