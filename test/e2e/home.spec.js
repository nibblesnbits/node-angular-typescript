describe('home page', function() {
	
	it('should have a "homePage" element', function() {
		browser.get('/');
		
		var e = element(by.id('homePage'));
		
		expect(e).toBeDefined();
	});
	
	it('should have a repeater for the data', function() {
		browser.get('/');
		
		
		var e = element.all(by.repeater('d in vm.data'));
		
		expect(e.count()).toBe(1);
	});
});