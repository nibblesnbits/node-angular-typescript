/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../declarations.ts" />

module myApp {
	
	export interface IMomentFilter {
		(input: moment.Moment|string, format?: string): string;
	}
	
	export class MomentFilter {
        public static get DefaultFormat(): string { return 'YYYY-MM-DD hh:mm:ss a'; };
		
		public factory(): IMomentFilter {
			return (input: moment.Moment|string, format?: string) => {
				var date = moment(input || '');
	
				if (date.isValid()){
					return date.format(format || MomentFilter.DefaultFormat);
				}
				return '(Error: Invalid Date)';
			}
		}
	}
	angular.module(commonModuleId).filter(momentFilterId, new MomentFilter().factory);
}