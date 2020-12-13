#!/usr/bin/env node

const iterator = require('object-recursive-iterator');
const fs = require('fs') ;
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

iterator.forAll(data, function (path, key, obj) {
    if (regex.test(obj[key])) {
        fs.readFile(obj[key].match(regex)[1], (err, contents) => { 
            if (err) throw err; 
            obj[key] = contents.toString();
        });
    }
});

fs.writeFileSync(argv.file
    , JSON.stringify(data, null, 1)
    , {
        flag: 'w+',
        encoding: "utf8"
    }
    , function (err, d) {
        if (err) console.log(err);
    }
);