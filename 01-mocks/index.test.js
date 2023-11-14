const assert = require("node:assert");

const { error } = require("./src/constants");
const File = require("./src/file");

//IFEE
; (async () => {
    {
        const filePath = "./mocks/emptyFile.invalid.csv"
        const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)

        await assert.rejects(result, expected)
    }

    {
        const filePath = "./mocks/header.invalid.csv"
        const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)

        await assert.rejects(result, expected)
    }

    {
        const filePath = "./mocks/fiveItems.invalid.csv"
        const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)

        await assert.rejects(result, expected)
    }

    {
        const filePath = "./mocks/threeItems.valid.csv"
        const expected = [
            {
                id: 1,
                name: "Goodra",
                profession: "developer",
                age: 120
            },
            {
                id: 2,
                name: "Wallord",
                profession: "manager",
                age: 30
            },
            {
                id: 3,
                name: "Cinccino",
                profession: "QA",
                age: 25
            },
        ]
        const result = await File.csvToJson(filePath)

        assert.deepEqual(result, expected)
    }
})()