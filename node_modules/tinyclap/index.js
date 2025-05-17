/**
 * tinyclap - a tiny command line arguments parser for Node.js
 *
 * index.js - main file
 *
 * @author Alexandre Bintz <alexandre.bintz@gmail.com>
 * feb. 2015
 */

"use strict";

/**
 * clap object
 * {
 *   node : {string} path to node executable,
 *   file : {string} path to executed js file,
 *   cmd  : {string} command,
 *   argv : {object} list of name;value pairs,
 *   argn : {array}  list of argument names in the order they appeared
 * }
 */
var clap = {};

/**
 * parse process.argv
 *
 * @return clap object
 */
function parse() {

  var argv = process.argv.concat([]); // copy array so we can be destructive

  clap.node = argv.shift();
  clap.file = argv.shift();

  readArgs(argv);

  return clap;
}

/**
 * parse individual argument
 *
 * @param {string} arg - raw argument, e.g. "foo" or "-f" or "--foo" or "--foo=bar" or even "--foo-bar=stuff"
 *
 * @return {object} { dashes: {number}  number of initial dashes
 *                    label : {string}  argument without the dashes
 *                    isopt : {boolean} true if starts with one or more dashes
 *                  }
 */
function readArg(arg) {

  if(typeof arg == 'undefined') {
    return undefined;
  }

  var split = arg.split('-');

  for(var dashes = 0; split[0].length == 0; dashes++) {
    split.shift();
  }

  return {
    label : split.join('-'),
    dashes: dashes,
    isopt : dashes > 0
  };
}

function readArgs(args) {

  args = args.map(readArg);

  clap.argv = {};
  clap.argn = [];

  var arg;
  for(var i=0; arg = args.shift(); i++) {

    if(arg.isopt) {

      var name  = undefined;
      var value = undefined;

      var argvaluesplit = arg.label.split('=');
      name = argvaluesplit[0];

      if(argvaluesplit.length > 1) {

        value = argvaluesplit[1];
        clap.argv[name] = value;
        clap.argn.push(name);

      } else {

        if(arg.dashes == 1 && arg.label.length > 1) {

          var n = Number(arg.label.substr(1));

          if(isNaN(n)) {

            for(var i=0, l=arg.label.length ; i<l ; i++) {

              name  = arg.label[i];
              value = true;
              clap.argv[name] = value;
              clap.argn.push(name);
            }

          } else {

            name  = arg.label.substr(0, 1);
            value = n;
            clap.argv[name] = value;
            clap.argn.push(name);
          }

        } else {

          value = true;

          if(args.length > 0 && !args[0].isopt) {
            value = args.shift().label;
          }
          clap.argv[name] = value;
          clap.argn.push(name);
        }
      }

    } else {

      if(i == 0) {
        clap.cmd = arg.label;
      } else {
        clap.argn.push(arg.label);
      }
    }
  }

  return clap;
}


module.exports = parse;
