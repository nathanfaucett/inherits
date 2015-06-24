var assert = require("assert"),
    inherits = require("../src/index");


describe("inherits(childConstructor, parentConstructor)", function() {
    it("should make childConstructor inherits parentConstructor", function() {
        var male;

        function Person(name, sex) {
            this.name = name;
            this.sex = sex;
        }

        Person.staticFunction = function() {
            return "Person";
        };

        Person.prototype.print = function() {
            return this.name + " " + this.sex;
        };

        function Male(name) {
            Person.call(this, name, "male");
        }
        inherits(Male, Person);

        male = new Male("Bob");

        assert.deepEqual(male, {
            name: "Bob",
            sex: "male"
        });

        assert.equal(male.print(), "Bob male");
        assert.equal(male instanceof Person, true);
        assert.equal(Male.staticFunction(), "Person");
    });

    it("should make childConstructor inherits parentConstructor", function() {
        function Animal(type) {
            this.type = type;
        }
        Animal.prototype.getType = function() {
            return this.type;
        };

        function Blind() {
            this.isBlind = true;
        }
        Blind.prototype.getSight = function() {
            return "none";
        };


        function Bat() {
            Animal.call(this, "Bat");
            Blind.call(this);
        }
        inherits(Bat, Blind);
        inherits(Bat, Animal);

        assert.equal(new Bat().getSight, Blind.prototype.getSight);
        assert.equal(new Bat().getType, Animal.prototype.getType);

        assert.equal(new Bat() instanceof Animal, true);
    });
});
