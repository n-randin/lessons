const request = require('request');
const cheerio = require('cheerio');

request('https://ria.ru/', (err, response, body) => {
    if(!err && response.statusCode === 200){
        const $ = cheerio.load(body);
        console.log(`Главные новости на сегодня:`);

        $('.cell-list__item-title').slice(0,5).each(function(){
            console.log($( this ).text())
        })
    }
});