"use strict";

var b = require('browserify')();

var moduleName = "radio";
moduleName = "karl-component-" + moduleName;

b.add(moduleName + "/index.js");
b.plugin(require('css-modulesify'), {
    rootDir: "f:/modules",
    output: moduleName + '/my.css'
});

b.bundle();

//# sourceMappingURL=test.js.map