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

	await browser.close()
	return content
}

async function getPrices() {
	const result = {}

	for (const product in products) {
		const urls = products[product]
		const prices = []

		// Сбор цен для всех URL
		for (const url of urls) {
			const price = await run(url)
			prices.push(price)
		}

		// Рассчитываем среднюю и минимальную цены
		const averagePrice =
			prices.reduce((acc, price) => acc + price, 0) / prices.length
		const minPrice = Math.min(...prices)

		// Добавляем данные в результирующий объект
		result[product] = {
			averagePrice: averagePrice.toFixed(2),
			minPrice: minPrice.toFixed(2),
		}
	}

	console.log(result)
	return result
}

getPrices()
