"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imgprocessing_1 = __importDefault(require("../../utility/middleware/imgprocessing"));
const validator_1 = __importDefault(require("../../utility/middleware/validator"));
const path_1 = __importDefault(require("path"));
const images = express_1.default.Router();
images.get('/', [validator_1.default, imgprocessing_1.default], (req, res) => {
    const imageName = req.query.name;
    const imageWidth = req.query.width;
    const imageHeight = req.query.height;
    const imgResizedLocation = path_1.default.resolve('./') +
        `/src/assets/thumb/${imageName}_${imageWidth}_${imageHeight}.jpg`;
    return res.sendFile(imgResizedLocation);
});
exports.default = images;
