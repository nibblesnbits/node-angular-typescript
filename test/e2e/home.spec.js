// var httpBackendMock = function() {
//     angular.module('mockBackend', ['ngMockE2E'])
//     .value('configData', arguments[0])
//     .run(function($httpBackend,configData) {
//         console.log('bootstrapped!');
//         $httpBackend.whenGET(/\/api.*/).respond(configData.fakeData);
//     });
// };
// 
// var config = {
// 	fakeData: [
// 		{foo: 'bar'}
// 	]
// };

describe('home page', function() {
	// beforeEach(function() {
	// 	browser.addMockModule('mockBackend', httpBackendMock, config);
	// });
	
	it('should have a "homePage" element', function() {
		browser.get('/');
		
		var e = element(by.id('homePage'));
		
		expect(e).toBeDefined();
	});
	
	describe('data repeater', function() {
		it('should have an element for each data item', function() {
			browser.get('/');
			
			var e = element.all(by.repeater('d in vm.data'));
			
			expect(e.count()).toBe(1);
		});
	});
});