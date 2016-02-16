/**
 * Created by shaddy on 15.02.16.
 */
const NumberType = require("./types/NumberType.js");
const BooleanType = require("./types/BoolType.js");
const StringType = require("./types/StringType.js");
const ObjectType = require("./types/ObjectType.js");
const ArrayType = require("./types/ArrayType.js");
const NullType = require("./types/NullType.js");
const StrUtils = require("./StrUtils.js");
var NodeProcessor = function(data, params){
    this.params = params;
    this.process(data);
};
NodeProcessor.prototype.process = function(name, val, globalParams, lvl){
    lvl = lvl || 0;
    var result = undefined;
    var params = {
        val:val,
        name:name,
        globalParams:globalParams
    };
    if (typeof (val) === "number"){
        result = new NumberType(params);
    } else if (typeof (val) === "boolean"){
        result = new BooleanType(params);
    } else if (typeof (val) === "string"){
        result = new StringType(params);
    } else if (typeof (val) === "object"){
        if (val === null){
            result = new NullType(params);
        } else if (val instanceof Array){
            params.children = [];
            if (globalParams.options.maxLvl === undefined || lvl <= globalParams.options.maxLvl){
                for (var i = 0; i < val.length; i++){
                    params.children[i] = this.process(false, val[i], globalParams, lvl ++);
                }
            }
            result = new ArrayType(params);
        } else {
            params.children = {};
            if (globalParams.options.maxLvl === undefined || lvl <= globalParams.options.maxLvl) {
                for (var k in val) {
                    params.children[k] = this.process(StrUtils.capitalize(k), val[k], globalParams, lvl++);
                }
            }
            result = new ObjectType(params);
        }
    }

    return result;
};

module.exports = NodeProcessor;