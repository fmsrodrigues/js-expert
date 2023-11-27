const { join } = require("node:path")
const { expect } = require("chai")
const { describe, it, before, beforeEach, afterEach } = require("mocha")
const sinon = require("sinon")

const CarService = require("../../src/service/carService")

const carsDatabase = join(__dirname, "..", "..", "database", "cars.json")

const mocks = {
    validCarCategory: require("../mocks/carCategory.valid.json"),
    validCar: require("../mocks/car.valid.json"),
    validCustomer: require("../mocks/customer.valid.json")
}

describe("CarService Suite Tests", () => {
    let carService = {}
    let sandbox = {}

    before(() => {
        carService = new CarService({
            cars: carsDatabase
        })
    })

    beforeEach(() => {
        sandbox = sinon.createSandbox()
    })

    afterEach(() => {
        sandbox.restore()
    })

    it("Should retrieve a random position from an array", () => {
        const data = [0, 1, 2, 3, 4]
        const result = carService.getRandomPositionFromArray(data)

        expect(result).to.be.lte(data.length).and.be.gte(0)
    })

    it("Should choose the first id from carIds in carCategory", () => {
        const carCategory = mocks.validCarCategory
        const carIdIndex = 0

        sandbox.stub(
            carService,
            carService.getRandomPositionFromArray.name
        ).returns(carIdIndex)

        const result = carService.chooseRandomCar(carCategory)
        const expected = carCategory.carIds[carIdIndex]

        expect(result).to.be.equal(expected)
        expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok
    })

    it("Given a carCategory it should return an available car", async () => {
        const car = mocks.validCar
        const carCategory = Object.create(mocks.validCarCategory)
        carCategory.carIds = [car.id]

        sandbox.stub(
            carService.carsRepository,
            carService.carsRepository.find.name
        ).resolves(car)

        sandbox.spy(
            carService,
            carService.chooseRandomCar.name
        )

        const result = await carService.getAvailableCar(carCategory)
        const expected = car

        expect(carService.chooseRandomCar.calledOnce).to.be.ok
        expect(carService.carsRepository.find.calledWithExactly(car.id)).to.be.ok
        expect(result).to.be.deep.equal(expected)
    })
})