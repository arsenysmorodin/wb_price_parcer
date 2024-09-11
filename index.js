import { promises as fs } from "fs" // Импортируем модуль для работы с файлами
import { launch } from "puppeteer"

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
	// Читаем файл products.json и парсим его содержимое
	const data = await fs.readFile("./products.json", "utf-8")
	const products = JSON.parse(data)

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
