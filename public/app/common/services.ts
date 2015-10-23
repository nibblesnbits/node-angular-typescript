/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../declarations.ts" />


/*
    --- Services and their dependencies in TypeScript ---
    
    This file demonstrates some interesting design strategies when creating
    Angular.js Services.
    
    Using a combination of Angular.js Services and Factories, we can create
    highly configurable services, such as the AppConfigService below.
    
    AppConfigService is created via 2 steps:
    1.  Injection of a StorageServiceFactory instance, which accepts an instance
        of an IStorageContainer.
    2.  Injection of the dependencies required by the IStorageContainer instance.
    
    In order to implement a new storage mechanism, simply create a new class that 
    implement IStorageContainer and pass that into the StorageServiceFactory. See
    the constructor of AppConfigService for an example.
    
*/

module myApp {
    
    /**
     * A key/value store for storing arbitrary data 
     */
    export interface IStorageContainer {
        
        /**
         * Sets a value in the storage container at the specified key
         *
         * @param {string} key Key to store the item at
         * @param {any} data Data to store
         */
		set(key: string, data: any): void;
        
        /**
         * Gets the value at the specfied key
         *
         * @param {string} key Key at which the item is stored
         */
        get(key: string): string;     
    }
    
    export class LocalStorageContainer implements IStorageContainer {
        public set(key: string, data: any): void {
            localStorage.setItem(key,data);
        }
        public get(key: string) : string {
            return localStorage.getItem(key);
        }
    }
    
    export class CookieStorageContainer implements IStorageContainer {
        
        private cookieDateFormat = 'ddd, MMM YYYY hh:mm:ss';
        private expirationSpan = 10;
        
        constructor(
            private $cookies: angular.cookies.ICookiesService) {
            
        }
        
        public set(key: string, data: any): void {
            var split = location.hostname.split('.').splice(-2);

            if (split.length > 1) {
                this.$cookies.put(key, data, {
                    expires: moment().add(this.expirationSpan, 'days').format(this.cookieDateFormat),
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
    
    /**
     * A key/value store for storing arbitrary data 
     */
    export interface IStorageService {
        /**
         * Sets a value in the storage container at the specified key
         *
         * @param {string} key Key to store the item at
         * @param {any} data Data to store
         */
		setItem(key: string, data: any): void;
        /**
         * Gets the value at the specfied key
         *
         * @param {string} key Key at which the item is stored
         */
        getItem(key: string): string;        
    }
    
    export interface IStorageServiceFactory {
        (storageMethod: IStorageContainer): IStorageService
    }

    class StorageService implements IStorageService {
        
        constructor(private store: IStorageContainer) { }
        
        public setItem(key: string, data: any): void {
            this.store.set(key,data);
        }
        public getItem(key: string) : string {
            return this.store.get(key);
        }
        
		static factory(): IStorageServiceFactory {
			var factoryFn = (storageMethod: IStorageContainer) => {
				return new StorageService(storageMethod);
			};
			return factoryFn;
		}
    }
    
    angular.module(commonModuleId).factory(storageServiceFactoryId, StorageService.factory);
    
    /**
     * Service for accessing application configuration via named properites
     */
    export interface IAppConfigService {
        /**
         * The base URL for the common data service
         */
        DataApiUrl: string;
        /**
         * The base URL for accessing authorization API calls
         */
        AuthApiUrl: string;
        /**
         * The ClientId used for OAuth authorization
         */
        AuthClientId: string;
    }
    /**
     * Service for accessing application configuration via named properites
     */
    export interface IAppConfigServiceProvider {
        /**
         * The base URL for the common data service
         */
        DataApiUrl: string;
        /**
         * The base URL for accessing authorization API calls
         */
        AuthApiUrl: string;
        /**
         * The ClientId used for OAuth authorization
         */
        AuthClientId: string;
    }

    /**
     * Service for accessing application configuration via named properites
     */
    export class AppConfigService implements IAppConfigService {
        public static $inject = [storageServiceFactoryId];
        
        private dataApiUrlKey = 'config_dataApiUrl';
        private authApiUrlKey = 'config_authApiUrl';
        private authClientIdKey = 'config_authClentId';
        private cookieExpirationKey = 'config_cookieExpiration';

        private storage: IStorageService;
        
        constructor(factory: IStorageServiceFactory) {
			this.storage = factory(new LocalStorageContainer());
        }
        
        public set DataApiUrl(url: string) {
            this.storage.setItem(this.dataApiUrlKey,url);
        }
        public get DataApiUrl() : string {
            return this.storage.getItem(this.dataApiUrlKey);
        }
        
        public set AuthApiUrl(url: string) {
            this.storage.setItem(this.authApiUrlKey,url);
        }
        public get AuthApiUrl() : string {
            return this.storage.getItem(this.authApiUrlKey);
        }
        
        public set AuthClientId(clientId: string) {
            this.storage.setItem(this.authClientIdKey, clientId);
        }
        public get AuthClientId() : string {
            return this.storage.getItem(this.authClientIdKey);
        }
        
        static getProvider() : angular.IServiceProviderFactory {
            return () => {
                return {
                    $get: [storageServiceFactoryId, (factory) => new AppConfigService(factory)]
                };
            };
        }
    }
    
    angular.module(commonModuleId).service(appConfigServiceId, AppConfigService);
    angular.module(commonModuleId).provider(appConfigProviderId, AppConfigService.getProvider());
}