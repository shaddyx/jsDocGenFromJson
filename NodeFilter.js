"use strict";
/**
 * Created by shaddy on 01.09.16.
 */
var NodeFilter = {
    filterFrom:function(name, nodes){
        for (var k in nodes){
            if (k === name){
                return nodes[k];
            }
        }
        //
        //  2nd level
        //
        for (var k in nodes){
            if (typeof nodes[k] === "object"){
                var res = this.filterFrom(name, nodes[k]);
                if (res != undefined){
                    return res;
                }
            }
        }
        return undefined;
    },
    queryPath:function(path, nodes){
        var chunks = path.split(".");
        var result = nodes;
        for (var k in chunks){
            var name = chunks[k];
            result = result[name];
            if (result === undefined){
                throw Error("Error, no such key:" + name + " for path:" + path);
            }
        }
        return result;
    }
};
module.exports = NodeFilter