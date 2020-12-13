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

    const regex = /<(.*?)>/;
const data = require(argv.file);

iterator.forAll(data, function (path, key, obj) {
    if (regex.test(obj[key])) {
        let file = obj[key].match(regex)[1];
        console.log('file name: ', file);

        console.log('value before processing: ', obj[key]);
        fs.readFile(file, (err, data) => { 
            if (err) throw err; 
            obj[key] = data.toString();
            console.log('value after processing: ', obj[key]);
        }) 

        console.log('----------');
    }
});

fs.writeFile(argv.file, data);