function playSound(sound){
	var audio = new Audio('sounds/'+sound+'.mp3'); // path to file
	audio.play();	
};

function toBuzzerNumber(nb){
	return parseInt(String.fromCharCode(nb));
};
function notify(ctx, message, type){
	ctx.$notify({
		message: message,
		type: type,
		position: 'bottom-right',
		duration:2000
	});
};