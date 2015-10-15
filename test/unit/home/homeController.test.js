/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../../public/app/common/directives.ts" />
/// <reference path="../../../public/app/data/dataservice.ts" />
/// <reference path="../../../public/app/home/homeController.ts" />
/// <reference path="../mocks.ts" />
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
                return $controller(myApp.DataService.InjectionName, { dataService: dataService });
            };
        }));
        describe('on creation', function () {
            var sut;
            beforeEach(function () {
                sut = createController();
            });
            it('calls getData', function () {
                expect(dataService.getData).toHaveBeenCalled();
            });
        });
    });
})(tests || (tests = {}));
//# sourceMappingURL=homeController.test.js.map