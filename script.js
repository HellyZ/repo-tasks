"use strict";

const title = prompt("Как называется ваш проект?");
const screens = prompt(
  "Какие типы экранов нужно разработать?(прим.:Простые, Сложные, Интерактивные)"
);
const screenPrice = +prompt("Сколько будет стоить данная работа?");
const rollback = 97;
const adaptive = confirm("Нужен ли адаптив на сайте?");

const service1 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice1 = +prompt("Сколько это будет стоить?");

const service2 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice2 = +prompt("Сколько это будет стоить?");

const fullPrice = screenPrice + servicePrice1 + servicePrice2;

const servicePercentPrice = Math.ceil(fullPrice - rollback);

if (fullPrice < 0) {
  console.log("Что-то пошло не так");
} else if (fullPrice == 0) {
  console.log("Итоговая стоимость: 0. А на ноль умножать нельзя!");
} else if (fullPrice <= 3000) {
  console.log("Скидка не предусмотрена");
} else if (fullPrice <= 5000) {
  console.log("Даем скидку в 5%");
} else {
  console.log("Даем скидку в 10%");
}