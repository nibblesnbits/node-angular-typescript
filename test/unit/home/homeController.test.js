/// <reference path="../../../typings/tsd.d.ts" />
var tests;
(function (tests) {
    describe('HomeController', function () {
        var dataService, createController;
        beforeEach(angular.mock.module(myApp.appModuleId));
        beforeEach(angular.mock.inject(function ($injector) {
            var $q = $injector.get("$q");
            var $controller = $injector.get('$controller');
            var mocks = new tests.Mocks(new Chance());
            dataService = $injector.get("dataService");
            spyOn(dataService, "getData").and
                .returnValue(new $q(function (resolve) { return resolve(mocks.generateRandomObjects()); }));
            createController = function () {
                return $controller(myApp.homeControllerId, { dataService: dataService });
            };
        }));
        describe('on creation', function () {
            var sut;
            beforeEach(function () {
                sut = createController();
            });
            it('calls getData', function () {
                expect(dataService.getData).toHaveBeenCalledWith();
            });
        });
    });
})(tests || (tests = {}));
//# sourceMappingURL=homeController.test.js.map