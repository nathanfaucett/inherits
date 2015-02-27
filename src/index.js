var create = require("create"),
    extend = require("extend"),
    mixin = require("mixin"),
    defineProperty = require("define_property");


function defineConstructorProperty(object, name, value) {
    defineProperty(object, name, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: value
    });
}


module.exports = function inherits(child, parent) {

    mixin(child, parent);

    child.prototype = extend(create(parent.prototype), child.prototype);

    defineConstructorProperty(child, "__super", parent.prototype);
    defineConstructorProperty(child.prototype, "constructor", child);

    return child;
};
