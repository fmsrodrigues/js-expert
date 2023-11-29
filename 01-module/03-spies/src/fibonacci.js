class Fibonacci {
    * execute(input, current = 0, next = 1) {
        if (input === 0) {
            return 0;
        }

        yield current;

        // Delegate the execution to the next iteration, but doesn't return the value
        yield* this.execute(input - 1, next, current + next);
    }
}

module.exports = Fibonacci;