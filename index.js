#!/usr/bin/env node

const iterator = require('object-recursive-iterator');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv))
    .option('file', {
        alias: 'f',
        description: 'File for searching for replacements in.'
    })
    .argv

const data = require(argv.file);
console.log(data);
iterator.forAll(data, function (path, key, obj) {
    console.log('----------');
    console.log('path: ', path);
    console.log('key: ', key);
    if (key.startsWith("@@escolar")) {
        console.log('value before processing: ', obj[key]);
        obj[key] += '_processed';   // update value
        console.log('value after processing: ', obj[key]);
        console.log('----------');
    }
});