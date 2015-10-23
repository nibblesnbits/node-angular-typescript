/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../../public/app/common/directives.ts" />
/// <reference path="../mocks.ts" />



module tests {
    describe('MyComplexDirective', function () {

        var 
            scope: angular.IScope,
            createDirective: () => angular.IAugmentedJQuery;

        // note that we use only the 'common' module here
        beforeEach(angular.mock.module(myApp.commonModuleId));
        beforeEach(angular.mock.module(myApp.dataModuleId));
        beforeEach(angular.mock.module('templates'));

        beforeEach(angular.mock.inject(($injector) => {
            var $compile: angular.ICompileService = $injector.get('$compile');
            
            var $q: angular.IQService = $injector.get("$q");
            var $controller: angular.IControllerService = $injector.get('$controller');
                
            scope = $injector.get('$rootScope').$new();
            
			scope['options'] = {
                message: 'hello'
            };
            
            createDirective = () => {
                return $compile('<my-template-directive options="options"></my-template-directive>')(scope);
            };
        }));
        
        describe('on creation', () => {
            var sut: angular.IAugmentedJQuery;
            
            beforeEach(() => {
                sut = createDirective();
                scope.$digest();
            });
            
            it('creates an element with isolated scope', () => {
                expect(sut.hasClass('ng-isolate-scope')).toBe(true);
            });
                        
            it('<span> element contains message', () => {
                var contents = sut.contents();
                
                expect(contents.find('span').text().indexOf(scope['options'].message)).toBeGreaterThan(-1);
            });
        });
    });
	
	describe('CurrentTimeDirective', function () {

        var 
            scope: angular.IScope,
            $interval: angular.IIntervalService,
            createDirective: () => angular.IAugmentedJQuery;

        // note that we use only the 'common' module here
        beforeEach(angular.mock.module(myApp.commonModuleId));

        beforeEach(angular.mock.inject(($injector) => {
            var $compile: angular.ICompileService = $injector.get('$compile');
            
            scope = $injector.get('$rootScope').$new();
            $interval = $injector.get('$interval');
            
            createDirective = () => {
                return $compile('<current-time></current-time>')(scope);
            };
        }));
        
        describe('on creation', () => {
            var sut: angular.IAugmentedJQuery;
            
            beforeEach(() => {
                sut = createDirective();
                scope.$digest();
            });
            
            it('shows a time', () => {
                $interval.flush(1000);
                expect(sut.text()).toBeDefined();
            });
        });
    });
}