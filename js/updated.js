async function getGithubStatus() {
	const url = "https://api.github.com/repos/septembersend/septembersend.github.io/events";
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const result = await response.json();
		const report = document.querySelector("#build-status");
		report.setAttribute("style", "text-align: right;");

		var currentdate = new Date();
		var datetime = "Current Time: " + currentdate.getFullYear() + "/"
			+ (currentdate.getMonth()+1)  + "/"
			+ currentdate.getDate() + " @ "
			+ currentdate.getHours() + ":"
			+ currentdate.getMinutes() + ":"
			+ currentdate.getSeconds();
		report.appendChild(document.createTextNode(datetime));

		const details = document.createElement("details");
		const summary = document.createElement("summary");
		summary.appendChild(document.createTextNode("I was last updated last on "
			+ result[0]['created_at']));
		details.appendChild(summary);

		details.appendChild(document.createTextNode("Time recorded as UTC."));
		details.appendChild(document.createElement("br"));
		details.appendChild(document.createTextNode("Was also updated at: "));
		details.appendChild(document.createElement("br"));
		const length = result.length;
		let go = length;
		if (length > 10) {
			go = 11;
		}
		for (let i = 1; i < go; i++) {
			details.appendChild(document.createTextNode(result[i]['created_at']));
			details.appendChild(document.createElement("br"))
		}
		if (go < length) {
			details.appendChild(document.createElement("br"))
			details.appendChild(document.createTextNode("There are "
				+ String(length-go) + " more updates"));
		}

		report.appendChild(details);
	} catch (error) {
		console.error(error.message);
	}
}

