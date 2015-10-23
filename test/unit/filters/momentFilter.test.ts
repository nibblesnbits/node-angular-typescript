/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../../public/app/common/filters.ts" />

module tests {
    describe('MomentFilter', function () {

        var filter : myApp.IMomentFilter,
            date: Date;
		
        // note that we use only the 'common' module here
        beforeEach(angular.mock.module(myApp.commonModuleId));

        beforeEach(angular.mock.inject(($injector) => {
            var $filter: angular.IFilterService = $injector.get('$filter');
            
			filter = <myApp.IMomentFilter>$filter(myApp.momentFilterId);
            date = new Date();
        }));
        
        describe('on default call', () => {
			it('formats the current date with the default format', () => {
                
                expect(filter(date)).toBe(moment(date).format(myApp.MomentFilter.DefaultFormat));
            });
        });
        describe('when fed invalid date', () => {
			it('returns error message', () => {
                
                var result = filter('test');
                expect(result.indexOf('Error')).toBeGreaterThan(-1);
            });
        });
        describe('when fed a custom date', () => {
			it('returns date in that format', () => {
                
                var format = 'YYYY';
                var year = date.getFullYear().toString()
                expect(filter(date, format)).toBe(year);
            });
        });
    });
}