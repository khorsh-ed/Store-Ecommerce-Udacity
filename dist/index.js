"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./database"));
const app = (0, express_1.default)();
const port = 3000;
/*
app.use('/api', routes);

app.use((_req: Request, res: Response) => {
  res.status(404).send('<h2>some thing went wrong<h2>');
});
*/
database_1.default.connect().then((client) => {
    return client
        .query('SELECT NOW()')
        .then((res) => {
        client.release();
        console.log(res.rows[0].now);
    })
        .catch((err) => {
        // Make sure to release the client before any error handling,
        // just in case the error handling itself throws an error.
        client.release();
        console.log(err.stack);
    });
});
app.get('/api', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    database_1.default.connect().then((client) => {
        return client
            .query('SELECT NOW()')
            .then((res) => {
            client.release();
            console.log('database connected', res.rows[0].now);
        })
            .catch((err) => {
            // Make sure to release the client before any error handling,
            // just in case the error handling itself throws an error.
            client.release();
            console.log(err.stack);
        });
    });
}));
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
exports.default = app;
