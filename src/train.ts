// TASK ZJ:

function reduceNestedArray(a: any[]) {
  const result = a.flat(Infinity).reduce((acc, val) => acc + val, 0);

  console.log(result);
}

reduceNestedArray([1, [1, 2, [4]]]);

// Shunday function yozing, u berilgan array ichidagi
// raqamlarni qiymatini hisoblab qaytarsin.

// MASALAN: reduceNestedArray([1, [1, 2, [4]]]); return 8;

// Yuqoridagi misolda, array nested bo'lgan holdatda ham,
// bizning function ularning yig'indisini hisoblab qaytarmoqda.

// TASK ZI

// function delayHelloWorld(a: string) {
//   setTimeout(() => {
//     console.log(a);
//   }, 3000);
// }

// delayHelloWorld("Hello, World!");

// Shundan function yozing, bu function 3 soniydan so'ng
// "Hello World!" so'zini qaytarsin.

// MASALAN: delayHelloWorld("Hello World"); return "Hello World";

// TASK ZH

// function findDisappearedNumbers(a: number[]) {
//   const result = [];
//   const min = Math.min(...a);
//   const max = Math.max(...a);

//   for (let i = min; i <= max; i++) {
//     if (!a.includes(i)) {
//       result.push(i);
//     }
//   }

//   return result;
// }

// console.log(findDisappearedNumbers([1, 3, 4, 10]));

// Shunday function yozing, u berilgan array parametri ichidagi
// raqamlar orasidan, tartib bo'yicha eng kichik raqamdan, eng katta raqamgacha
// tushirib qoldirilgan sonlarni o'zinigina topib bir array sifatida qaytarsin.

// MASALAN: findDisappearedNumbers([1, 3, 4, 7]); return [2, 5, 6];

// Yuqoridagi misolda, eng katta raqam bu 7 va eng kichik raqam bu 1.
// Function'ning vazifasi berilgan sonlar ichidan tushirib qoldirilgan
// sonlarnigina topib qaytarmoqda.

// TASK ZG

// function convertToSnakeCase(a: string) {
//   return a.toLowerCase().split(" ").join("_");
// }
// console.log(convertToSnakeCase("name should be a string"));

// String sifatida berilgan string parametrni
// snake case'ga o'tkazib beradigan function yozing.

// MASALAN: convertToSnakeCase('name should be a string')
// return 'name_should_be_a_string'

// TASK ZF

// function capitalizeWords(a: string) {
//   const result = a
//     .split(" ")
//     .map((word, index) =>
//       word.length > 3 ? word[0].toUpperCase() + word.slice(1) : word
//     )
//     .join(" ");

//   console.log(result);
// }

// capitalizeWords("name should be a string ok");

// Shunday function yozing, uni string parametri bo'lsin.
// Ushbu function, har bir so'zni bosh harflarini katta harf qilib qaytarsin.
// Lekin uzunligi 1 yoki 2 harfga teng bo'lgan so'zlarni esa o'z holicha
// qoldirsin.

// MASALAN: capitalizeWords('name should be a string'); return 'Name Should be a String';

// Yuqoridagi misolda, bizning function, uzunligi 2 harfdan katta bo'lgan so'zlarnigina,
// birinchi harfini katta harf bilan qaytarmoqda.

// TASK ZE

// function removeDuplicate(a: string) {
//   console.log(...new Set(a));
// }

// removeDuplicate("stringgsddd");

// Shunday function yozing, uniygona string parametri mavjud bo'lsin.
// Bu function string tarkibidagi takrorlangan xarflarni olib tashlab qolgan
// qiymatni qaytarsin.

// MASALAN: removeDuplicate('stringg') return 'string'

// Yuqoridagi misolda, 'stringg' so'zi tarkibida 'g' harfi takrorlanmoqda
// funktsiyamiz shu bittadan ortiq takrorlangan harfni olib natijani
// qaytarmoqda.

// TASK ZD

// function changeNumberInArray(a: number, b: number[], c: number) {
//   b[a] = c;
//   console.log(b);
// }

// changeNumberInArray(2, [1, 3, 7, 2], 2);

// Shunday function yozing. Bu function o'ziga, parametr sifatida
// birinchi oddiy number, keyin yagona array va uchinchi bo'lib oddiy number
// qabul qilsin. Berilgan birinchi number parametr, arrayning tarkibida indeks bo'yicha hisoblanib,
// shu aniqlangan indeksni uchinchi number parametr bilan alashtirib, natija sifatida
// yangilangan arrayni qaytarsin.

// MASALAN: changeNumberInArray(1, [1,3,7,2], 2) return [1,2,7,2];

