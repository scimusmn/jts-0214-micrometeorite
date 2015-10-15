/**
 * Resolume OSC Communication
 */
var dgram;
var osc;
var udp;
osc = require('osc-min');
dgram = require('dgram');
udp = dgram.createSocket('udp4');
var portOsc = 7770;

initResolume();

/**
* Set up resolume default state
*/
function initResolume() {
  toOSC('/layer1/clip1/connect', 1);
};

function toOSC(oscAddress, val) {

  // TODO write this out more
  if (val != 0 && !val) val = 'NA';

  var buf = osc.toBuffer({
    address: oscAddress,
    args: [val],
  });

  return udp.send(buf, 0, buf.length, portOsc, 'localhost');

}

var keypress = require('keypress');

// Make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

/**
 * Listen for keypresses
 */
process.stdin.on('keypress', function(ch, key) {
  console.log('got "keypress"', key);
  if (key && key.ctrl && key.name == 'c') {
    process.exit();
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();
