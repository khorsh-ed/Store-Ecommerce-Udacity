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
const filehelper_1 = __importDefault(require("./filehelper"));
const resize_1 = __importDefault(require("./resize"));
function isNumber(value) {
    return (!isNaN(Number(value)) && (Number(value) >= 1 && Number(value) <= 999));
}
const imageProcessing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const imageName = req.query.name;
    const imageWidth = req.query.width;
    const imageHeight = req.query.height;
    const thumbFileNames = yield (0, filehelper_1.default)(true);
    // handling cashing check if it is already included in cashed folder
    if (thumbFileNames.includes(`${imageName}_${imageWidth}_${imageHeight}`)) {
        next();
    }
    // resizing the image 
    yield (0, resize_1.default)(imageName, +imageWidth, +imageHeight);
    next();
});
exports.default = imageProcessing;
