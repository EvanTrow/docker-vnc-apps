require('dotenv').config();

const moment = require('moment');
require('log-timestamp')(function () {
	return `[${moment().format('YYYY/MM/DD HH:mm:ss')}] %s`;
});

const puppeteer = require('puppeteer');
const twofactor = require('node-2fa');
const axios = require('axios');

const emailElement = 'input[name="loginfmt"]';
const nextLoginBtnElement = 'input[value="Next"]';
const passwordElement = 'input[name="passwd"]';
const signInBtnElement = 'input[value="Sign in"]';
const useMfaBtnElement = 'div[data-value="PhoneAppOTP"]';
const mfaCodeElement = 'input[name="otc"]';
const rememberMfaElement = 'input[name="rememberMFA"]';
const verifyBtnElement = 'input[value="Verify"]';
const dontShowAgainElement = 'input[name="DontShowAgain"]';
const yesBtnElement = 'input[value="Yes"]';

const statusElement = '#personDropdown > div > div > div > skype-status > span > span > span.status-icon';

const hassToken = process.env.HASS_TOKEN;
const busyStates = process.env.TEAMS_BUSY_STATES.split(',').map((s) => s.trim());

var lastBusyStatus = false;
const isBusy = (activity) => {
	if (busyStates.includes(activity)) {
		return true;
	}
	return false;
};

// console.log(twofactor.generateToken('lgn5fbblmsd6vscs'));

const setLight = async () => {
	var busy = lastBusyStatus;

	console.log('Updating Light', {
		busy: busy,
	});

	await axios
		.post(
			`${process.env.HASS_URL}/api/services/light/${busy === true ? 'turn_on' : 'turn_off'}`,
			busy === true
				? {
						entity_id: `light.${process.env.HASS_LIGHT_ID}`,
						rgb_color: [255, 0, 0],
				  }
				: {
						entity_id: `light.${process.env.HASS_LIGHT_ID}`,
				  },
			{
				headers: { Authorization: `Bearer ${hassToken}` },
				'Content-Type': 'application/json',
			}
		)
		.then((response) => {
			console.log('Updated');
		})
		.catch((err) => console.log(err));
};
setLight();

(async () => {
	const browser = await puppeteer.launch({
		// headless: false,
		// devtools: true,
		slowMo: 10,
		userDataDir: './tmp',
		headless: false,
		devtools: true,
		args: [`--window-size=1920,1080`, '--no-sandbox', '--disable-setuid-sandbox'],
		defaultViewport: {
			width: 1280,
			height: 720,
		},
	});
	const page = (await browser.pages())[0];

	await page.goto('https://teams.microsoft.com');

	if (process.env.M365_USERNAME) {
		// login if email provided
		await page
			.waitForSelector(emailElement, {
				timeout: 15000,
			})
			.then(async () => {
				await delay(5000);
				console.log('login');
				await page.type(emailElement, process.env.M365_USERNAME);
				await page.click(nextLoginBtnElement);

				await delay(1500);
				await page.waitForSelector(passwordElement).then(async () => await page.type(passwordElement, process.env.M365_PASSWORD));
				await page.click(signInBtnElement);

				await delay(1500);
				await page.click(useMfaBtnElement);
				await delay(1000);
				await page.waitForSelector(mfaCodeElement).then(async () => await page.type(mfaCodeElement, twofactor.generateToken(process.env.M365_MFA_SECRET).token));
				await page.click(rememberMfaElement);
				await delay(250);
				await page.click(verifyBtnElement);
				await delay(1000);
				await page.waitForSelector(dontShowAgainElement).then(async () => {
					await delay(250);
					await page.click(dontShowAgainElement);
				});
				await delay(250);
				await page.click(yesBtnElement);

				await delay(1000);
				start(page);
			})
			.catch(async (err) => {
				if (err.message.includes('Waiting for selector `input[name="loginfmt"]` failed: Waiting failed:')) {
					console.log('Start');
					start(page);
				}
			});
	} else {
		start(page);
	}
})();

async function start(page) {
	await page.goto('https://teams.microsoft.com/_#/apps/5a0e35f9-d3c8-45b6-9dd9-983ab47f1b83/sections/about');

	await page.waitForSelector(statusElement);
	const mri = (await page.evaluate(`document.querySelector("${statusElement}").getAttribute("data-tid")`)).split('presence-')[1];

	setInterval(async () => {
		// get token
		let cookies = await page.cookies();
		let token = cookies
			.find((c) => c.name == 'authtoken')
			.value.split('Bearer%3D')[1]
			.split('%26Origin')[0];

		if (token) {
			// get presence
			axios
				.request({
					method: 'POST',
					url: 'https://presence.teams.microsoft.com/v1/presence/getpresence/',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					data: [{ mri: mri }],
				})
				.then(async (response) => {
					console.log(response.data[0].presence.activity);

					var newBusyStatus = isBusy(response.data[0].presence.activity);
					if (lastBusyStatus != newBusyStatus) {
						lastBusyStatus = newBusyStatus;
						await setLight();
					}
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, 5000);
}

function delay(time) {
	return new Promise(function (resolve) {
		setTimeout(resolve, time);
	});
}
