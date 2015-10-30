/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="declarations.ts" />
/// <reference path="common/services.ts" />
/// <reference path="common/logging.ts" />

module myApp {
    /* Application Configuration */
	export function RouteConfiguration($urlRouterProvider: angular.ui.IUrlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
    }
    RouteConfiguration.$inject = ['$urlRouterProvider'];

    /* Logger Configuration */
    export function LoggerConfiguration(provider: INotifierProvider, loggerProvider :ILoggerProvider, $logProvider: angular.ILogProvider,  $provide: angular.auto.IProvideService) {
        $logProvider.debugEnabled(true);
        provider.setNotifiers(new ConsoleNotifier());
        loggerProvider.setLogLevel(LogLevel.trace);
    }
    LoggerConfiguration.$inject = [notifierProviderId, loggerProviderId, '$logProvider', '$provide'];
}