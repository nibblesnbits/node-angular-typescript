/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../declarations.ts" />

module myApp {
    
    interface IStorageContainer {
		set(key: string, data: any): void;
        get(key: string): string;     
    }
    
    class LocalStorageContainer implements IStorageContainer {
        public set(key: string, data: any): void {
            localStorage.setItem(key,data);
        }
        public get(key: string) : string {
            return localStorage.getItem(key);
        }
    }
    
    class CookieStorageContainer implements IStorageContainer {
        
        private cookieDateFormat = 'ddd, MMM YYYY hh:mm:ss';
        private expirationSpan = 10;
        
        constructor(
            private $cookies: angular.cookies.ICookiesService) {
            
        }
        
        public set(key: string, data: any): void {
            var split = location.hostname.split('.').splice(-2);

            if (split.length > 1) {
                this.$cookies.put(key, data, {
                    expires: moment().add(this.expirationSpan, 'days').format('ddd, MMM YYYY hh:mm:ss'),
                    domain: split.join('.')
                });
            } else {
                this.$cookies.put(key, data);
            }
        }
        public get(key: string) : string {
            return this.$cookies.get(key);
        }
    }
    
    export interface IStorageService {
		setItem(key: string, data: any): void;
        getItem(key: string): string;        
    }
    
    interface StorageServiceFactory {
        (storageMethod: IStorageContainer): IStorageService
    }

    class StorageService implements IStorageService {
        public static $inject = [];

        constructor(private store: IStorageContainer) {
			
        }
        
        public setItem(key: string, data: any): void {
            this.store.set(key,data);
        }
        public getItem(key: string) : string {
            return this.store.get(key);
        }
        
		static factory(): StorageServiceFactory {
			var factoryFn = (storageMethod: IStorageContainer) => {
				return new StorageService(storageMethod);
			};
			factoryFn.$inject = [];
			return factoryFn;
		}
    }
    
    angular.module(commonModuleId).factory(storageServiceFactoryId, StorageService.factory);
    
    export interface IAppConfigService {
        DataApiUrl: string;
    }

    export class AppConfigService implements IAppConfigService {
        public static $inject = [storageServiceFactoryId, '$cookies'];
        
        private apiUrlKey = 'config_apiUrl';
        private cookieExpirationKey = 'config_cookieExpiration';

        private storage: IStorageService;

        constructor(factory: StorageServiceFactory, $cookies) {
			this.storage = factory(new CookieStorageContainer($cookies));
        }
        
        public set DataApiUrl(url: string) {
            this.storage.setItem(this.apiUrlKey,url);
        }
        public get DataApiUrl() : string {
            return this.storage.getItem(this.apiUrlKey);
        }
    }
    
    angular.module(commonModuleId).service(appConfigServiceId, AppConfigService);
}