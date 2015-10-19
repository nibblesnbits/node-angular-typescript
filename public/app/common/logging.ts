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
    
    export interface INotifierService {
        /**
         * Returns the list of registered notifiers
         */
        getNotifiers(): INotifier[];
	}
	
	export class NotifierService implements angular.IServiceProvider {
    
        private notifiers: INotifier[];    
	
		// Configuration function
		public setNotifiers(...notifiers: INotifier[]) {
			this.notifiers = notifiers;
		}
        
		// Provider's factory function
		public $get() : INotifierService {
			return {
				getNotifiers: () => { return this.notifiers; }
			};
		}
	}
	
	angular.module(commonModuleId).provider(notifierServiceId, NotifierService);
    
    export interface ILogger {
        /** Log a debug message */
        debug(msg: string): void;
        /** Log a generic message */
        log(msg: string): void;
        /** Log an information message */
        info(msg: string): void;
        /** Log a warning message */
        warn(msg: string): void;
        /** Log an error message */
        error(msg: string): void;
    }
    
    export interface INotifier {
        /** Send a notification message */
        notify(msg: string, type?: string): void;
    }
    
    export class LoggerService implements ILogger {
        public static $inject = [notifierServiceId, '$log'];
        
        private notifiers: INotifier[];

        constructor(
            notifierService: INotifierService,
            private $log: angular.ILogService) {
            
            this.notifiers = notifierService.getNotifiers();
        }
        
        public log(msg: string) :void {
            this.notify(msg);
        }
        public debug(msg: string) : void {
            this.notify(msg);
        }
        public info(msg: string) : void  {
            this.notify(msg, 'info');
        }
        public warn(msg: string) : void  {
            this.notify(msg, 'warn');
        }
        public error(msg: string) : void  {
            this.notify(msg, 'error');
        }
        
        private notify(msg: string, type?: string) {
            // this.$log[type || 'log'](msg);
            this.notifiers.forEach(notifier => {
               notifier.notify(msg, type); 
            });
        }
    }
    
    angular.module(commonModuleId).service(loggerServiceId, LoggerService);
    
    /* notifiers */
    
    /**
     * A simple notifier that prints to the console
     */
    export class ConsoleNotifier implements INotifier {
        public notify(msg: string, type?: string) {
            switch(type) {
                case 'info': {
                    console.info(msg);
                    break;    
                }
                case 'warn': {
                    console.warn(msg);
                    break;    
                }
                case 'debug': {
                    console.debug(msg);
                    break;    
                }
                case 'error': {
                    console.error(msg);
                    break;    
                }
                default: {
                    console.log(msg);
                }
            }
        }
    }
}