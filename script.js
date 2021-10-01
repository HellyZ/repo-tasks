let title = "Repo task";
let screens = "Simple, Complex, Interactive";
let screenPrice = 25;
let rollback = 97;
let fullPrice = 5000000;
let adaptive = true;

console.log("title: "+ typeof(title) +"\nfullPrice: "+ typeof(fullPrice) + "\nadaptive: "+ typeof(adaptive));
console.log(screens.length);
console.log(`Стоимость верстки экранов ${screenPrice} рублей/ долларов/гривен/юани`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей/ долларов/гривен/юани`);
console.log(screens.toLowerCase().split(', '))
console.log(fullPrice * (rollback/100))
