/// <reference path="../../typings/tsd.d.ts" />

var httpBackendMock = function() {
    angular.module('mockBackend', ['ngMockE2E'])
    .value('configData', arguments[0])
    .run(function($httpBackend,configData) {
        console.log('bootstrapped!');
		
		// this is because Selenium is dumb about how I store my configs.
        $httpBackend.whenGET("/api/data").respond(configData.fakeData);
        $httpBackend.whenGET(/.*\.html/).passThrough();
    });
};

var config = {
	fakeData: [
		{foo: 'bar'}
	]
};

describe('home page', function() {
	beforeEach(function() {
		browser.addMockModule('mockBackend', httpBackendMock, config);
	});
	
	it('should have a "homePage" element', function() {
		browser.get('/');
		
		var e = element(by.id('homePage'));
		
		expect(e).toBeDefined();
	});
	
	describe('data repeater', function() {
		it('should have an element for each data item', function() {
			browser.get('/');
			
			var e = element.all(by.repeater('d in vm.data'));
			
			expect(e.count()).toBe(config.fakeData.length);
		});
	});
	
	afterAll(() => {
		browser.manage().logs().get('browser').then((browserLogs) => {
		// browserLogs is an array of objects with level and message fields
			browserLogs.forEach((log) => {
                if (log.level.value > 900){
				    console.log('Browser Console Log: ' + log.message);
                }
			});
		});
	});
});