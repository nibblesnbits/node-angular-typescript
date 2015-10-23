/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../../public/app/common/directives.ts" />
/// <reference path="../mocks.ts" />
var tests;
(function (tests) {
    describe('MyComplexDirective', function () {
        var scope, createDirective;
        beforeEach(angular.mock.module(myApp.commonModuleId));
        beforeEach(angular.mock.module(myApp.dataModuleId));
        beforeEach(angular.mock.module('templates'));
        beforeEach(angular.mock.inject(function ($injector) {
            var $compile = $injector.get('$compile');
            var $q = $injector.get("$q");
            var $controller = $injector.get('$controller');
            scope = $injector.get('$rootScope').$new();
            scope['options'] = {
                message: 'hello'
            };
            createDirective = function () {
                return $compile('<my-template-directive options="options"></my-template-directive>')(scope);
            };
        }));
        describe('on creation', function () {
            var sut;
            beforeEach(function () {
                sut = createDirective();
                scope.$digest();
            });
            it('creates an element with isolated scope', function () {
                expect(sut.hasClass('ng-isolate-scope')).toBe(true);
            });
            it('<span> element contains message', function () {
                var contents = sut.contents();
                expect(contents.find('span').text().indexOf(scope['options'].message)).toBeGreaterThan(-1);
            });
        });
    });
    describe('CurrentTimeDirective', function () {
        var scope, $interval, createDirective;
        beforeEach(angular.mock.module(myApp.commonModuleId));
        beforeEach(angular.mock.inject(function ($injector) {
            var $compile = $injector.get('$compile');
            scope = $injector.get('$rootScope').$new();
            $interval = $injector.get('$interval');
            createDirective = function () {
                return $compile('<current-time></current-time>')(scope);
            };
        }));
        describe('on creation', function () {
            var sut;
            beforeEach(function () {
                sut = createDirective();
                scope.$digest();
            });
            it('shows a time', function () {
                $interval.flush(1000);
                expect(sut.text()).toBeDefined();
            });
        });
    });
})(tests || (tests = {}));
//# sourceMappingURL=directives.test.js.map