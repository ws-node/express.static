"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const source_1 = require("./source");
class HttpResponse {
    constructor(_response) {
        this._response = _response;
        this._headers = {
            get data() { return Object.assign({}, _response.getHeaders()); },
            get: (key, type) => source_1.convertTo(this._headers.data[key] || null, type),
            set: (key, value) => this._response.setHeader(key, value)
        };
        this._locals = {
            get data() { return _response.locals || (_response.locals = {}); },
            get: (key, type) => source_1.convertTo(this._locals.data[key] || null, type),
            set: (key, value) => {
                if (key === "__context")
                    throw new Error("locals rewrite error : can't rewrite the reference of controller context.");
                this._locals.data[key] = value;
            }
        };
    }
    /** represent the express rep. */
    get source() { return this._response; }
    get headers() { return this._headers; }
    get locals() { return this._locals; }
}
exports.HttpResponse = HttpResponse;
//# sourceMappingURL=response.js.map