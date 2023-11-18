const http = require("node:http");
const { once } = require("node:events");

const DEFAULT_USER = {
    username: "Pikachu",
    password: "pika"
}

const routes = {
    "/contact:get": (req, res) => {
        res.write('contact us page')
        return res.end();
    },

    "/login:post": async (req, res) => {
        const data = JSON.parse(await once(req, "data"));
        const toLower = (text) => text.toLowerCase();

        if (
            toLower(data.username) !== toLower(DEFAULT_USER.username) ||
            data.password !== DEFAULT_USER.password
        ) {
            res.writeHead(401);
            return res.end("Invalid login");
        }

        return res.end("Login has succeeded");
    },

    default(req, res) {
        res.writeHead(404)
        return res.end("Route not found")
    }
}

function handler(req, res) {
    const { url, method } = req;

    const routeKey = `${url}:${method.toLowerCase()}`;
    const chosen = routes[routeKey] || routes.default;

    return chosen(req, res);
}

const app = http.createServer(handler).listen(3000, () => {
    console.log("Server is running on port 3000");
})

module.exports = app;