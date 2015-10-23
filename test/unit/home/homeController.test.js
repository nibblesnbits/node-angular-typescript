/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../../public/app/common/directives.ts" />
/// <reference path="../../../public/app/data/dataService.ts" />
/// <reference path="../../../public/app/home/homeController.ts" />
/// <reference path="../mocks.ts" />
var tests;
(function (tests) {
    describe('HomeController', function () {
        var dataService, createController;
        beforeEach(angular.mock.module(myApp.homeModuleId, myApp.dataModuleId, myApp.commonModuleId));
        beforeEach(angular.mock.inject(function ($injector) {
            var $q = $injector.get("$q");
            var $controller = $injector.get('$controller');
            var mocks = new tests.Mocks(new Chance());
            dataService = $injector.get(myApp.dataServiceId);
            var logger = $injector.get(myApp.loggerServiceId);
            spyOn(dataService, "getData").and
                .returnValue(new $q(function (resolve) { return resolve(mocks.generateRandomObjects()); }));
            createController = function () {
                return $controller(myApp.homeControllerId, { dataService: dataService, logger: logger });
            };
        }));
        describe('on creation', function () {
            it('calls getData', function () {
                createController();
                expect(dataService.getData).toHaveBeenCalled();
            });
        });
    });
})(tests || (tests = {}));
//# sourceMappingURL=homeController.test.js.map