const assert = require("node:assert");
const { describe, it, after, before } = require("mocha");
const supertest = require("supertest");



describe("API Suite test", () => {
    let app

    before((done) => {
        app = require("./api");
        app.once("listening", done);
    })

    after((done) => {
        app.close(done);
    })

    describe("/contact:get", () => {
        it("Should request the contact page and return HTTP Status 200", async () => {
            const response = await supertest(app)
                .get("/contact")
                .expect(200);

            assert.strictEqual(response.text, "contact us page");
        })
    })

    describe("/login:post", () => {
        it("Should login and return HTTP Status 200", async () => {
            const response = await supertest(app)
                .post("/login")
                .send({
                    username: "Pikachu",
                    password: "pika"
                })
                .expect(200);

            assert.strictEqual(response.text, "Login has succeeded");
        })

        it("Should not login and return HTTP Status 401", async () => {
            const response = await supertest(app)
                .post("/login")
                .send({
                    username: "Gyrados",
                    password: "IDontKnowAnyGyradosFrases"
                })
                .expect(401);

            assert.ok(response.unauthorized)
            assert.strictEqual(response.text, "Invalid login");
        })
    })

    describe("hi:get - 404", () => {
        it("Should request an unknown page and return HTTP Status 404", async () => {
            const response = await supertest(app)
                .get("/unknown")
                .expect(404);

            assert.strictEqual(response.text, "Route not found");
        })
    })

})