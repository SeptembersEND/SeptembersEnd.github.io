var gurl = "https://coadaprsxofqkwxqjqor.supabase.co/rest/v1/Messages";
const gkey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvYWRhcHJzeG9mcWt3eHFqcW9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0MTIwOTUsImV4cCI6MjA3ODk4ODA5NX0.dtGwWbjU_WDp3FmczkzlsDzWn6btriiYWWRvGfBVXjk";

const publicKeyArmored = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP.js v4.10.10
Comment: https://openpgpjs.org

xsBNBGkXfoYBCADVJRDcm0dtKbhy5dbg090j4KIda2Sh050jpmIklQ+Jnb/o
YvTfYE8JBGOa1055Qo09lQy2oR5EqxEvIVwKK5GMFzEXAwA8zQ8XvkndAO+S
FkSc6D94MRuW52K9ArcTShYQTzeBOX8JsOUCetX8C+8lPTpS8UphK6XI8+ds
S/D8fO0R94AbooUCTn8VNecIbGEViKAPEZQBTtsIDLKem87NDRyVw4lD0qEE
ge0yVjd+c9QODuMDxdNJNmEepSOBQE9fU18lUOVRSLlSK+nvSuvDfeBleovG
xMkeVb7WeekLyXCqQJ3t8d1WpdhghpJmqc7dlXUa3HGUWLaI/WccyyfbABEB
AAHNFFRlc3QgPHRlc3RAdGVzdC5jb20+wsCNBBABCAAgBQJpF36GBgsJBwgD
AgQVCAoCBBYCAQACGQECGwMCHgEAIQkQYsVZ5aSWatcWIQSKM9lBRt2aj4RC
B6dixVnlpJZq1xCsCADP8LH3HGe/KWpXQzKp8Xn5onzgzvXg9zfRDUj5ZnDQ
JkE/CxWHBNqx9ZKyaq+wxH1+ncogVoMBXqAeOEyurbSfqZgQ6IC3MXMJLaxZ
SlydvdWRfxnQ+SiNSo5O5wbt3ucig1tfrIsGgcRISyVh01vP9rjYJjRfWzb8
vdkQlDkJ62vofG7bQQX/PEGCcRxufgwhTrVWxqvR1ccaONP8sVy2eqXfr3sK
J3BdSNYYPCzjCQy/jfmf3E5iwGow/YPi7GFRcVv97VVpUigsi360dbbNofBw
8dMKKw2WttFKkFizNx7LP3/DtlZquszAZUAKGbUEZ6jLSoZ2OxSoHUutlUxb
zsBNBGkXfoYBCADgk89EHZ864aAoFK5eYImr44kxG7DJ+JHPBs7z8OMbgGFT
HzhX8wRJvVgTngWHsQnE4OGdU2jEbDNSMAHk3p3H1KTlSULefE9b2MbqOqLE
4gSSoTWkWU4Kj6TqySbyb7+P73Hhkp/aQP5AeJG/jlarx9PlKLzpGHAytUtk
IV8pa7QbHppuf6PGYnIdw6WgoKUgmUoEjuI8yPykbDWl+y6kho7Fib2Cx6Yh
CKK9YLCKRw8rl7X0jSVXNL6nzT9QQyxdiUDcz9JnuzPNvzphvtfxjYBJygVB
kzm60upzX2jotySPwvGgF/Vp5+/H9zQ+Zm1oEocAinlfIYVdB8DEJVq5ABEB
AAHCwHYEGAEIAAkFAmkXfoYCGwwAIQkQYsVZ5aSWatcWIQSKM9lBRt2aj4RC
B6dixVnlpJZq1zgoCACD9P9RDGHPudXRC0P7wyOtpYdfHRxiW/k78nDyKz/7
qfvhR3JZiTMpFBRU2svG059oKdnbRALMUzVVa0BWFnmykvW/kBrRJKNmKR//
C9+E8CtKXUKVUHrJKcQglSc6weHX8ZnF09Bf7efwpY9ECKc8eExUG04KrXT5
h9PebwUTnm5bqVnnTY495zXMH9zi4CzMToOyZbKNWMO2fqKIOf5S5bmXmDfD
467+rMlLKuLpVshNSLllca0C8HZhaQNb+HpG+YDgLxaHp9i3KqPoc8K+KCmz
8lu0lKX5+mcdafZM+JWzG5SUPUXC4HGOqaYJROdCghc7N3fN0LmRQhAE3bOt
=Ud0v
-----END PGP PUBLIC KEY BLOCK-----`;

function decrypt(alice, data) {
	var ring = new kbpgp.keyring.KeyRing();
	ring.add_key_manager(alice);
	kbpgp.unbox({ keyfetch: ring, armored: data }, function (err, literals) {
		if (err != null) {
			return console.log("Problem: " + err);
		} else {
			console.log("Decrypted Message: '" + literals[0].toString() + "'");

			var ds = km = null;
			ds = literals[0].get_data_signer();
			if (ds) { km = ds.get_key_manager(); }
			if (km) {
				console.log("Signed by PGP fingerprint");
				console.log(km.get_pgp_fingerprint().toString('hex'));
			}
		}
	});
}
var encryptString = "";
function encrypt(alice, data) {
	var params = {
		msg: data,
		encrypt_for: alice
	};

	kbpgp.box(params, function (err, result_string, result_buffer) {
		encryptString = result_string;
	});

	return encryptString;
}
function run(alice) {
	//get_products();

	var params = {
		msg: "nope",
		encrypt_for: alice
	};
	kbpgp.box(params, function(err, result_string, result_buffer) {
		console.log(err, result_buffer);
		console.log(result_string);

		decrypt(alice, result_string);
		//decrypt(alice, result[0]['created_at']);
	})
}

var gerrors = false;
var main_key;
function getKeys() {
	kbpgp.KeyManager.import_from_armored_pgp({
		armored: publicKeyArmored
	}, function (err, alice) {
		if (err) {
			alert("Failed to load public key!");
			gerrors = true;
			return;
		}
		main_key = alice;
	});
}





function createEntry(headNode, i, x, result) {
	const docText = document.createTextNode(result[i]['msg']);
	const docWrap = document.createElement("pre");
	docWrap.setAttribute("style", "max-height: 10em; overflow: auto; overflow-x: hidden;");
	docWrap.appendChild(docText);

	const numText = document.createTextNode(String(x+1) + ":" + String(result[i]['id']));
	const numWrap = document.createElement("pre");
	numWrap.setAttribute("id", "msg-id-num")

	numWrap.appendChild(numText);

	const divWrap = document.createElement("div");
	divWrap.appendChild(numWrap);
	divWrap.appendChild(docWrap);
	divWrap.setAttribute("id", "msg-id-wrap");
	docWrap.setAttribute("id", "msg-id-wrap");
	headNode.appendChild(divWrap);
}
function doTicker(result, i) {
	document.getElementById("ticker").appendChild(document.createTextNode(result[i]['msg']));
	var msg = (parseInt(result[i]['msg']) + 1).toString();;
	if (msg == "NaN") {
		msg = "1";
	}
	try {
		const url = gurl + "?id=eq.-1";
		const response = fetch(url, {
			method: "PATCH",
			body: JSON.stringify({
				id: -1,
				msg: msg,
			}),
			headers: {
				"apikey": gkey,
				"Auhorization": "Bearer " + gkey,
				"Content-Type": "application/json",
			},
		});

		console.log(response);
	} catch (error) {
		console.error("Unable to send update ticker: ", error.message);
	}
}
// TODO: check for -1
largestMsgID=-2;
var data;
function initialPrintData(result) {
	data = result;
	const msgID = document.querySelector("#msg-id-color");

	let x=0;
	let length=result.length;
	let i=length-1;
	let stop = 0;
	//if (i >= 20) {
	//	stop = i-19;
	//}
	largestMsgID = result[i]['id'];
	if (largestMsgID == -1) {
		doTicker(result, i)
		i = i-1;
		largestMsgID = result[i]['id'];
	}


	if (largestMsgID <= 0) {
		const msg = document.createElement("pre");
		const msgText = document.createTextNode("No Mail in Mailbox");
		msg.setAttribute("style", "color: blueviolet; width: 25em;");
		msg.appendChild(msgText);
		msgID.appendChild(msg);
		return;
	} else {
		const mailBox = document.createElement("pre");
		{
			mailBox.appendChild(document.createTextNode("There are "));
			const msgNumClr = document.createElement("a");
			{
				const msgNumText = document.createTextNode(length);
				msgNumClr.setAttribute("style", "color: blueviolet");
				msgNumClr.appendChild(msgNumText);
			}
			mailBox.appendChild(msgNumClr);
			mailBox.appendChild(document.createTextNode(" Messages"));
		}
		msgID.appendChild(mailBox);
	}
	console.log(result);
	for (; i>=stop; i--,x++) {
		if (result[i]['id'] == -1) {
			doTicker(result, i)
		} else {
			createEntry(msgID, i, x, result);
		}
	}
	msgID.appendChild(document.createTextNode("TODO: add see more button"));
}
async function justGetData() {
	const url = gurl;
	try {
		const response = await fetch(url, {
			"headers": {
				"apikey": gkey,
				"Auhorization": "Bearer " + gkey,
				"Content-Type": "application/json",
			},
		});

		result = await response.json();
		localStorage.setItem("chatDataStore", JSON.stringify(result));
		initialPrintData(result);
	} catch (error) {
		console.error("Unable to get data: ", error.message);
	}
}
function getData() {
	var chatdata = localStorage.getItem("chatDataStore");
	var chat = localStorage.getItem("chatDataStoreTime");
	const timewait = 15 * 60 * 1000; // M * S * MS
	var now = Date.now();
	if (chat !== null) {
		if (chatdata !== null && (now - parseInt(chat)) < timewait) {
			initialPrintData(JSON.parse(chatdata));
			return;
		}
	}

	localStorage.setItem("chatDataStoreTime", String(Date.now()));
	justGetData();
}
function forceGetData() {
	localStorage.setItem("chatDataStoreTime", String(0));
	location.reload();
}





// TODO: prevent refresh option
function afterSendReload() {
	setTimeout(() => {
		location.reload();
	}, 3000);
}
function sendData() {
	const url = gurl;

	if (gerrors == true) {
		alert("No PGP public key loaded!");
		return;
	}
	if (document.getElementById("text-input").value == '') {
		alert("Empty text field");
		return;
	}

	const textInput = document.getElementById("text-input");
	largestMsgID++;

	var params = {
		msg: textInput.value,
		encrypt_for: main_key,
		comment: "hi"
	};
	kbpgp.box(params, function (err, result_string, result_buffer) {
		let obj = {
			id: largestMsgID,
			msg: result_string,
		};
		console.log(obj);

		try {
			const response = fetch(url, {
				method: "POST",
				body: JSON.stringify(obj),
				headers: {
					"apikey": gkey,
					"Auhorization": "Bearer " + gkey,
					"Content-Type": "application/json",
				},
			});

			console.log(response);
			//afterSendReload();
		} catch (error) {
			console.error("Unable to send data: ", error.message);
		}
	});

	textInput.value = "";
}
// TODO:
// - [ ] Repository
// 	- [x] create repo `dead-end`
// 	- [x] move scripts
// 	- [ ] move javascript
// - [x] <Bash> Mailbox
// 	- [x] decode mail
// 	- [x] read mail
// - [ ] <C++> Mailbox decoder
//	- [ ] decrypt
//	- [ ] parse json
//	- [ ] empty all mail
//	- [ ] create logging file (ip adresses, different name types)
// - [ ] <Javascript> sendMail
// 	- [ ] store data locally
// 		- [ ] store it
// 		- [ ] option to refresh anyway
// 		- [ ] timer
//	- [ ] copy button
//	- [-] create ability to embed this easily in a site
//	- [ ] show x amount, with 'see more' button at bottom of selection
//	- [ ] encode json with more data (eg name, contact info)
// - [ ] <Javascript> sendMail (rewrite)
//	- [ ] spam protection
//	- [ ] remove need of custom kbpgp*-min.js to remove comment
