import { launch } from "puppeteer"

const products = {
	"Держатель ковриков для автомойки": [
		"https://www.wildberries.ru/catalog/241462726/detail.aspx",
		"https://www.wildberries.ru/catalog/36051174/detail.aspx",
	],
	"Кондиционер для кожи": [
		"https://www.wildberries.ru/catalog/168166285/detail.aspx",
		"https://www.wildberries.ru/catalog/64123255/detail.aspx",
	],
}

async function run($url) {
	const browser = await launch()
	const page = await browser.newPage()

	await page.goto($url)
	await page.waitForSelector(".price-block__wallet-price")

	let content = await page.evaluate(() => {
		let element = document.querySelector(".price-block__wallet-price")
		return parseFloat(
			element.innerHTML.replace(/[^\d.,]/g, "").replace(",", ".")
		)
	})

	console.log(content)
	browser.close()
}

run(products["Держатель ковриков для автомойки"][0])
