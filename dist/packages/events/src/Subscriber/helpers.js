"use strict";
exports.__esModule = true;
exports.sortHandlers = exports.createLookupTable = exports.validateOptions = void 0;
var validateOptions = function (options) {
    var handlers = options.handlers, initialization = options.initialization;
    if (!initialization) {
        var message = "The initialization property specified in your " +
            "reporter config must be a function. The current value is " +
            (initialization + ".");
        throw new Error(message);
    }
    if (!handlers) {
        var message = "You must provide a handlers property in your reporter " +
            "config. Please ensure that the handlers property " +
            " exists and is in the following form:\n " +
            "  handlers: {\n" +
            "    <handlerName1>: [\n" +
            "       handler1,\n" +
            "       handler2,\n" +
            "       ...\n" +
            "     ],\n" +
            "     <handlerName2>: [\n" +
            "       ...\n" +
            ("Currently the handlers property is " + handlers + ".");
        throw new Error(message);
    }
};
exports.validateOptions = validateOptions;
var globMatchRegEx = /(?:[^\\]|[^\\](?:\\\\)+)(\*\*|\*)/g;
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var convertHandlerNameToRegex = function (name) {
    var match;
    var start = 0;
    var str = "";
    name = " " + name;
    while ((match = globMatchRegEx.exec(name)) !== null) {
        var star = match[1];
        var starRegex = star === "*" ? "[^:]+" : "(?:[^:]+(?::[^:]+)*)?";
        var matchLength = match[0].length;
        var end = match.index + matchLength - star.length;
        var unmatched = name.substring(start, end);
        var cleanString = unmatched.replace(reRegExpChar, "\\$&");
        start += match.index + matchLength;
        str += cleanString + starRegex;
    }
    str += name.substr(start).replace(reRegExpChar, "\\$&");
    return new RegExp("^" + str.substr(1) + "$", "i");
};
var createLookupTable = function (handlerNames) {
    return handlerNames.reduce(function (lookupTable, handlerName) {
        var regex = convertHandlerNameToRegex(handlerName);
        lookupTable[handlerName] = regex;
        return lookupTable;
    }, {});
};
exports.createLookupTable = createLookupTable;
var sortHandlers = function (handlers) {
    var globbedHandlers = {};
    var nonGlobbedHandlers = {};
    for (var handlerName in handlers) {
        if (globMatchRegEx.test(handlerName)) {
            globbedHandlers[handlerName] = handlers[handlerName];
        }
        else {
            nonGlobbedHandlers[handlerName] = handlers[handlerName];
        }
    }
    return { nonGlobbedHandlers: nonGlobbedHandlers, globbedHandlers: globbedHandlers };
};
exports.sortHandlers = sortHandlers;
//# sourceMappingURL=helpers.js.map