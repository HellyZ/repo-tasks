"use strict";

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const isString = function (str) {
  return (!isNumber(str) && str !== "");
}

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: false,
  rollback: 10,
  services: {},

  start: function() {
    appData.asking();
    appData.addPrices();
    appData.getFullPrice();
    appData.getServicePercentPrices();
    appData.getTitle();
    appData.getRollbackMessage();
    
    appData.logger();
  },
  asking: function () {
    do {
      appData.title = prompt("Как называется ваш проект?");
    } while (!isString(appData.title))
  
      let name;
      do {
        name = prompt(
          "Какие типы экранов нужно разработать?(прим.:Простые, Сложные, Интерактивные)"
        )
      } while (!isString(name))
      
      let price = 0;

      do {
        price = +prompt("Сколько будет стоить данная работа?");
      } while (!isNumber(price));

      appData.screens.push({name: name, price: price});


    for (let i = 0; i < 2; i++) {
      
      let name;
      do {
        name = prompt("Какой дополнительный тип услуги нужен?");
      } while (!isString(name));

      let data = 0;
      
      do {
        data = Number(prompt("Сколько это будет стоить?"));
      } while (!isNumber(data));
      appData.services[i] = {name: name, price: +data}
    }

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");

  },
  addPrices: function(){
    for (let key in appData.services){
      appData.allServicePrices =+ appData.services[key].price
    }
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price
    }
  },
  getRollbackMessage: function () {
    if (appData.fullPrice < 0) {
      return "Что-то пошло не так";
    } else if (appData.fullPrice == 0) {
      return "Итоговая стоимость: 0. А на ноль умножать нельзя!";
    } else if (appData.fullPrice <= 3000) {
      return "Скидка не предусмотрена";
    } else if (appData.fullPrice <= 5000) {
      return "Даем скидку в 5%";
    } else {
      return "Даем скидку в 10%";
    }
  },
  getFullPrice: function() {
    appData.fullPrice =  +appData.screenPrice + appData.allServicePrices;
  },
  getTitle: function() {
    appData.title = appData.title.trim()[0].charAt(0).toUpperCase() + appData.title.slice(1).toLowerCase();
  },
  getServicePercentPrices: function() {
    appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice  * (appData.rollback / 100)));
  },
  getScreens: function() {
    return appData.screens.split(", ");
  },

  logger: function(){
    for ( let prop in appData ) {
      if ( appData.hasOwnProperty( prop ) && typeof appData[prop] !== "function" ) {
        console.log( appData[prop] );
      }
    }
    console.log(appData.screens);  
  }
 }


appData.start();
