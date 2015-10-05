/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../declarations.ts" />


module myApp {
    export interface IDataService {
        getData(): angular.IPromise<any[]>
    }

    export class DataService implements IDataService {
        public static $inject = ['$http', appConfigServiceId];

        private baseUrl: string;

        constructor(
            private $http: angular.IHttpService, 
            private appConfig: IAppConfigService) {
			
            this.baseUrl = appConfig.DataApiUrl;
        }

        public getData(): angular.IPromise<any[]> {
            return this.$http.get(this.baseUrl + "/data").then((resp: angular.IHttpPromiseCallbackArg<any[]>) => {
                return resp.data;
            });
        }
    }

    angular.module(dataModuleId, []).service(dataServiceId, DataService);
}