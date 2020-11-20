function playSound(sound){
	var audio = new Audio('sounds/'+sound+'.mp3'); // path to file
	audio.play();	
};

function toBuzzerNumber(nb){
	return parseInt(String.fromCharCode(nb));
};
function notify(ctx, message, type){
	switch(type){
		case 'error':
			ctx.$message.error(message);
		break;
		default:
			ctx.$message({
				message: message,
				type: type
			});
		break;
	}
};
