/**
 * Created by shaddy on 15.02.16.
 */
const BasicType = require("./BasicType.js");
const util = require('util');
var ArrayType = function(params){
    BasicType.call(this, params);
    this.typeName = "array";
};
util.inherits(ArrayType, BasicType);
ArrayType.prototype.getTypeDef = function() {
    var maxString = "[]";
    for (var k in this.params.children){
        if (maxString.length < this.params.children[k].getTypeDef().length){
            maxString = this.params.children[k].getTypeDef();
        }
    }
   return maxString + "[]";
};
module.exports = ArrayType;