/**
 * Created by shaddy on 15.02.16.
 */
const BasicType = require("./BasicType.js");
const util = require('util');
var ObjectType = function(params){
    BasicType.call(this, params);
    this.typeName = "object";
};
util.inherits(ObjectType, BasicType);

ObjectType.prototype.checkNumericKeys = function(){
    for (var k in this.params.children){
        if (isNaN(k)){
            return false
        }
    }
    return true;
};

ObjectType.prototype.getTypeDef = function(){
    if (this.checkNumericKeys()){
        for (var k in this.params.children){
            return "Object.<number, " + this.params.children[k].getTypeDef() + ">";
        }
        /*console.log(this.params.children);
        throw new Error("aaaa");*/
        return "Object";
    } else {
        var result = {};
        for (var k in this.params.children){
            result[k] = this.params.children[k].getTypeDef();
        }
        var strResult = [];
        for (var k in result){
            strResult.push(k + ":" + result[k]);
        }
        return "{" + strResult.join(", ") + "}";
    }

};
module.exports = ObjectType;