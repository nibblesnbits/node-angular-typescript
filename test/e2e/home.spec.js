var httpBackendMock = function() {
    angular.module('mockBackend', ['ngMockE2E'])
    .value('configData', arguments[0])
    .run(function($httpBackend,configData) {
        console.log('bootstrapped!');
		
		// this is because Selenium is dumb about how I store my configs.
        $httpBackend.whenGET("null/data").respond(configData.fakeData);
        $httpBackend.whenGET(/.*\.html/).passThrough();
    });
};

var config = {
	fakeData: [
		{foo: 'bar'}
	]
};

describe('app', function() {
	beforeEach(function() {
		browser.addMockModule('mockBackend', httpBackendMock, config);
	});

	it('should set items in localStorage', function() {
		browser.get('/');
		
		// TODO: for some reason Selenium doesn't like the way I use providers.
		
		var value = browser.executeScript("return window.localStorage.getItem('config_dataApiUrl');");
		
		console.log('url: ' + value);
		
		// browser.pause();
		
		expect(value).toBe("/api");
	});
});

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
	
	afterAll(function() {
		browser.manage().logs().get('browser').then(function(browserLogs) {
		// browserLogs is an array of objects with level and message fields
			browserLogs.forEach(function(log){
				console.log('Browser Console Log: ' + log.message);
			});
		});
	});
});