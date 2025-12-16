// === Avatar === //
function replaceavatar() {
	const a = document.getElementById("avatar");
	a.src="./img/profile.gif";
	<!-- https://thewebdev.info/2022/03/26/how-to-reset-a-gif-animation-with-javascript-2/ -->
	<!-- http://superuser.com/questions/1607099/ddg#1607134 -->
	a.src = `${a.src.replace(/\?.*$/,"")}?x=${Math.random()}`
}
function normalavatar() {
	document.getElementById("avatar").src="./img/profile.jpg";
}

// === Statistics === //
(() => {
	children = document.querySelectorAll(".post > a");

	dates = []
	for (i=children.length-1; i>0; i--) {
		str = children[i].href.replace(/^.*[\\/]/, '').replace(/--.\.pdf$/, '')
		var [yy, dd] = str.split("-").map(Number)
		yy += 2000
		var d = new Date(Date.UTC(yy, 0, 1))
		d.setUTCDate(d.getUTCDate() + (dd - 1))
		dates.push(d)
	}

	diff = []
	for (i=1; i<dates.length; i++) {
		diff.push(Math.round((dates[i] - dates[i-1]) / (1000 * 60 * 60 * 24)));
	}
	mean = null
	longest = 0
	shortest = 100000000
	for (i=0; i<diff.length; i++) {
		mean += diff[i]
		if (diff[i] > longest) {
			longest = diff[i]
		}
		if (diff[i] < shortest) {
			shortest = diff[i]
		}
	}
	mean = mean / diff.length

	stat = document.querySelectorAll(".stats .stat")
	stat[0].innerText = dates.length
	stat[1].innerText = Math.trunc((mean * 100))/100
	stat[2].innerText = longest
	stat[3].innerText = shortest
})();

// === Sparkline === //
(() => {
	const sparklines = document.querySelectorAll('[data-sparkline="true"]');
	if (!sparklines) return; // Just stop and exit if nothing found.

	sparklines.forEach(sparkline => {
		switch (sparkline.dataset.points) {
			case 'one': {
				sparkline.dataset.points = ""
				sparkline.dataset.points += String(diff[0])
				for (i=1; i<diff.length; i++) {
					sparkline.dataset.points += "," + String(diff[i])
				}
				sparkline.dataset.colors = "#a3b49e"
				sparkline.dataset.gap = 25
				break;
			}
			default: {
				console.error(`invalid points`);
				return;
			}
		}
		initSparkline(sparkline);
	});
})();
