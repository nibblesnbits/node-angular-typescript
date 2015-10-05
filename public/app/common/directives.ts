/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../declarations.ts" />


module myApp {
	class myDirective implements angular.IDirective {
		public restrict = 'AE';
		public template = "<p>I'm a directive!</p>";
		
		constructor(private $http: angular.IHttpService) { }
		
		public link: angular.IDirectiveLinkFn = (scope: angular.IScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes) => {
			element.addClass('someClass');
		}
		
		static factory() {
			var directive = ($http) => {
				return new myDirective($http);
			};
			directive.$inject = ['$http'];
			return directive;
		}
	}
	angular.module(commonModuleId).directive('myDirective', myDirective.factory());
	
	export interface MyComplexDirectiveScope extends angular.IScope {
		options: {
			message: string
		}
	}
	
	class myComplexDirective implements angular.IDirective {
		public restrict = 'AE';
		public templateUrl = "app/templates/myComplexDirective.html";
		
		public scope = {
			options: '='
		};
		
		constructor() { }
		
		public link: angular.IDirectiveLinkFn = (scope: MyComplexDirectiveScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes) => {
			element.add('<p>{{options.message}}');
		}
		
		static factory() {
			var directive = () => {
				return new myComplexDirective();
			};
			directive.$inject = [];
			return directive;
		}
	}
	angular.module(commonModuleId).directive('myComplexDirective', myComplexDirective.factory());
}