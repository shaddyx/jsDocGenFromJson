/**
 * Created by shaddy on 15.02.16.
 */
const BasicType = require("./BasicType.js");
const util = require('util');
var NumberType = function(params){
    BasicType.call(this, params);
    this.typeName = "number";
};
util.inherits(NumberType, BasicType);
module.exports = NumberType;

