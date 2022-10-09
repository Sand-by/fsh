import { Server } from 'node-osc';
var port = process.env.PORT||3000;

var x,y;

var oscServer = new Server(port, process.env.HOST||'localhost', () => {
    console.log('OSC Server is listening on '+`${port}`);
    console.log("Everething is ready")
});

// oscServer.on('message', function (msg) {
//   console.log(`Message: ${msg}`);
// //   oscServer.close();
// });
oscServer.on('message', function(msg) {
    if (msg[0] == '#bundle') {
        for (var i=2; i<msg.length; i++) {
            receiveOsc(msg[i][0], msg[i].splice(1));
        }
    } else {
        receiveOsc(msg[0], msg.splice(1));
    }
});
function receiveOsc(address, value) {
	// console.log("received OSC: " + address + ", " + value);

	if (address == '/3/xy') {
		x = value[0];
        console.log(x);
		y = value[1];
	}

  if(address == '/3/toggle1'){
    z = value[0];
    console.log("server down");
    oscServer.close();
  }
}
