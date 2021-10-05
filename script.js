"use strict";

const title = prompt("Как называется ваш проект?");
const screens = prompt(
  "Какие типы экранов нужно разработать?(прим.:Простые, Сложные, Интерактивные)"
);
const screenPrice = +prompt("Сколько будет стоить данная работа?");
const adaptive = confirm("Нужен ли адаптив на сайте?");
const service1 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice1 = +prompt("Сколько это будет стоить?");
const service2 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice2 = +prompt("Сколько это будет стоить?");

const rollback = 10;

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getAllServicePrices = function (sp1, sp2) {
  return sp1 + sp2;
};

const allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
const fullPrice = getFullPrice(screenPrice, allServicePrices);
const servicePercentPrice = getServicePercentPrices(rollback, fullPrice);

const getRollbackMessage = function (price) {
  if (price < 0) {
    return "Что-то пошло не так";
  } else if (price == 0) {
    return "Итоговая стоимость: 0. А на ноль умножать нельзя!";
  } else if (price <= 3000) {
    return "Скидка не предусмотрена";
  } else if (price <= 5000) {
    return "Даем скидку в 5%";
  } else {
    return "Даем скидку в 10%";
  }
};

function getFullPrice(screenPrice, allSerPrice) {
  return screenPrice + allSerPrice;
}

function getTitle(string) {
  string.trim();
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function getServicePercentPrices(roll, fp) {
  console.log(roll);
  console.log(fp);
  return Math.ceil(fp - roll);
}

function getScreens(string) {
  return string.split(", ");
}

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log("Screens: " + getScreens(screens));
console.log("RollbackMessage: " + getRollbackMessage(fullPrice));
console.log(
  "ServicePercentPrices: " + getServicePercentPrices(rollback, fullPrice)
);
