"use strict";

const title = document.getElementsByTagName("h1")[0];

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

let allInputs = document.querySelectorAll("input[type=text]");
const checkboxes = document.querySelectorAll("input[type=checkbox]");
let allSelects = document.querySelectorAll("[name=views-select]");
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

  reset: function () {
    allInputs = document.querySelectorAll("input[type=text]");
    allSelects = document.querySelectorAll("[name=views-select]");
    allInputs.forEach((item) => {
      item.setAttribute("disabled", "disabled");
      // .removeAttribute("disabled");
    });
    checkboxes.forEach((item) => {
      item.setAttribute("disabled", "disabled");
    });
    allSelects.forEach((item) => {
      item.setAttribute("disabled", "disabled");
    });
    inputRange.setAttribute("disabled", "disabled");
    startBtn.style.display = "none";
    resetBtn.style.display = "block";
    // startBtn.removeEventListener("click", this.start);
    console.log(this);
    resetBtn.addEventListener("click", this.resetUI);
  },

  resetUI: function () {
    appData.screens = [];

    allInputs.forEach((item) => {
      item.removeAttribute("disabled");
    });
    checkboxes.forEach((item) => {
      item.removeAttribute("disabled");
    });
    allSelects.forEach((item) => {
      item.removeAttribute("disabled");
    });
    inputRange.removeAttribute("disabled", "disabled");
    inputRange.value = 0;
    inputRangeValue.textContent = "0%";
    startBtn.style.display = "block";
    resetBtn.style.display = "none";

    // this.init();
  },
  init: function () {
    this.addTitle();
    buttonPlus.addEventListener("click", this.addScreenBlock);
    startBtn.addEventListener("click", this.start);
    resetBtn.addEventListener("click", this.clear);
    inputRange.addEventListener("input", function (e) {
      inputRangeValue.textContent = `${e.target.value}%`;
      appData.rollback = e.target.value;
    });
  },

  blockButton: function () {
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
  },
  addScreenBlock: function () {
    console.log("addScreenBlock");
    console.log(appData.screens);
    const cloneScreen = screens[0].cloneNode(true);
    cloneScreen.classList.add("custom");
    screens[screens.length - 1].after(cloneScreen);
  },
  start: function () {
    let screens = appData.getScreens();
    if (
      !screens[0].querySelector("select").value ||
      !screens[0].querySelector("input").value
    ) {
      return;
    }
    appData.addScreens();
    appData.screenCount();
    appData.addServices();
    appData.addPrices();
    appData.showResult();
    appData.reset();
    // appData.clear();
  },
  clear: function () {
    console.log("clear");
    console.log(this);
    appData.screenPrice = 0;
    appData.screenCountValue = 0;
    appData.servicePricesPercent = 0;
    appData.servicePricesNumber = 0;
    appData.fullPrice = 0;
    appData.inputRangeValue = 0;
    appData.servicePercentPrice = 0;
    appData.screens.length = 0;
    console.log(allInputs.length);
    console.log(allInputs[2]);
    console.log(allInputs[7]);

    // allInputs.slice(-7).forEach((item) => {
    //   item.value = "";
    // });
    checkboxes.forEach((item) => {
      item.checked = false;
    });
    document.querySelectorAll(".screen.custom").forEach((e) => e.remove());
    screens[0].querySelector("select").selectedIndex = 0;
    screens[0].querySelector("input").value = null;

    document
      .querySelectorAll("div.main-total input")
      .forEach((e) => (e.value = 0));

    document
      .querySelectorAll(`.main-controls__input input[type="text"]`)
      .forEach((item) => {
        item.selectedIndex = 0;
      });
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
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;
      if (
        !screens[index].querySelector("select").value ||
        !screens[index].querySelector("input").value
      ) {
        console.log("поля не заполнены");
        this.clear(appData);
        this.screens = [];
        return;
      } else {
        console.log("все поля заполнены");
        appData.screens.push({
          id: index,
          name: selectName,
          price: +select.value * +input.value,
          number: +input.value,
        });
      }
    });
  },
  screenCount: function () {
    for (let screen of appData.screens) {
      appData.screenCountValue += +screen.number;
    }
  },
  addPrices: function () {
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }
    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += +appData.servicesNumber[key];
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
      appData.fullPrice - appData.fullPrice * (+appData.rollback / 100)
    );
    totalCountRollback.value = appData.servicePercentPrice;
  },
  getScreens: function () {
    return document.querySelectorAll(".screen");
  },

  logger: function () {
    for (let prop in appData) {
      if (this.hasOwnProperty(prop) && typeof this[prop] !== "function") {
        console.log(`${prop}: ${this[prop]}`);
      }
    }
  },
};

appData.init();
