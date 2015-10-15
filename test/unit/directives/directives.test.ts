/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../../public/app/common/directives.ts" />


module tests {
    describe('MyComplexDirective', function () {

        var 
            scope: angular.IRootScopeService,
            createDirective: () => angular.IAugmentedJQuery;

        // note that we use only the 'common' module here
        beforeEach(angular.mock.module(myApp.commonModuleId));
        beforeEach(angular.mock.module('templates'));

        beforeEach(angular.mock.inject(($injector) => {
            var $compile: angular.ICompileService = $injector.get('$compile');
            
            scope = $injector.get('$rootScope');
            
			scope['options'] = {
                message: 'hello'
            };
            
            createDirective = () => {
                return $compile('<my-complex-directive options="options"></my-complex-directive>')(scope);
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
	
	describe('MyDirective', function () {

        var 
            scope: angular.IRootScopeService,
            createDirective: () => angular.IAugmentedJQuery;

        // note that we use only the 'common' module here
        beforeEach(angular.mock.module(myApp.commonModuleId));

        beforeEach(angular.mock.inject(($injector) => {
            var $compile: angular.ICompileService = $injector.get('$compile');
            
            scope = $injector.get('$rootScope');
            
            createDirective = () => {
                return $compile('<my-directive></my-directive>')(scope);
            };
        }));
        
        describe('on creation', () => {
            var sut: angular.IAugmentedJQuery;
            
            beforeEach(() => {
                sut = createDirective();
                scope.$digest();
            });
            
            it('appends the "someClass" class', () => {
                
                expect(sut.hasClass('someClass')).toBe(true);
            });
        });
    });
}