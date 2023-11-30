const assert = require("node:assert")

const obj = {}
const arr = []
const fn = () => { }

// objects literals are explicity functions
console.log("new Object() is {}?", new Object().__proto__ === {}.__proto__)
assert.deepStrictEqual(new Object().__proto__, {}.__proto__)

// __proto__ is the reference to the prototype of the constructor function
console.log("obj.__proto__ === Object.prototype", obj.__proto__ === Object.prototype)
assert.deepStrictEqual(obj.__proto__, Object.prototype)
console.log("arr.__proto__ === Array.prototype", arr.__proto__ === Array.prototype)
assert.deepStrictEqual(arr.__proto__, Array.prototype)
console.log("fn.__proto__ === Function.prototype", fn.__proto__ === Function.prototype)
assert.deepStrictEqual(fn.__proto__, Function.prototype)

// __proto__ of the Object.prototype is null
console.log("obj.__proto__.__proto__ === null", obj.__proto__.__proto__ === null)

function Employee() { }
Employee.prototype.salary = () => "salary**"
console.log(Employee.prototype.salary())

function Supervisor() { }
// Inheritance
Supervisor.prototype = Object.create(Employee.prototype)
Supervisor.prototype.profitShare = () => "profitShare**"
console.log(Supervisor.prototype.salary())

function Manager() { }
Manager.prototype = Object.create(Supervisor.prototype)
Manager.prototype.monthlyBonuses = () => "monthlyBonuses**"

// Cant be called directly because it is not in the prototype chain
// console.log(Manager.salary())  <- Error
console.log(Manager.prototype.salary())

// If not created with "new", the first __proto__ will be the Function.prototype
// without inheritance from others classes
// To access the classes without using "new" you need to call the prototype
console.log("Manager.prototype.__proto__ === Supervisor.prototype", Manager.prototype.__proto__ === Supervisor.prototype)
assert.deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype)

// When created with "new", the __proto__ receives the prototype of the function
console.log("manager.__proto__: %s, manager.salary(): %s", new Manager().__proto__, new Manager().salary())
console.log("Super.prototype === new Manager().__proto__.__proto__", Supervisor.prototype === new Manager().__proto__.__proto__)
assert.deepStrictEqual(Supervisor.prototype, new Manager().__proto__.__proto__)

const manager = new Manager()
console.log("manager.salary()", manager.salary())
console.log("manager.profitShare()", manager.profitShare())
console.log("manager.monthlyBonuses()", manager.monthlyBonuses())

// Manager -> Supervisor -> Employee -> Object -> null
console.log(manager.__proto__.__proto__.__proto__.__proto__.__proto__)
assert.deepStrictEqual(manager.__proto__, Manager.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__, Employee.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__, Object.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__.__proto__, null)

class T1 {
    ping() { return "ping" }
}

class T2 extends T1 {
    pong() { return "pong" }
}

class T3 extends T2 {
    shoot() { return "shoot" }
}

const t3 = new T3()
console.log("t3 inherits null?", t3.__proto__.__proto__.__proto__.__proto__.__proto__ === null)
console.log("t3.ping()", t3.ping())
console.log("t3.pong()", t3.pong())
console.log("t3.shoot()", t3.shoot())
assert.deepStrictEqual(t3.__proto__, T3.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__, T2.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__, Object.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__.__proto__, null)