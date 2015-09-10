/// <reference path="../../../typings/tsd.d.ts" />


module myApp {
	export const dataModuleId = 'dataModule';
    export const dataServiceId = 'dataService';

    export interface IDataService {
        getData(): ng.IPromise<any[]>
    }

    export class DataService implements IDataService {
        public static $inject = ['$http'];


        constructor(private $http: ng.IHttpService) {
			
        }

        public getData(): angular.IPromise<any> {
            return this.$http.get("/api/data").then((resp: ng.IHttpPromiseCallbackArg<any[]>) => {
                return resp.data;
            });
        }

    }

    angular.module(dataModuleId, []).service(dataServiceId, DataService);
}