#!/usr/bin/env node

/**
 * Created by shaddy on 15.02.16.
 */
var fs = require("fs");
var NodeProcessor = require("./nodeProcessor");
const NodeFilter = require("./NodeFilter.js");
var opts = require('node-getopt').create([
    ['f', '' , 'file name'],
    ['m', 'maxLvl=ARG', "saximum nested level"],
    ['h', 'help', 'sisplay this help'],
    ['v', 'version', 'show version'],
    ['s', 'startKey=ARG', 'Start path key for working ie path.to.key, if you need to access into array you can use integer keys i.e a.1.b.3.c'],
    ['d', 'typeDef=ARG', 'If set will use @typedef instead of @type']
])              // create Getopt instance
    .bindHelp()     // bind option 'help' to default action
    .parseSystem(); // parse command line
console.log(opts);
if (opts.options.version){
    console.log("version is:" + JSON.parse(fs.readFileSync(require('path').resolve(
            __dirname,
            'package.json'))).version);
    process.exit(0);
} else if (opts.argv.length == 0){
    console.error("no file argument");
    process.exit(1);
} else {
    opts.options.f = opts.argv[0];
}

var processor = new NodeProcessor();
console.log("reading file:", opts.options.f);
var data = fs.readFileSync(opts.options.f);
var parsed = JSON.parse(data);
if (opts.options.startKey){
    parsed = NodeFilter.queryPath(opts.options.startKey, parsed);
}
var res = processor.process("MainBlock", parsed, opts);
//console.log(res);
var stringifyTypes = function(data){
    var str = "/**\n" +
        "* @type {" + data.getTypeDef() + "} " + "\n" +
        "*/";
    return str;
};
var stringifyTypedefs = function(data, typeName){
    var str = "/**\n" +
        "* @typedef {" + data.getTypeDef() + "} " + typeName + "\n" +
        "*/";
    return str;
};
if (opts.options.typeDef){
    console.log(stringifyTypedefs(res, opts.options.typeDef));
} else {
    console.log(stringifyTypes(res));
}

