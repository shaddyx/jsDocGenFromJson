/**
 * Created by shaddy on 15.02.16.
 */
const BasicType = require("./BasicType.js");
const util = require('util');
var NullType = function(params){
    BasicType.call(this, params);
    this.typeName = "null";
};
util.inherits(NullType, BasicType);
module.exports = NullType;