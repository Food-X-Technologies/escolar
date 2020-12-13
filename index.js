#!/usr/bin/env node

const mapAll = require('map-object-recursive');
const fs = require('fs');
const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { string } = require('yargs');
const argv = yargs(hideBin(process.argv))
    .option('file', {
        alias: 'f',
        description: 'File for searching for replacements in.'
    })
    .argv

const relative = '../../..';
const regex = /#(.*?)#/;
var file = path.join(__dirname, relative, argv.file);
console.log("processing: ", file);
const data = require(file);
let output = mapAll(data, function (key, value, obj) { return [key, GetValue(value)]; });

fs.writeFileSync(file
    , JSON.stringify(output, null, 1)
    , {
        flag: 'w+',
        encoding: "utf8"
    }
    , function (err, d) {
        if (err) console.log(err);
    }
);

function GetValue(value) {
    if (regex.test(value)) {
        let f = path.join(__dirname, relative, value.match(regex)[1]);
        return fs.readFileSync(f).toString();
    } else return value;
}