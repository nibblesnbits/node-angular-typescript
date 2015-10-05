/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../../public/app/common/directives.ts" />
var tests;
(function (tests) {
    describe('MyComplexDirective', function () {
        var scope, createDirective;
        beforeEach(angular.mock.module(myApp.commonModuleId));
        beforeEach(angular.mock.module('templates'));
        beforeEach(angular.mock.inject(function ($injector) {
            var $compile = $injector.get('$compile');
            scope = $injector.get('$rootScope');
            scope['options'] = {
                message: 'hello'
            };
            createDirective = function () {
                return $compile('<my-complex-directive options="options"></my-complex-directive>')(scope);
            };
        }));
        describe('on creation', function () {
            var sut;
            beforeEach(function () {
                sut = createDirective();
                scope.$digest();
            });
            it('creates an element with isolated scope', function () {
                var contents = sut.contents();
                expect(sut.hasClass('ng-isolate-scope')).toBe(true);
                expect(contents.find('p').text().indexOf('karma-ng-html2js-preprocessor')).toBeGreaterThan(-1);
            });
        });
    });
    describe('MyDirective', function () {
        var scope, createDirective;
        beforeEach(angular.mock.module(myApp.commonModuleId));
        beforeEach(angular.mock.inject(function ($injector) {
            var $compile = $injector.get('$compile');
            scope = $injector.get('$rootScope');
            createDirective = function () {
                return $compile('<my-directive></my-directive>')(scope);
            };
        }));
        describe('on creation', function () {
            var sut;
            beforeEach(function () {
                sut = createDirective();
                scope.$digest();
            });
            it('appends the "someClass" class', function () {
                expect(sut.hasClass('someClass')).toBe(true);
            });
        });
    });
})(tests || (tests = {}));
//# sourceMappingURL=directives.test.js.map