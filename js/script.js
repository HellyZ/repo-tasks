"use strict";

const title = document.getElementsByTagName("h1")[0];
// Array.from(btns).forEach((el) => console.log(el));

const buttonPlus = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");

const inputRange = document.querySelector(".rollback input");
const inputRangeValue = document.querySelector(".rollback .range-value");

const startBtn = document.getElementById("start");
const resetBtn = document.getElementsByClassName("handler_btn")[1];

const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const fullTotalCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];

let screens = document.querySelectorAll(".screen");

const appData = {
  title: "",
  screens: [],
  screenCountValue: 0,
  screenPrice: 0,
  adaptive: true,
  rollback: 0,
  fullPrice: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  servicePercentPrice: 0,
  services: {},
  servicesPercent: {},
  servicesNumber: {},

  init: function () {
    appData.addTitle();
    buttonPlus.addEventListener("click", appData.addScreenBlock);
    startBtn.addEventListener("click", appData.start);
    inputRange.addEventListener("input", function (e) {
      inputRangeValue.textContent = `${e.target.value}%`;
      appData.rollback = e.target.value;
    });
  },

  blockButton: function (n) {
    startBtn.disabled = n;
    startBtn.style.backgroundColor = "gray";
    startBtn.style.cursor = "not-allowed";
  },
  addTitle: function () {
    document.title = title.outerText;
  },

  addServices: function () {
    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });
    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });

    console.dir(appData);
  },
  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
  },
  start: function () {
    appData.addScreens();
    appData.screenCount();
    appData.addServices();
    appData.addPrices();
    appData.showResult();

    // appData.logger();

    console.log(appData);
  },
  showResult: function () {
    total.value = appData.screenPrice;
    totalCount.value = +appData.screenCountValue;
    totalCountOther.value =
      appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
  },
  addScreens: function () {
    screens = document.querySelectorAll(".screen");
    screens.forEach(function (screen, index) {
      const unlock = 0;
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;
      select.addEventListener("change", function (event) {
        unlock++;
        console.log(`${event.target.value}`);
        console.log(`event.target.parentNode: ${event.target.parentNode}`);
      });
      input.addEventListener("change", function (event) {
        unlock++;
        console.log(`${event.target.value}`);
        console.log(`event.currentTarget: ${event.currentTarget}`);
      });
      console.log(`select: ${select}, input: ${input}`);
      console.log(`blockButton:false ${appData.screens}`);
      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        number: +input.value,
      });
    });
    console.log(appData.screens);
  },
  screenCount: function () {
    for (let screen of appData.screens) {
      console.log(`screen.number ${screen.number}`);
      appData.screenCountValue += +screen.number;
    }
  },
  addPrices: function () {
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }
    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }
    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent +=
        appData.screenPrice * (appData.servicesPercent[key] / 100);
    }
    appData.fullPrice =
      +appData.screenPrice +
      appData.servicePricesNumber +
      appData.servicePricesPercent;
    appData.servicePercentPrice = Math.ceil(
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
    );
    totalCountRollback.value = appData.servicePercentPrice;
  },
  getScreens: function () {
    return appData.screens.split(", ");
  },

  logger: function () {
    for (let prop in appData) {
      if (appData.hasOwnProperty(prop) && typeof appData[prop] !== "function") {
        console.log(`${prop}: ${appData[prop]}`);
      }
    }
  },
};

appData.init();
