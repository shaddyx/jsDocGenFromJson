/**
 * Created by shaddy on 15.02.16.
 */
var fs = require("fs");
var NodeProcessor = require("./nodeProcessor");
var opts = require('node-getopt').create([
    ['f', '' , 'file name'],
    ['m', 'maxLvl=ARG', "maximum nested level"],
    ['h', 'help', 'display this help'],
    ['v', 'version', 'show version']
])              // create Getopt instance
    .bindHelp()     // bind option 'help' to default action
    .parseSystem(); // parse command line
console.log(opts);

if (opts.argv.length == 0){
    console.error("no file argument");
    process.exit(1);
} else {
    opts.options.f = opts.argv[0];
}
var processor = new NodeProcessor();
console.log("reading file:", opts.options.f);
var data = fs.readFileSync(opts.options.f);
var parsed = JSON.parse(data);
var res = processor.process("MainBlock", parsed, opts);
//console.log(res);
var stringifyTypes = function(data){
    var str = "/**\n" +
        "* @type {" + data.getTypeDef() + "} " + "\n" +
        "*/";
    return str;
};

console.log(stringifyTypes(res));