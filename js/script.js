
window.onscroll = function(){
	stickyNav()
};

var navbar = document.getElementById("navbar");

var sticky = navbar.offsetTop;

function stickyNav(){

	if(window.pageYOffset >= sticky){

		navbar.classList.add("nav-sticky");
	}
	else{

		navbar.classList.remove("nav-sticky");
	}
}

// stopwatch code starts here

let offset = 0,
  paused = true;

render();
  
function startStopwatch(evt) {
  if (paused) {
    paused = false;
    offset -= Date.now();
    render();
  }
}

function stopStopwatch(evt) {
  if (!paused) {
    paused = true;
    offset += Date.now();
  }
}

function resetStopwatch(evt) {
  if (paused) {
    offset = 0;
    render();
  } else {
    offset = -Date.now();
  }
}

function format(value, scale, modulo, padding) {
  value = Math.floor(value / scale) % modulo;
  return value.toString().padStart(padding, 0);
}

function render() {
  var value = paused ? offset : Date.now() + offset;

  document.querySelector('#s_ms').textContent = format(value, 1, 1000, 3);
  document.querySelector('#s_seconds').textContent = format(value, 1000, 60, 2);
  document.querySelector('#s_minutes').textContent = format(value, 60000, 60, 2);
  
  if(!paused) {
    requestAnimationFrame(render);
  }
}

const challengeButton = document.getElementById('challenge-btn');

const statusOn = document.getElementById('o');
const statusGet = document.getElementById('s');
const statusBang = document.getElementById('b');

let state = 0;


challengeButton.addEventListener('click', onClick);

function onYourMarks(){

	challengeButton.disabled = true;
	const audio = document.getElementById('onYourMarks');
	audio.addEventListener('ended', getSet);
	statusOn.classList.add('cur-status');
	audio.play();
}

function getSet(){

	const audio = document.getElementById('getSet');
	statusGet.classList.add('cur-status');
	audio.play();
	audio.addEventListener('ended', go);
}

function go(){
	challengeButton.disabled = false;
	const audio = document.getElementById('go');
	statusBang.classList.add('cur-status');
	audio.play();
	startStopwatch();
}

function removeCurStatus(){

	statusOn.classList.remove('cur-status');
	statusGet.classList.remove('cur-status');
	statusBang.classList.remove('cur-status');

}

function verdict(){

	const ms = document.getElementById('s_ms');
	const s = document.getElementById('s_seconds');
	const m = document.getElementById('s_minutes');
	const vrd = document.getElementById('verdict');

	if(parseInt(ms.innerHTML)<100){

		vrd.innerHTML = `OMG! That was as fast as lightening! Are you human?! Precise Reaction Time : ${ms.innerHTML}`;
	}
	else if(parseInt(ms.innerHTML)<155){

		vrd.innerHTML = `Wow! You are faster than Ussain Bolt! Try Olympics! Precise Reaction Time : ${ms.innerHTML}`;
	}
	else if(parseInt(ms.innerHTML)<300){
		vrd.innerHTML = `Oops! That was close! Bolt passed you on an edge! Practice and you\'ll be in Olympics soon. Precise Reaction Time : ${ms.innerHTML}`;
	}
	else{

		vrd.innerHTML = `Did you even try!? You were really slow! Training is necessary! ${ms.innerHTML}`
	}
}


function onClick(e){

	e.preventDefault();

	switch(state){

		case 0:
			resetStopwatch();
			challengeButton.innerHTML='Go!';
			onYourMarks();
			state=2;
			break;
		case 1:
			removeCurStatus();
			resetStopwatch();
			challengeButton.innerHTML='Go!';
			onYourMarks();
			state=2;
			break;
		case 2:
			stopStopwatch();
			challengeButton.innerHTML='Try Again!';
			verdict();
			state=1;
			break;
	}
}