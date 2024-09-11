# NodeJS парсер для анализа цен конкурентов на Wildberries

Позволяет получать отчет по минимальной и средней цене конкурентов на выбранные товары

## Установка

### Установка NodeJS

Первым делом убедитесь, что у вас установлен NodeJS и NPM (https://nodejs.org/ - инструкция по установке)

Затем проверьте версию node и npm и правильность установки:

```shell
node -v
npm -v
```

### Клонирование репозитория

```shell
git clone https://github.com/arsenysmorodin/wb_price_parcer.git
```

### Установка зависимостей

```shell
npm install
```

## Использование

### Отредактируйте файл products.json

Важно сохранить структуру и типы данных:

```js
{
 'product1':
	 [
		 'url1',
		 'url2'
	 ],
 'product2':
	 [
		 'url1',
		 'url2'
	 ],
}
```

### Запуск скрипта

```shell
npm run parse
```
