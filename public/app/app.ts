/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="declarations.ts" />
/// <reference path="common/services.ts" />
/// <reference path="common/logging.ts" />
/// <reference path="config.ts" />


module myApp {
    
    angular.module(appModuleId, [
        shellModuleId,
        homeModuleId,
        dataModuleId,
        commonModuleId,
        'ui.router',
        'ngCookies'
    ])
        .constant(configConstKey, {})
        .config(LoggerConfiguration)
        .config(RouteConfiguration)
        .run(Run);

    
    function Run(appConfig: IAppConfigService) {
        // because AppConfigService relies on a factory, we have to do this in the Run step
        appConfig.DataApiUrl = '/api'
    }
    Run.$inject = [appConfigServiceId]; 
}