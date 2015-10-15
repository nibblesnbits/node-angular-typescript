describe('home page', function() {
	
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