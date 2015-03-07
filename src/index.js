var create = require("create"),
    extend = require("extend"),
    mixin = require("mixin"),
    defineProperty = require("define_property");


var descriptor = {
    configurable: true,
    enumerable: false,
    writable: true,
    value: null
};


function defineConstructorProperty(object, name, value) {
    descriptor.value = value;
    defineProperty(object, name, descriptor);
    descriptor.value = null;
}

function defineStatic(name, value) {
    defineConstructorProperty(this, name, value);
}

module.exports = function inherits(child, parent) {

    mixin(child, parent);

    child.prototype = extend(create(parent.prototype), child.prototype);

    defineConstructorProperty(child, "__super", parent.prototype);
    defineConstructorProperty(child.prototype, "constructor", child);

    child.defineStatic = defineStatic;
    child.super_ = parent; // support node

    return child;
};
