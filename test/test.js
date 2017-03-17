let tcpServer = require("../karl-tcp-server/index");

let fs = require("fs");
fs.readFile("./1.txt", {encoding: "utf-8"}, (err, data) => {
    let matches = data.match(/name:"[^"]+"/g);

    matches = matches.map(d=>{
        return d.replace(/name:"/,"").replace(/"/,"");
    });
    let t1 = matches.map(d=>{
        return `"${d}"`;
    }).join(",");
    fs.writeFileSync("./2.txt",t1);

    let t2 = matches.join("|");
    fs.writeFileSync("./3.txt",t2);
});