// Yuqoridagi misolda, birinchi raqam bu '1' va arrayning '1'chi indeksi bu 3.
// Bizning function uchinchi berilgan '2' raqamini shu '3' bilan almashtirib,
// yangilangan arrayni qaytarmoqda.

// TASK ZC

// function celsiustoFahrenheit(a: number) {
//   const result = (a * 9) / 5 + 32;

//   console.log(result);
// }
// celsiustoFahrenheit(0);

// Selisy (°C) shkalasi bo'yicha raqam qabul qilib, uni
// Ferenhayt (°F) shkalisaga o'zgaritib beradigan function yozing.

// MASALAN: celsiusToFahrenheit(0) return 32;
// MASALAN: celsiusToFahrenheit(10) return 50;

// Yuqoridagi misolda, 0°C, 32°F'ga teng.
// Yoki 10 gradus Selsiy, 50 Farenhaytga teng.

// °C va °F => Tempraturani o'lchashda ishlatiladigan o'lchov birligi.

//TASK ZA

// function sortByAge(a: any[]) {
//   a.sort((a, b) => a.age - b.age);

//   console.log(a);
// }

// sortByAge([{ age: 23 }, { age: 21 }, { age: 13 }]);

// Shunday function yozing, u array ichidagi objectlarni
// 'age' qiymati bo'yicha sortlab bersin.

// MASALAN: sortByAge([{age:23}, {age:21}, {age:13}]) return [{age:13}, {age:21}, {age:23}]

// Yuqoridagi misolda, kichik raqamlar katta raqamlar tomon
// tartiblangan holatda return bo'lmoqda.

// TASK Z

// function sumEvens(a: number[]) {
//   const result = a
//     .filter((num) => num % 2 === 0 && num * 2)
//     .reduce((num, b) => num + b, 0);

//   console.log(result);
// }

// sumEvens([1, 2, 4, 5, 3, 8, 24]);

// Shunday function yozing. Bu function sonlardan iborat array
// qabul qilsin. Function'ning vazifasi array tarkibidagi juft
// sonlarni topib ularni yig'disini qaytarsin.

// MASALAN:
// sumEvens([1, 2, 3]); return 2;
// sumEvens([1, 2, 3, 2]); return 4;

// Yuqoridagi misolda, bizning funktsiya
// berilayotgan array tarkibidagi sonlar ichidan faqatgina juft bo'lgan
// sonlarni topib, ularni hisoblab yig'indisini qaytarmoqda.

// TASK Y

// function findIntersection(a: number[], b: number[]) {
//   const result = a.filter((ele) => b.includes(ele));

//   console.log(result);
// }

// findIntersection([1, 2, 4], [2, 3, 4]);
// findIntersection([1, 0, 2, 5], [1, 2, 4, 5]);

// Shunday function yozing, uni 2'ta array parametri bo'lsin.
// Bu function ikkala arrayda ham ishtirok etgan bir xil
// qiymatlarni yagona arrayga joylab qaytarsin.

// MASALAN: findIntersection([1,2,3], [3,2,0]) return [2,3]

// Yuqoridagi misolda, argument sifatida berilayotgan array'larda
// o'xshash sonlar mavjud. Function'ning vazifasi esa ana shu
// ikkala array'da ishtirok etgan o'xshash sonlarni yagona arrayga
// joylab return qilmoqda.

//TASK X
// function countOccurrences(a: Record<string, any>, b: string): number {
//   let result = 0;

//   for (const key in a) {
//     if (key === b) {
//       result++;
//     }

//     if (typeof a[key] === "object" && a[key] !== null) {
//       result += countOccurrences(a[key], b);
//     }
//   }
//   return result;
// }

// console.log(
//   countOccurrences(
//     { model: "Bugatti", steer: { model: "HANKOOK", size: 30 } },
//     "model"
//   )
// );

//TASK V
// function countChars(a: string): { [char: string]: number } {
//   const result: { [char: string]: number } = {};

//   for (const char of a) {
//     if (char === " ") continue;
//     result[char] = (result[char] || 0) + 1;
//   }

//   return result;
// }

// console.log(countChars("hello"));

// Chiqaradi: { b: [0], a: [1, 3, 5], n: [2, 4] }
//TASK U
// function countOddsInRange(a: number) {
//   let result = 0;
//   for (let i = 1; i <= a; i++) {
//     if (i % 2 !== 0) {
//       result++;
//     }
//   }
//   console.log(result);
// }

// countOddsInRange(77);

//TASK T
// function mergeSortedArrays(a: number[], b: number[]) {
//   const result = a.concat(b);

//   console.log(result);
// }

// mergeSortedArrays([1, 2, 3, 4, 5], [2, 4, 2, 6]);

