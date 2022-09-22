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
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
function resizeImage(imgName, width, height) {
    return __awaiter(this, void 0, void 0, function* () {
        const imgLocation = path_1.default.resolve('./') + `/src/assets/full/${imgName}.jpg`;
        const resizedImageName = `${imgName}_${width}_${height}`;
        const imgResizedLocation = path_1.default.resolve('./') + `/src/assets/thumb/${resizedImageName}.jpg`;
        try {
            yield (0, sharp_1.default)(imgLocation).resize({
                width: width,
                height: height
            })
                .toFile(imgResizedLocation);
        }
        catch (err) {
            throw new Error('could not resize the image');
        }
        return resizedImageName;
    });
}
;
exports.default = resizeImage;
