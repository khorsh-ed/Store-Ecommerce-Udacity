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
const filehelper_1 = __importDefault(require("../filehelper"));
function isNumber(value) {
    return (!isNaN(Number(value)) && (Number(value) >= 1 && Number(value) <= 999));
}
const validator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const imageName = req.query.name;
    const imageWidth = req.query.width;
    const imageHeight = req.query.height;
    const filenames = yield (0, filehelper_1.default)(false);
    const thumbFileNames = yield (0, filehelper_1.default)(true);
    // Check if the name width & height are included
    if (imageName === undefined || imageWidth === undefined || imageHeight === undefined) {
        return res
            .status(400)
            .send('<h2> Bad request , Please check that name, width and height are included <h2>');
    }
    // Check if the nwidth and height correct number between 1 & 999
    if (!isNumber(imageWidth) || !isNumber(imageHeight)) {
        return res
            .status(400)
            .send('<h2 >Bad request , Please check that height and width between 1 & 999 <h2>');
    }
    // Check if the filename not existed
    if (filenames.includes(imageName) === false) {
        return res
            .status(404)
            .send('<h2 > File Name Not Found <h2>');
    }
    next();
});
exports.default = validator;
