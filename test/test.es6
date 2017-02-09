let excel = require("../karl-excel/index");
let value = [
    {
        sheetName: "1",
        data: [
            ["a", 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, "b"],
            [4, 5, 6],
            [8, 9, 10]
        ]
    },
    {
        sheetName: "2",
        data: [
            ["a", 2, 3],
            ["b", 5, 6, 7],
            ["2016-01-1", 9, 10, 11]
        ]
    },
];
// let data = excel.read("./12.xlsx", value);
excel.write("./12.xlsx", value);

let fs = require("fs");
let text = fs.readFileSync("./module_type.txt", "utf-8");
let arr = text.replace(/\r\n/g, "\n").split("\n");
arr = arr.map(d=> {
    let arr1 = d.split(",");
    let id = arr1.filter((d1, i)=> {
        return i != arr1.length - 1;
    }).join("-");
    let json = {id: id, name: arr1[arr1.length - 1]};
    // return JSON.stringify(json);
    return json.name;
});

fs.writeFileSync("./1.txt", arr.join("|"));