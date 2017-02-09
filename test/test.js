"use strict";

var excel = require("../karl-excel/index");
var value = [{
    sheetName: "1",
    data: [["a", 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, "b"], [4, 5, 6], [8, 9, 10]]
}, {
    sheetName: "2",
    data: [["a", 2, 3], ["b", 5, 6, 7], ["2016-01-1", 9, 10, 11]]
}];
// let data = excel.read("./12.xlsx", value);
excel.write("./12.xlsx", value);

var fs = require("fs");
var text = fs.readFileSync("./module_type.txt", "utf-8");
var arr = text.replace(/\r\n/g, "\n").split("\n");
arr = arr.map(function (d) {
    var arr1 = d.split(",");
    var id = arr1.filter(function (d1, i) {
        return i != arr1.length - 1;
    }).join("-");
    var json = { id: id, name: arr1[arr1.length - 1] };
    // return JSON.stringify(json);
    return json.name;
});

fs.writeFileSync("./1.txt", arr.join("|"));
