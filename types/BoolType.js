/**
 * Created by shaddy on 15.02.16.
 */
const BasicType = require("./BasicType.js");
const util = require('util');
var BoolType = function(params){
    BasicType.call(this, params);
    this.typeName = "boolean";
};
util.inherits(BoolType, BasicType);
module.exports = BoolType;