"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConfigContainer {
    constructor() {
        this.maps = new Map();
    }
    set(options) {
        this.maps.set(options.key.key, options.value);
    }
    get(key) {
        return this.maps.get(key && key.key) || null;
    }
}
exports.ConfigContainer = ConfigContainer;
//# sourceMappingURL=index.js.map