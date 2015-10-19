/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../declarations.ts" />
/// <reference path="./services.ts" />

module myApp {
    
    export interface INotifierService {
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
        log(msg: string): void;
        debug(msg: string): void;
        info(msg: string): void;
        warn(msg: string): void;
        error(msg: string): void;
    }
    
    export interface INotifier {
        notify(msg: string, type?: string): void;
    }
    

    export class LoggerService implements ILogger {
        public static $inject = [notifierServiceId];
        
        private notifiers: INotifier[];

        constructor(
            notifierService: INotifierService,
            private $log: angular.ILogService) {
            
            this.notifiers = notifierService.getNotifiers();
        }
        
        public log(msg: string) :void {
            this.$log.log(msg);
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
            this.notifiers.forEach(notifier => {
               notifier.notify(msg, type); 
            });
        }
    }
    
    angular.module(commonModuleId).service(loggerServiceId, LoggerService);
    
    /* notifiers */
    
    export class ConsoleNotifier implements INotifier {
        public notify(msg: string, type?: string) {
            console.log(msg);
        }
    }
}