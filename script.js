"use strict";


const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const appData = {
  title: "",
  screens: "",
  screenPrice: 0,
  adaptive: false,
  rollback: 10,
  service1: 0,
  service2: 0,

  asking: function () {
    appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
    appData.screens = prompt(
      "Какие типы экранов нужно разработать?(прим.:Простые, Сложные, Интерактивные)",
      "Простые, Сложные"
    );
  
    do {
      appData.screenPrice = +prompt("Сколько будет стоить данная работа?");
    } while (!isNumber(appData.screenPrice));
  
    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.servicePercentPrice = appData.getServicePercentPrices();
    appData.title = appData.getTitle();
  },
  getAllServicePrices: function () {
    let sum = 0;
    let data = 0;
    for (let i = 0; i < 2; i++) {
      console.log(`start sum: ${sum}`);
      if (i === 0) {
        appData.service1 = prompt("Какой дополнительный тип услуги нужен?", "Админка");
      } else if (i === 1) {
        appData.service2 = prompt("Какой дополнительный тип услуги нужен?", "Аналитика");
      }
      do {
        data = Number(prompt("Сколько это будет стоить?"));
      } while (!isNumber(data));
  
      sum += +data;
    }
    return sum;
  },
  getAllServicePrices: function () {
    let sum = 0;
    let data = 0;
    for (let i = 0; i < 2; i++) {
      console.log(`start sum: ${sum}`);
      if (i === 0) {
        appData.service1 = prompt("Какой дополнительный тип услуги нужен?", "Админка");
      } else if (i === 1) {
        appData.service2 = prompt("Какой дополнительный тип услуги нужен?", "Аналитика");
      }
      do {
        data = Number(prompt("Сколько это будет стоить?"));
      } while (!isNumber(data));
  
      sum += +data;
      console.log(`data: ${data}`);
    }
    console.log(`sum: ${sum}`);
    return sum;
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
    return +appData.screenPrice + appData.allServicePrices;
  },
  getTitle: function() {
    return appData.title.trim()[0].charAt(0).toUpperCase() + appData.title.slice(1).toLowerCase();
  },
  getServicePercentPrices: function() {
    return Math.ceil(appData.fullPrice - (appData.fullPrice  * (appData.rollback / 100)));
  },
  getScreens: function() {
    return appData.screens.split(", ");
  },
  start: function() {
    appData.asking();
    appData.logger();
  },
  logger: function(){
    for ( let prop in appData ) {
      if ( appData.hasOwnProperty( prop ) && typeof appData[prop] !== "function" ) {
        console.log( appData[prop] );
      }
    }  
  }
 }


appData.start();