//TASK S
// function missingNum(a: number[]) {
//   const result = [];
//   for (let i = 1; i < Math.max(...a); i++) {
//     if (a.indexOf(i) === -1) {
//       result.push(i);
//     }
//   }
//   console.log(`'${result}'`);
// }

// missingNum([3, 0, 1, 5]);

//TASK R
// function calculate(a: string) {
//   console.log(eval(a));
// }
// calculate("1 + 40");

// TASK Q
// function hasProperty(a: object, b: string) {
//   const result = Object.keys(a).some((keys) => keys === b);
//   console.log(result);
// }
// hasProperty({ name: "BMW", model: "M3" }, "model");
// hasProperty({ name: "BMW", model: "M3" }, "M3");

// TASK P
// function objectToArray(a: object) {
//   const result = Object.entries(a);
//   console.log(result);
// }
// objectToArray({ g: 10, r: 200 });

//TASK O
// function calculateSumOfNumbers(a: any[]) {
//   const result = a.reduce(
//     (sum, value) => (typeof value === "number" ? sum + value : sum),
//     0
//   );

//   console.log(result);
// }
// calculateSumOfNumbers([10, "10", { son: 10 }, false, 15]);

//TASK N
// function palindromCheck(a: string) {
//   // const result = a.split("").reverse();
//   const result = a.split("").reverse().join("");
//   if (result == a) {
//     console.log(true);
//   } else {
//     console.log(false);
//   }
// }

// // console.log(result);
// palindromCheck("son");

//TASK M
// function getSquareNumbers(a: number[]) {
//   let results: { [a: number]: number } = {};

//   for (let i = 0; i < a.length; i++) {
//     results[a[i]] = a[i] * a[i];
//   }

//   console.log(results);
// }

// getSquareNumbers([1, 2, 3]);

//TASK
// function getSquareNumbers(a: number[]) {
//   const result = a.map((a) => a * a) ;
//   console.log(result);
// }

// getSquareNumbers([1, 2, 3, 5]);

//TASK L
// function reverseSentence(a: string) {
//   const result = a.split("").reverse().join("");
//   const result2 = result.split(" ").reverse().join(" ");
//   console.log(result2);
// }

// reverseSentence("We like coding");

//TASK G
// function getHighestIndex(a) {
//   // return Math.max(...a);
//   const maxValue = Math.max(...a);
//   const maxIndex = a.indexOf(maxValue);
//   console.log(
//     `Bu ${maxValue} soni arraynig tarkibidagi birinchi eng katta son hisobladi va bizga uning indeksi ${maxIndex} qaytadi`
//   );
// }
// getHighestIndex([40, 24, 15]);

// import { log } from "console";

//TASK H
// function getPositive(a: number[]) {
//   let result = a
//     .filter((eleEle) => {
//       return eleEle > 0;
//     })
//     .join("");

//   console.log(result);
//   console.log(typeof result);
//   // console.log(`"${result}"`);
// }
// getPositive([1, -4, -30, 2]);

//TASK H2
// function getDigits(a: string) {
//   const result = a.split("").filter(Number).join("");
//   console.log(typeof result);
//   console.log(result);
// }
// getDigits("a14k139dji");

//TASK I
// function majorityElement(a: number[]) {
//   const count: { [key: number]: number } = {};
//   let maxValue = a[0];
//   let maxCount = 0;
//   for (let num of a) {
//     count[num] = (count[num] || 0) + 1;

//     if (count[num] > maxCount) {
//       maxCount = count[num];
//       maxValue = num;
//     }
//   }
//   console.log(maxValue);
// }

// majorityElement([1, 3, 1, 1, 3, 2, 2, 56]);

//TASK J
// function findLongestWord(a: string) {
//   const words = a.split(" "),
//     result = words.sort((a, b) => b.length - a.length);
//   console.log(result[0]);
// }

// findLongestWord("I come from  Rakhmonovgayratbek");

//TASK K
// function countVowels(string: string) {
//   var counter = 0;
//   for (let i = 0; i < string.length; i++) {
//     if (
//       string[i] == "a" ||
//       string[i] == "e" ||
//       string[i] == "i" ||
//       string[i] == "o" ||
//       string[i] == "u"
//     ) {
//       counter++;
//     }
//   }
//   console.log(`Bu so'zimizni ichida ${counter} ta unli harf bor`);
// }

// countVowels("strinaag");

//TASK T
// function mergeSortedArrays(a: number[], b: number[]) {
//   const result = [...a, ...b];

//   console.log(result);
// }

// mergeSortedArrays([1, 2, 3, 4, 5], [2, 4, 2, 6]);
