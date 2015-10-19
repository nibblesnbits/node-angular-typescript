/*
    declarations.ts
    
    This file is used as a single point of access for all the dependency
    injection identifiers required througout the application.
    Using a common set of constants for these values reduces the
    likelihood of typos in module names, which can sometimes be tough
    to track down.  Any new module should have an entry here.
    
    It is also used for other common constants, such as state names.
    
    Using this method allows for consistency throughout the codebase,
    as well as the elimination of many magic strings, and easier code
    hints in your editor.
    
*/

module myApp {
    export const commonModuleId = 'common';
    export const appModuleId = 'app';
    
	export const dataModuleId = 'dataModule';
    export const dataServiceId = 'dataService';

    export const shellModuleId = 'app.shell';
    
    export const homeModuleId = 'app.home';
    export const homeControllerId = 'homeController';
    export const homeStateName = 'app.home';
    
    export const notifierServiceId = 'notifierService';
    export const notifierProviderId = notifierServiceId + 'Provider';
	
	export const storageServiceFactoryId = 'storageServiceFactory';
	export const appConfigServiceId = 'appConfigService';
    export const appConfigProviderId = appConfigServiceId + 'Provider';
    
    export const loggerServiceId = 'loggerService';
}