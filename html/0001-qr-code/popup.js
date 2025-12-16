/*
	Please ignore the sloppy code
	Adapted from: <https://github.com/baochip/qr-url-extension>
	LICENSE: <https://septembersend.github.io/html/0001-qr-code/LICENSE>
 */
let domain = "https://septembersend.github.io";
console.log(domain)

let currentTime = new Date();
const timezoneMarker = (currentTime.getTimezoneOffset()/60>0 ? "-": "+")+
		(currentTime.getTimezoneOffset()/60<10 ? "0" : "")+
		(Math.abs(currentTime.getTimezoneOffset()/60))+":00";

function buildQrTime() {
	// .toISOString() returns UTC zero offset time, not local time
	// Solution: subtract local offset from current time, format with .toISOString(), and add timezone marker
	// .slice() removes milliseconds and trailing Z, which indicates UTC zero offset time
	currentTime = new Date();
	let currentTimeOffsetSubtracted = currentTime.getTime() - currentTime.getTimezoneOffset() * 60 * 1000;
	let localCurrentTime = new Date(currentTimeOffsetSubtracted);
	let currentTimeString = localCurrentTime.toISOString().slice(0, -5) + timezoneMarker;
	return currentTimeString;
}

let qrtime = ""
function buildQrContent() {
	return "pwauth://pass/" + domain + "?time=" + qrtime;
}

let qrpwcontent = ""
function renderQr_pw() {
	qrpwcontent = buildQrContent();
	document.getElementById('qrpwcontent').textContent = qrpwcontent;
	new QRious({
		element: document.getElementById('qr'),
		value: qrpwcontent,
		size: 154,
		level: 'M'
	});
}

function renderQr_pwMain() {
	qrtime = buildQrTime();
	renderQr_pw();
}

// Render once immediately so the first QR includes time.
renderQr_pwMain();
// Interval set to 200ms to limit the maximum offset between system time and time displayed
setInterval(renderQr_pwMain, 200);

let input = document.getElementById("domainInput");
function updateInput(e) {
	// console.log(e.value);
	console.log(input.value);
	domain = input.value;
	document.getElementById('domain').textContent = domain;
	renderQr_pw();
}


let qrcontent = "";
function renderQr_totp() {
	new QRious({
		element: document.getElementById('qrTotp'),
		value: qrcontent,
		size: 154,
		level: 'M'
	});
}

let input2 = document.getElementById("totpInput");
function updateInput2(e) {
	// console.log(e.value);
	qrcontent = input2.value;
	renderQr_totp();
	document.getElementById('content').textContent = qrcontent;
}

setInterval(renderQr_totp, 200);
input.value = domain;
input.addEventListener("input", updateInput);
input2.addEventListener("input", updateInput2);

function renderQr_time() {
	new QRious({
		element: document.getElementById('qrTime'),
		value: "time://" + qrtime,
		size: 154,
		level: 'M'
	});
}

setInterval(renderQr_time, 200);

document.getElementById('domain').textContent = domain;
