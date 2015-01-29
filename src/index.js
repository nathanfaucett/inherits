var create = require("create"),
    extend = require("extend"),
    mixin = require("mixin");


module.exports = function inherits(child, parent) {

    mixin(child, parent);
    child.prototype = extend(create(parent.prototype), child.prototype);
    child.prototype.constructor = child;
    child.__super = parent.prototype;

    return child;
};
