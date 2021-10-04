const title = "Repo task";
const screens = "Simple, Complex, Interactive";
const screenPrice = 25;
const rollback = 97;
const fullPrice = 5000000;
const adaptive = true;

console.log(
  "title: " +
    typeof title +
    "\nfullPrice: " +
    typeof fullPrice +
    "\nadaptive: " +
    typeof adaptive
);
console.log(screens.length);
console.log(
  `Стоимость верстки экранов ${screenPrice} гривен\nСтоимость разработки сайта ${fullPrice} гривен`
);
console.log(screens.toLowerCase().split(", "));
console.log(fullPrice * (rollback / 100));
