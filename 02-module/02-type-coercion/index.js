// https://dorey.github.io/JavaScript-Equality-Table/
// https://www.freecodecamp.org/news/js-type-coercion-explained-27ba3d9a2839

console.assert(String(123) === "123", "Explicit conversion to string")
console.assert(123 + '' === "123", "Implicit conversion to string")
console.assert(('hello' || 123) === "hello", "|| returns the first truthy value element")
console.assert(('hello' && 123) === 123, "&& returns the last truthy value element if both are true")

const item = {
    name: "Corvisquire",
    type: ["Flying"],

    // Calls it first. If it's not a primitive type it call the valueOf() method
    // Only works when [Symbol.toPrimitive] is not defined
    toString() {
        return `${this.name} is a ${this.type.join(", ")} type Pokémon`
    },

    // Calls it first. If it's not a primitive type it call the toString() method
    // Only works when [Symbol.toPrimitive] is not defined
    valueOf() {
        return 7
    },

    // This function has priority over the toString() and valueOf() methods
    [Symbol.toPrimitive](coercionType) {
        console.log("Trying to convert to", coercionType)
        const types = {
            string: JSON.stringify(this),
            number: "007"
        }

        return types[coercionType] || types.string
    }
}

// Before adding the [Symbol.toPrimitive] method
console.log('toString', String(item))
console.log('valueOf', Number(item))

// After adding the [Symbol.toPrimitive] method
console.log("String", String(item))
console.log("Number", Number(item))