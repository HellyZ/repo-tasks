"use strict";

let title;
let screens;
let screenPrice;
let adaptive;

const rollback = 10;

let service1;
let service2;

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num) && num !== null;
};

const asking = function () {
  title = prompt("Как называется ваш проект?", "Калькулятор верстки");
  screens = prompt(
    "Какие типы экранов нужно разработать?(прим.:Простые, Сложные, Интерактивные)",
    "Простые, Сложные"
  );

  do {
    screenPrice = +prompt("Сколько будет стоить данная работа?");
  } while (!isNumber(screenPrice));

  adaptive = confirm("Нужен ли адаптив на сайте?");
};

const getAllServicePrices = function () {
  let sum = 0;
  let data = 0;
  for (let i = 0; i < 2; i++) {
    console.log(`start sum: ${sum}`);
    if (i === 0) {
      service1 = prompt("Какой дополнительный тип услуги нужен?", "Админка");
    } else if (i === 1) {
      service2 = prompt("Какой дополнительный тип услуги нужен?", "Аналитика");
    }
    do {
      data = Number(prompt("Сколько это будет стоить?"));
    } while (!isNumber(data));

    sum += data;
    console.log(`data: ${data}`);
  }
  console.log(`sum: ${sum}`);
  return sum;
};

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

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

asking();
const allServicePrices = getAllServicePrices();
const fullPrice = getFullPrice(screenPrice, allServicePrices);
const servicePercentPrice = getServicePercentPrices(rollback, fullPrice);
title = getTitle(title);

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log("allServicePrices", allServicePrices);

console.log("Screens: " + getScreens(screens));
console.log("RollbackMessage: " + getRollbackMessage(fullPrice));
console.log(
  "ServicePercentPrices: " + getServicePercentPrices(rollback, fullPrice)
);
