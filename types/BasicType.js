/**
 * Created by shaddy on 15.02.16.
 */
var BasicType = function(params){
    this.params = params;
};
BasicType.prototype.getTypeDef = function(){
    return this.getTypeName();
};
BasicType.prototype.getTypeName = function(){
    if (!this.typeName){
        throw new Error("Error type");
    }
    return this.typeName;
};
module.exports = BasicType;