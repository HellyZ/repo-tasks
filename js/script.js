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
    resetBtn.addEventListener("click", (e) => this.resetUI(e));
  },

  resetUI: function (e) {
    this.screens = [];

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
  },
  initRollback: function (e) {
    inputRangeValue.textContent = `${e.target.value}%`;
    this.rollback = e.target.value;
  },
  init: function () {
    this.addTitle();
    buttonPlus.addEventListener("click", this.addScreenBlock);
    startBtn.addEventListener("click", (e) => this.start(e));
    resetBtn.addEventListener("click", (e) => this.clear(e));
    inputRange.addEventListener("input", (e) => this.initRollback(e));
  },

  blockButton: function () {
    startBtn.disabled = n;
    startBtn.style.backgroundColor = "gray";
    startBtn.style.cursor = "not-allowed";
  },
  addTitle: function () {
    document.title = title.outerText;
  },
  otherItemsPercentCheck: function (item) {
    const check = item.querySelector("input[type=checkbox]");
    const label = item.querySelector("label");
    const input = item.querySelector("input[type=text]");
    if (check.checked) {
      this.servicesPercent[label.textContent] = +input.value;
    }
  },
  otherItemsNumberCheck: function (item) {
    const check = item.querySelector("input[type=checkbox]");
    const label = item.querySelector("label");
    const input = item.querySelector("input[type=text]");

    if (check.checked) {
      this.servicesNumber[label.textContent] = +input.value;
    }
  },
  addServices: function () {
    otherItemsPercent.forEach((item) => this.otherItemsPercentCheck(item));
    otherItemsNumber.forEach((item) => this.otherItemsNumberCheck(item));
  },
  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    cloneScreen.classList.add("custom");
    screens[screens.length - 1].after(cloneScreen);
  },
  start: function (e) {
    let screens = this.getScreens();
    if (
      !screens[0].querySelector("select").value ||
      !screens[0].querySelector("input").value
    ) {
      return;
    }
    this.addScreens();
    this.screenCount();
    this.addServices();
    this.addPrices();
    this.showResult();
    this.reset();
  },
  clear: function () {
    this.screenPrice = 0;
    this.screenCountValue = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.fullPrice = 0;
    this.inputRangeValue = 0;
    this.servicePercentPrice = 0;
    this.screens.length = 0;

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
    total.value = this.screenPrice;
    totalCount.value = +this.screenCountValue;
    totalCountOther.value =
      this.servicePricesPercent + this.servicePricesNumber;
    fullTotalCount.value = this.fullPrice;
  },

  processScreen: function (screen, index) {
    const select = screen.querySelector("select");
    const input = screen.querySelector("input");
    const selectName = select.options[select.selectedIndex].textContent;
    if (
      !screens[index].querySelector("select").value ||
      !screens[index].querySelector("input").value
    ) {
      console.log("поля не заполнены");
      this.clear(this);
      this.screens = [];
      return;
    } else {
      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        number: +input.value,
      });
    }
  },

  addScreens: function () {
    screens = document.querySelectorAll(".screen");
    screens.forEach((screen, index) => this.processScreen(screen, index));
  },

  screenCount: function () {
    for (let screen of this.screens) {
      this.screenCountValue += +screen.number;
    }
  },
  addPrices: function () {
    for (let screen of this.screens) {
      this.screenPrice += +screen.price;
    }
    for (let key in this.servicesNumber) {
      this.servicePricesNumber += +this.servicesNumber[key];
    }
    for (let key in this.servicesPercent) {
      this.servicePricesPercent +=
        this.screenPrice * (this.servicesPercent[key] / 100);
    }
    this.fullPrice =
      +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;
    this.servicePercentPrice = Math.ceil(
      this.fullPrice - this.fullPrice * (+this.rollback / 100)
    );
    totalCountRollback.value = this.servicePercentPrice;
  },
  getScreens: function () {
    return document.querySelectorAll(".screen");
  },
};

appData.init();
