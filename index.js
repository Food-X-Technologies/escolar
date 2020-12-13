#!/usr/bin/env node

const mapAll = require('map-object-recursive');
const fs = require('fs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { string } = require('yargs');
const argv = yargs(hideBin(process.argv))
    .option('file', {
        alias: 'f',
        description: 'File for searching for replacements in.'
    })
    .argv

const regex = /#(.*?)#/;
console.log("processing: ", argv.file)
const data = require(argv.file);
let output = mapAll(data, function (key, value, obj) { return [key, GetValue(value)]; });

fs.writeFileSync(argv.file
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
    return regex.test(value) ? fs.readFileSync(value.match(regex)[1]).toString() : value;
}