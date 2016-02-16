/**
 * Created by shaddy on 15.02.16.
 */
const BasicType = require("./BasicType.js");
const util = require('util');
var StringType = function(params){
    BasicType.call(this, params);
    this.typeName = "string";
};
util.inherits(StringType, BasicType);
module.exports = StringType;