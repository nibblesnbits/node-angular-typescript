/// <reference path="../../../typings/tsd.d.ts" />

module tests {
    describe('HomeController', function () {

        var 
            dataService: myApp.IDataService,
            createController: () => myApp.HomeController;

        beforeEach(angular.mock.module(myApp.appModuleId));

        beforeEach(angular.mock.inject(($injector) => {

            var $q: angular.IQService = $injector.get("$q");
            var $controller: angular.IControllerService = $injector.get('$controller');
            var mocks = new Mocks(new Chance());
            
            dataService = $injector.get("dataService");
            
            spyOn(dataService, "getData").and
                .returnValue(new $q(resolve => resolve(mocks.generateRandomObjects())));
            
            createController = () => {
                return $controller(myApp.homeControllerId, { dataService: dataService });
            }
        }));
        
        describe('on creation', () => {
            var sut: myApp.HomeController;
            
            beforeEach(() => {
                sut = createController();
            });
            
            it('calls getData', () => {
                
                expect(dataService.getData).toHaveBeenCalledWith();
            });
        });
    });
}