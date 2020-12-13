#!/usr/bin/env node

const mapObjectRecursive = require('map-object-recursive');
const fs = require('fs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv))
    .option('file', {
        alias: 'f',
        description: 'File for searching for replacements in.'
    })
    .argv

const regex = /#(.*?)#/;
const data = require(argv.file);
let output = mapObjectRecursive(data, function (key, value, obj) {
    console.log(value);
    if (regex.test(value)) {
        fs.readFile(value.match(regex)[1], (err, contents) => {
            if (err) throw err;
            return [key, contents.toString()];
        });
    }
    else {
        return [key, value];
    }
}
);

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