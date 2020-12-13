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
console.log("starting: ", file);
const data = require(file);
let output = mapAll(data, function (key, value, obj) { return [key, GetValue(value)]; });

fs.writeFileSync(file, JSON.stringify(output, null, 4) , { flag: 'w+', encoding: "utf8" }
    , function (err, d) { if (err) console.error(err); }
);

console.log("done: ", file);

function GetValue(value) {
    return regex.test(value) ?
        fs.readFileSync(path.join(__dirname, relative, value.match(regex)[1])).toString()
        : value;
}