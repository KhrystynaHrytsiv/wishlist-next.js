import { Request, Response, NextFunction } from 'express';

const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Включаємо дефолтні middleware (включно з CORS)
server.use(middlewares);

// Додатковий middleware, який явно додає CORS заголовки (за потребою)
server.use((req:Request, res:Response, next:NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*'); // дозволити усім джерелам
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

server.use(router);

const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(`JSON Server running on port ${port}`);
});