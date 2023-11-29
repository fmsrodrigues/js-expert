const { join } = require("node:path");
const { writeFile } = require("node:fs/promises");
const { fakerEN: faker } = require("@faker-js/faker");

const CarCategory = require("../src/entities/carCategory");
const Car = require("../src/entities/car");
const Customer = require("../src/entities/customer");

const seederBaseFolder = join(__dirname, "../", "database");
const ITEMS_AMOUNT = 2;

const carCategory = new CarCategory({
    id: faker.string.uuid(),
    name: faker.vehicle.type(),
    carIds: [],
    price: faker.finance.amount(20, 100)
})

const cars = [];
const customers = [];
for (let i = 0; i < ITEMS_AMOUNT; i++) {
    const car = new Car({
        id: faker.string.uuid(),
        name: faker.vehicle.model(),
        available: true,
        gasAvailable: true,
        releaseYear: faker.date.past().getFullYear()
    })

    carCategory.carIds.push(car.id);
    cars.push(car);

    const customer = new Customer({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        age: new Date().getFullYear() - faker.date.birthdate({
            mode: "age",
            min: 18,
            max: 50
        }).getFullYear()
    })
    customers.push(customer);
}

const write = (filename, data) => writeFile(join(seederBaseFolder, filename), JSON.stringify(data));

; (async () => {
    await write("cars.json", cars);
    await write("carCategories.json", [carCategory]);
    await write("customers.json", customers);

    console.log("cars", cars);
    console.log("carCategory", carCategory);
    console.log("customers", customers);
})();