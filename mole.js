const MIN_INTERVAL = 2000;
const MAX_INTERVAL = 20000;
const SAD_INTERVAL = 500;
const HUNGRY_INTERVAL = 2000;
const wormContainer = document.querySelector(".worm-container");
let score = 0;

const getInterval = () => Date.now() + MIN_INTERVAL + Math.floor(Math.random() * MAX_INTERVAL);
const getSadInterval = () => Date.now() + SAD_INTERVAL;
const getKingStatus = () => Math.random() > 0.9;
const getHungryInterval = () => Date.now() + HUNGRY_INTERVAL;

const moles = [
	{
		status: "sad",
		next: getSadInterval(),
		king: true,
		node: document.getElementById("hole-0"),
	},
	{
		status: "sad",
		next: getSadInterval(),
		king: true,
		node: document.getElementById("hole-1"),
	},
	{
		status: "sad",
		next: getSadInterval(),
		king: true,
		node: document.getElementById("hole-2"),
	},
	{
		status: "sad",
		next: getSadInterval(),
		king: true,
		node: document.getElementById("hole-3"),
	},
	{
		status: "sad",
		next: getSadInterval(),
		king: true,
		node: document.getElementById("hole-4"),
	},
	{
		status: "sad",
		next: getSadInterval(),
		king: true,
		node: document.getElementById("hole-5"),
	},
	{
		status: "sad",
		next: getSadInterval(),
		king: true,
		node: document.getElementById("hole-6"),
	},
	{
		status: "sad",
		next: getSadInterval(),
		king: true,
		node: document.getElementById("hole-7"),
	},
	{
		status: "sad",
		next: getSadInterval(),
		king: true,
		node: document.getElementById("hole-8"),
	},
	{
		status: "sad",
		next: getSadInterval(),
		king: true,
		node: document.getElementById("hole-9"),
	},
];

const getNextStatus = (mole) => {
	switch (mole.status) {
		case "sad":
		case "fed":
			mole.next = getSadInterval();
			if (mole.king) {
				mole.node.children[0].src = "./static/king-mole-leaving.png";
			} else {
				mole.node.children[0].src = "./static/mole-leaving.png";
			}
			mole.status = "leaving";
			break;
		case "leaving":
			mole.next = getInterval();
			mole.king = false;
			mole.node.children[0].classList.toggle("gone", true);
			mole.status = "gone";
			break;
		case "hungry":
			mole.node.children[0].classList.toggle("hungry", false);
			if (mole.king) {
				mole.node.children[0].src = "./static/king-mole-sad.png";
			} else {
				mole.node.children[0].src = "./static/mole-sad.png";
			}
			mole.status = "sad";
			mole.next = getSadInterval();
			break;
		case "gone":
			mole.status = "hungry";
			mole.king = getKingStatus();
			mole.next = getHungryInterval();
			mole.node.children[0].classList.toggle("hungry", true);
			mole.node.children[0].classList.toggle("gone", false);
			if (mole.king) {
				mole.node.children[0].src = "./static/king-mole-hungry.png";
			} else {
				mole.node.children[0].src = "./static/mole-hungry.png";
			}
			break;
	}
};

//feed function
const feed = (e) => {
	// it should be an IMG and hungry-mole
	if (e.target.tagName !== "IMG" || !e.target.classList.contains("hungry")) {
		return;
	}

	const mole = moles[+e.target.dataset.index];

	mole.status = "fed";
	mole.next = getSadInterval();
	mole.node.children[0].classList.toggle("hungry", false);
	if (mole.king) {
		mole.node.children[0].src = "./static/king-mole-fed.png";
		score += 20;
	} else {
		mole.node.children[0].src = "./static/mole-fed.png";
		score += 10;
	}

	if (score >= 100) {
		// TODO you win here
		win();
		return;
	}

	//worm-part

	wormContainer.style.width = `${score}%`;
};
//win function - show picture
const win = () => {
	document.querySelector(".bg").classList.toggle("hide", true);
	document.querySelector(".win").classList.toggle("show", true);
};

document.querySelector(".bg").addEventListener("click", feed);

// make a cycle

const nextFrame = () => {
	const now = Date.now();
	for (let i = 0; i < moles.length; i++) {
		if (moles[i].next < now) {
			getNextStatus(moles[i]);
		}
	}
	requestAnimationFrame(nextFrame);
};

requestAnimationFrame(nextFrame);

// const body = document.querySelector("body");
// let randomNumber = 0;

// const makeNumber = () => {
// 	randomNumber = Math.floor(Math.random() * 20 + 1);
// 	return randomNumber;
// };
// // hide moles
// const hideMoles = () => {
// 	moles.forEach((mole) => {
// 		mole.classList.remove("mole");
// 		mole.classList.add("hide");
// 	});
// };
// //show moles
// const showMoles = () => {
// 	moles.forEach((mole) => {
// 		mole.classList.remove("hide");
// 		mole.classList.add("mole");
// 	});
// };
// //mouse over moles
// moles.forEach((mole) => {
// 	console.log(mole.src);

// 	mole.addEventListener("mouseover", (event) => {
// 		event.preventDefault();
// 		event.target.classList.add("hungry");
// 	});
// });

// //start the game!
// let startMessage = "";
// const start = document.querySelector(".start");

// //hide moles when it starts
// setTimeout(() => {
// 	hideMoles();
// }, 1000);
// //to make them show up in random timeset

// setTimeout(() => {
// 	showMoles();
// }, 4000);
