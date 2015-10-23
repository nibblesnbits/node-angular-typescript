/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../../public/app/common/directives.ts" />
/// <reference path="../../../public/app/data/dataService.ts" />
/// <reference path="../../../public/app/home/homeController.ts" />
/// <reference path="../mocks.ts" />

module tests {
    describe('HomeController', function () {

        var 
            dataService: myApp.IDataService,
            createController: () => myApp.HomeController;

        beforeEach(angular.mock.module(myApp.homeModuleId, myApp.dataModuleId, myApp.commonModuleId));

        beforeEach(angular.mock.inject(($injector) => {

            var $q: angular.IQService = $injector.get("$q");
            var $controller: angular.IControllerService = $injector.get('$controller');
            var mocks = new Mocks(new Chance());
            
            dataService = $injector.get(myApp.dataServiceId);
            var logger = $injector.get(myApp.loggerServiceId);
            
            spyOn(dataService, "getData").and
                .returnValue(new $q(resolve => resolve(mocks.generateRandomObjects())));
            
            createController = () => {
                return $controller(myApp.homeControllerId, { dataService: dataService, logger: logger });
            }
        }));
        
        describe('on creation', () => {
            
            it('calls getData', () => {
                createController();
                expect(dataService.getData).toHaveBeenCalled();
            });
        });
    });
}