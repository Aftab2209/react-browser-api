"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocalStorage = exports.useClipboard = exports.useGeolocation = void 0;
var useGeolocation_1 = require("./hooks/useGeolocation");
Object.defineProperty(exports, "useGeolocation", { enumerable: true, get: function () { return useGeolocation_1.useGeolocation; } });
var useClipboard_1 = require("./hooks/useClipboard");
Object.defineProperty(exports, "useClipboard", { enumerable: true, get: function () { return useClipboard_1.useClipboard; } });
var useLocalStorage_1 = require("./hooks/useLocalStorage");
Object.defineProperty(exports, "useLocalStorage", { enumerable: true, get: function () { return useLocalStorage_1.useLocalStorage; } });
// export {useSessionStorage} from './hooks/useSessionStorage'
