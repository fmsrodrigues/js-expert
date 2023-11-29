const { deepStrictEqual } = require("node:assert")

{
    // Primitive type create a new copy of the value

    let counter = 0
    let counter2 = counter
    counter2++

    deepStrictEqual(counter, 0)
    deepStrictEqual(counter2, 1)
}


{
    // Reference type create a copy of the reference to the same object

    const item = { counter: 0 }
    const item2 = item
    item2.counter++

    deepStrictEqual(item, item2)
}