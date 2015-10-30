/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../declarations.ts" />
/// <reference path="./services.ts" />


/*
	--- Angular.js Providers ---
	
	This file demonstrates a simple method for defining Angular.js
	Providers in TypeScript.
	
	The general approach here is to first create a Provider, in this case
    the INotifierService, that can be accessed during the configuration
    phase of your angular application.  This service is then passed to the
    ILogger and used to send notifications to the user via that INotifier's
    notify() method.
    
    This approach allows us to easily configure where and how log messages
    are displayed in one place.
*/

module myApp {
    
    /**
     * Defines a set of functions for displaying notifications
     */
    export interface INotifier {
        /** Send a notification message */
        notify(msg: string, type?: string, prefix?: string): void;
    }

    /**
     * Provider for setting notifiers
     */
    export interface INotifierProvider extends angular.IServiceProvider {
        /**
         * Sets the notifiers used by the Logging service
         * @param notifiers One or more INotifier intances
         */
        setNotifiers(...notifiers: INotifier[]): void;
        /**
         * Returns the list of registered notifiers
         */
        getNotifiers(): INotifier[];
    }

    /**
     * Service for accessing notifiers
     */
    export interface INotifierService {
        /**
         * Sets the notifiers used by the Logging service
         * @param notifiers One or more INotifier intances
         */
        setNotifiers(...notifiers: INotifier[]): void;
        /**
         * Returns the list of registered notifiers
         */
        getNotifiers(): INotifier[];
    }
	
	export class NotifierProvider implements INotifierProvider {
    
        private notifiers: INotifier[];  
	
		// Configuration function
		public setNotifiers(...notifiers: INotifier[]) {
			this.notifiers = notifiers;
        }

        public getNotifiers(): INotifier[] {
            return this.notifiers;
        }

		// Provider's factory function (produces a SERVICE)
		public $get() : INotifierService {
			return {
                getNotifiers: () => { return this.notifiers },
                setNotifiers: (...notifiers: INotifier[]) => { return this.setNotifiers; }
			};
		}
	}
	
    angular.module(commonModuleId).provider(notifierServiceId, NotifierProvider);
    
    /**
     * Enumeration defining log levels
     */
    export enum LogLevel {
        trace = 0,
        debug = 1,
        info = 2,
        warn = 3,
        error = 4
    };
    
    /**
     * Defines a set of logging functions
     */
    export interface ILogger {
        /** Log a generic message */
        log(msg: string): void;
        /** Log a debug message */
        debug(msg: string): void;
        /** Log an information message */
        info(msg: string): void;
        /** Log a warning message */
        warn(msg: string): void;
        /** Log an error message */
        error(msg: string): void;
    }


    export interface ILoggerProvider extends angular.IServiceProvider {
        setLogLevel(level: LogLevel): void;
    }

    export interface ILoggerService {
        getLogger(moduleId): ILogger;
    }

    export class LoggerProvider implements ILoggerProvider {
        public static $inject = [notifierProviderId];
        
        private notifiers: INotifier[];
        private logLevel = LogLevel.trace;

        constructor(
            private notifierService: INotifierProvider) {

        }

        public setLogLevel(level: LogLevel): void {
            this.logLevel = level;
        }
        
        public getLogger(moduleId): ILogger {
            var prefix = "[" + moduleId + "]: ";
            return {
                log: (msg: string) => this.notify(msg, LogLevel.trace, undefined, prefix),
                debug: (msg: string) => this.notify(msg, LogLevel.debug, 'debug', prefix),
                info: (msg: string) => this.notify(msg, LogLevel.info, 'info', prefix),
                warn: (msg: string) => this.notify(msg, LogLevel.warn, 'warn', prefix),
                error: (msg: string) => this.notify(msg, LogLevel.error, 'error', prefix)
            };
        }
        
        private notify(msg: string, level: LogLevel, type?: string, prefix?: string) {
            if (this.logLevel > level) {
                return;
            }
            this.notifierService.getNotifiers().forEach(notifier => {
               notifier.notify(msg, type, prefix); 
            });
        }

        // Provider's factory function (produces a SERVICE)
        public $get(): ILoggerService {
            return {
                getLogger: (moduleId) => { return this.getLogger(moduleId); }
            };
        }
    }
    
    angular.module(commonModuleId).provider(loggerServiceId, LoggerProvider);
    
    /**
     * A simple notifier that prints to the console
     */
    export class ConsoleNotifier implements INotifier {
        public notify(msg: string, type?: string, prefix?: string) {
            console[type || 'log'](prefix + msg);
        }
    }

//     /**
//      * A notifier that sends message to a Toastr instance
//      */
//     export class ToastrNotifier implements INotifier {
//         
//         constructor(options: {}) {
//             toastr.options = angular.extend(options, {
//                 debug: false,
//                 newestOnTop: false,
//                 progressBar: false,
//                 preventDuplicates: false,
//                 onclick: null,
//                 showDuration: 300,
//                 hideDuration: 1000,
//                 timeOut: 5000,
//                 extendedTimeOut: 1000,
//                 showEasing: "swing",
//                 hideEasing: "linear",
//                 showMethod: "fadeIn",
//                 hideMethod: "fadeOut",
//                 tapToDismiss: true
//             });
//         }
// 
//         public notify(msg: string, type?: string, prefix?: string) {
//             if (!type)
//                 return;
//             toastr[type](msg);
//         }
//     }
}