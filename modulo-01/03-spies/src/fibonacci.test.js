const assert = require('node:assert');
const { createSandbox } = require('sinon');
const Fibonacci = require('./fibonacci');

const sinon = createSandbox();


; (async () => {
    {
        const fibonacci = new Fibonacci();
        const spy = sinon.spy(
            fibonacci,
            fibonacci.execute.name
        )

        for (const sequencia of fibonacci.execute(3)) { }

        const expectedCallCount = 4

        // console.log('spy', spy.getCalls())
        assert.strictEqual(spy.callCount, expectedCallCount, "callCount is wrong")
    }

    {
        const fibonacci = new Fibonacci();
        const spy = sinon.spy(
            fibonacci,
            fibonacci.execute.name
        )

        const results = [...fibonacci.execute(5)]
        // console.log('spy', spy.getCalls())

        const expectedCallCount = 6
        assert.strictEqual(spy.callCount, expectedCallCount, "callCount is wrong")

        const { args } = spy.getCall(2)
        const expectedParams = [3, 1, 2]
        assert.deepStrictEqual(args, expectedParams, "params are differents")

        const expectedResults = [0, 1, 1, 2, 3]
        assert.deepStrictEqual(results, expectedResults, "results are differents")
    }
})()