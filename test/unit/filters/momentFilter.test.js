/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../../public/app/common/filters.ts" />
var tests;
(function (tests) {
    describe('MomentFilter', function () {
        var filter, date;
        beforeEach(angular.mock.module(myApp.commonModuleId));
        beforeEach(angular.mock.inject(function ($injector) {
            var $filter = $injector.get('$filter');
            filter = $filter(myApp.momentFilterId);
            date = new Date();
        }));
        describe('on default call', function () {
            it('formats the current date with the default format', function () {
                expect(filter(date)).toBe(moment(date).format(myApp.MomentFilter.DefaultFormat));
            });
        });
        describe('when fed invalid date', function () {
            it('returns error message', function () {
                var result = filter('test');
                expect(result.indexOf('Error')).toBeGreaterThan(-1);
            });
        });
        describe('when fed a custom date', function () {
            it('returns date in that format', function () {
                var format = 'YYYY';
                var year = date.getFullYear().toString();
                expect(filter(date, format)).toBe(year);
            });
        });
    });
})(tests || (tests = {}));
//# sourceMappingURL=momentFilter.test.js.map