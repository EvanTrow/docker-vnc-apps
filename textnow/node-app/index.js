const cron = require('node-cron');
const fs = require('fs');
const moment = require('moment');
const nodemailer = require('nodemailer');
const chalk = require('chalk');
const fetch = require('node-fetch');
const log = console.log;
const config = JSON.parse(fs.readFileSync('./config.json'));

log(chalk.yellow(`Running bot at cron interval: ${config.cron}`));

// cron.schedule(config.cron, async () => {
// 	log(chalk.green('Running bot...'));
// });

start();

async function start() {
	const puppeteer = require('puppeteer-extra');
	const StealthPlugin = require('puppeteer-extra-plugin-stealth')();
	StealthPlugin.onBrowser = () => {};
	puppeteer.use(StealthPlugin);
	const browser = await puppeteer.launch(
		config.debug
			? {
					headless: false,
					devtools: true,
					args: [`--window-size=1920,1080`, '--no-sandbox', '--disable-setuid-sandbox'],
					defaultViewport: {
						width: 1280,
						height: 720,
					},
			  }
			: {
					headless: true,
					args: [`--window-size=1920,1080`, '--no-sandbox', '--disable-setuid-sandbox'],
					defaultViewport: {
						width: 1280,
						height: 720,
					},
			  }
	);

	try {
		// 0 14 */5 * *
		cron.schedule(config.cron, async () => {
			const page = await browser.newPage();

			await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36');
			await page.goto('https://www.textnow.com/login');
			log(chalk.blue(`Useragent: ${await page.evaluate(() => navigator.userAgent)}`));

			await page.waitFor(2000);
			if (page.url() == 'https://www.textnow.com/login') {
				await page.type('#txt-username', config.username);
				await page.type('#txt-password', config.password);
				await page.evaluate(
					({ config }) => {
						document.getElementById('btn-login').click();
					},
					{ config }
				);
				await page.waitFor(5000);
				log(chalk.cyan(`Login success!✨`));
			}

			await page.waitForSelector('#text-input');

			await page.type('#text-input', config.message_prefix + moment().format('LLL'));
			await page.waitFor(250);

			await page.keyboard.press('Enter');
			log(chalk.magenta(`Message sent!📬`));

			await page.waitFor(5000);

			await page.close();
		});
	} catch (e) {
		await page.screenshot({ path: 'screenshot.png' });

		log(chalk.red(e));

		let transporter = nodemailer.createTransport(config.email.mailer);

		let info = await transporter.sendMail({
			from: config.email.from,
			to: config.email.to,
			subject: 'TextNow ERROR 🔥',
			html: `<b>TextNow Error:</b> <br/><br/>
                        ${e.stack}
                        <br/><br/><br/><br/>
                        ${moment().format('LLL')}
                    `,
		});
		console.log({ MessageId: info.messageId });

		await browser.close();
	}
}
