/// <reference path="../../typings/tsd.d.ts" />
var tests;
(function (tests) {
    var Mocks = (function () {
        function Mocks(chance) {
            this.letterPool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            this.chance = chance;
        }
        Mocks.prototype.generateRandomObjects = function (count) {
            if (!count)
                count = 3;
            var objs = new Array();
            for (var i = 0; i < count; i++) {
                objs.push({
                    guid: this.chance.string({ length: 32, pool: this.letterPool })
                });
            }
            return objs;
        };
        Mocks.prototype.generateRandomStrings = function (count) {
            var _this = this;
            return Array.apply(null, Array(count)).map(function () { return _this.chance.string({ length: 32, pool: _this.letterPool }); });
        };
        return Mocks;
    })();
    tests.Mocks = Mocks;
})(tests || (tests = {}));
//# sourceMappingURL=mocks.js.map