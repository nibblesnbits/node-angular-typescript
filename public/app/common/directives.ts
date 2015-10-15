/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../declarations.ts" />
/// <reference path="../data/dataService.ts" />

/*
	--- Angular.js Diretives in TypeScript ---
	
	This file demonstrates a simple method for defining Angular.js
	Directives in TypeScript.
	
	The approach for defining directives with Typescript is 2-fold:
	1.	Defining a class, implementing IDirective, with the appropiate
		functions and properties
	2.	Defining a factory function that returns an instance of the
		directive and accepts any necessary dependencies.
		
	The most critical piece of this design is the factory() method.
	This method returns a function with a $inject propery defined,
	which allows passing the result of that fuction directly into
	Angular's directive() function.
	
	In order to define the dependencies necessary in the directive,
	simply include them in the $inject array on the `directive`
	variable within the `factory()` function.
	
	For convenience and to save on some magic strings, each Directive
	also includes a DirectiveName property, which we can use in other
	code, such a unit tests.
*/

module myApp {
	
	class MyDirective implements angular.IDirective {
        public static get DirectiveName(): string { return 'myDirective'; };
		public restrict = 'AE';
		public template = "<p>I'm a directive!</p>";
		
		constructor() { }
		
		public link: angular.IDirectiveLinkFn = (scope: angular.IScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes) => {
			element.addClass('someClass');
		}
		
		static factory() {
			var directive = () => {
				return new MyDirective();
			};
			directive.$inject = [];
			return directive;
		}
	}
	angular.module(commonModuleId).directive(MyDirective.DirectiveName, MyDirective.factory());
	
	export interface MyComplexDirectiveScope extends angular.IScope {
		options: {
			message: string
		}
	}
	
	class MyComplexDirective implements angular.IDirective {
        public static get DirectiveName(): string { return 'myComplexDirective'; };
		public restrict = 'AE';
		public templateUrl = "app/templates/myComplexDirective.html";
		
		public scope = {
			options: '='
		};
		
		constructor(private dataService: IDataService) { }
		
		public link: angular.IDirectiveLinkFn = (scope: MyComplexDirectiveScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes) => {
			element.add('<p>{{options.message}}</p>');
		}
		
		static factory() {
			var directive = (dataService) => {
				return new MyComplexDirective(dataService);
			};
			directive.$inject = [dataServiceId];
			return directive;
		}
	}
	angular.module(commonModuleId).directive(MyComplexDirective.DirectiveName, MyComplexDirective.factory());
}