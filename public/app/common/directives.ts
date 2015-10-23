/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../declarations.ts" />
/// <reference path="../data/dataService.ts" />
/// <reference path="../common/filters.ts" />

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
	
	export interface ICurrentTimeDirectiveScope extends angular.IScope {
		format: string;
	}
	
	class CurrentTimeDirective implements angular.IDirective {
        public static get DirectiveName(): string { return 'currentTime'; };
		public restrict = 'E';
		public scope = {
			format: '@'
		};
		
		private momentFilter: IMomentFilter;
		
		constructor(
			private $interval: angular.IIntervalService,
			$filter: angular.IFilterService) {
				
				this.momentFilter = <IMomentFilter>$filter(momentFilterId);
			}
		
		public link: angular.IDirectiveLinkFn = (scope: ICurrentTimeDirectiveScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes) => {
			var timeoutId;
			
			var updateTime = (elem: angular.IAugmentedJQuery) => {
				element.text(this.momentFilter(new Date(), scope.format));
			}
			
			element.on('$destroy', () => {
				this.$interval.cancel(timeoutId);
			});
			
			timeoutId = this.$interval(() => {
				updateTime(element);
			}, 1000);
		}
		
		static factory() {
			var directive = ($interval, momentFilter) => {
				return new CurrentTimeDirective($interval, momentFilter);
			};
			directive.$inject = ['$interval', '$filter'];
			return directive;
		}
	}
	angular.module(commonModuleId).directive(CurrentTimeDirective.DirectiveName, CurrentTimeDirective.factory());
	
	export interface IMyTemplateDirectiveScope extends angular.IScope {
		options: {
			message: string
		},
		data: any
	}
	
	class MyTemplateDirective implements angular.IDirective {
        public static get DirectiveName(): string { return 'myTemplateDirective'; };
		public restrict = 'E';
		public templateUrl = "app/templates/myTemplateDirective.html";
		
		public scope = {
			options: '=',
			data: '='
		};
		
		constructor(private dataService: IDataService) { }
		
		public link: angular.IDirectiveLinkFn = (scope: IMyTemplateDirectiveScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes) => {
			this.dataService.getData().then(data => {
                scope.data = data[0];
			});
		}
		
		static factory() {
			var directive = (dataService) => {
				return new MyTemplateDirective(dataService);
			};
			directive.$inject = [dataServiceId];
			return directive;
		}
	}
	angular.module(commonModuleId).directive(MyTemplateDirective.DirectiveName, MyTemplateDirective.factory());
}