"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const url_1 = __importDefault(require("url"));
const electron_1 = require("electron");
function load(loadPath) {
    const os_type = os_1.default.type();
    return _loadFromHref(document.location.href, loadPath, os_type);
}
exports.load = load;
function _loadFromHref(href, loadPath, os_type) {
    let resolvedPath = _resolveFromHref(href, loadPath, os_type);
    require(resolvedPath);
}
exports._loadFromHref = _loadFromHref;
function _toPath(href, loadPath, os_type) {
    if (href.startsWith('file:')) {
        return _toPathFromFile(href, os_type);
    }
    if (href.startsWith('http:') || href.startsWith('https:')) {
        return _toPathFromApp(href, loadPath, os_type);
    }
    throw new Error("Unable to load from href: " + href);
}
exports._toPath = _toPath;
function _toPathFromApp(href, loadPath, os_type) {
    return electron_1.app.getAppPath() + loadPath;
}
exports._toPathFromApp = _toPathFromApp;
function _toPathFromFile(href, os_type) {
    let result = href;
    result = result.replace('file://', '');
    if (os_type === 'Windows_NT') {
        result = result.substring(1);
        result = result.replace(/^(.+)\|/, '$1:');
        result = result.replace(/\//g, '\\');
    }
    result = result.replace(/[^/.]+\.html([#?].*)?$/, '');
    result = decodeURI(result);
    return result;
}
exports._toPathFromFile = _toPathFromFile;
function _resolveURL(from, to) {
    return url_1.default.resolve(from, to);
}
exports._resolveURL = _resolveURL;
function _resolveFromHref(href, loadPath, os_type) {
    let resolvedURL = _resolveURL(href, loadPath);
    let resolvedPath = _toPath(resolvedURL, loadPath, os_type);
    if (!fs_1.default.existsSync(resolvedPath)) {
        throw new Error(`Could not find ${loadPath} (not found): ${resolvedPath}`);
    }
    return resolvedPath;
}
exports._resolveFromHref = _resolveFromHref;
//# sourceMappingURL=index.js.map