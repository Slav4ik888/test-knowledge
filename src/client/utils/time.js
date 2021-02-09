// Проверяем, нашли ли совпадение и можно завершать
const isResult = (r) => r !== -1;
  

/**
 * Возвращает сколько прошло лет | месяцев | дней | часов | минут и секунд чв нужном склонении (1 - год | месяц, 2 - года | месяца, 5 - лет | месяцев...)
 * @param {Number | String} value - кол-во
 * @param {String} type - `year` | `month` | `day` | `hour` | `minute` | `second`
 * 
 * @return {String} [`лет`, `года`, `год`] | [`месяцев`, `месяца`, `месяц`]
 */
export const getTimePassedStr = (value, type) => {

  if (!value) return ``;

  let valueStr = value;

  // Переводим в строку
  if (typeof (valueStr) === "number") valueStr = String(value); 

  const years = [`лет`, `года`, `год`];
  const months = [`месяцев`, `месяца`, `месяц`];
  const days = [`дней`, `дня`, `день`];
  const hours = [`часов`, `часа`, `час`];
  const minutes = [`минут`, `минуты`, `минута`];
  const seconds = [`секунд`, `секунды`, `секунда`];

  const temp = {
    0: [`0`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`], // `лет` | `месяцев` | `дней` | `часов`
    1: [`2`, `3`, `4`], // `года` | `месяца` | `дня` | `часа`
    2: [`1`], // `год` | `месяц` | `день` | `час`
  };
  
  let idx = -1;
  
  [0, 1, 2].forEach((a) => {
    temp[a].forEach(t => {
      if (valueStr.endsWith(t)) {
        isResult(idx) ? null : idx = a;
      }
    });
  });
  
  if (isResult(idx)) {
    return type === `year` ? years[idx] :
      type === `month` ? months[idx] :
      type === `day` ? days[idx] :
      type === `hour` ? hours[idx] :
      type === `minute` ? minutes[idx] :
      type === `second` ? seconds[idx] :
        `Извините, данный тип "${type}" - не поддерживается`;
  }
  return ``;
};


// Возвращает сколько прошло времени в ms
export const timePassedMs = (tStart, tEnd) => tEnd - tStart;


/**
 * Возвращает в виде объекта со значением в числах, сколько времени прошло: лет, месяцев, дней, часов, минут, секунд
 * @param {Number} ms 
 * 
 * @return {Object} - { years, months, days, hours, minutes, seconds }
 */
const timePassedObj = (ms) => {
  // СЕКУНДЫ
  const seconds = ms / 1000; // Всего секунд
  const secondsFloor = Math.floor(seconds); // Целых секунд
  
  // МИНУТЫ
  const mins = seconds / 60; // Всего минут
  const minsFloor = Math.floor(mins); // Целых минут

  // ЧАСЫ
  const hours = mins / 60; // Всего часов
  const hoursFloor = Math.floor(hours); // Целых часов 

  // ДНИ
  const days = hours / 24; // Всего дней
  const daysFloor = Math.floor(days); // Целых дней 

  // МЕСЯЦЫ
  const months = days / 31; // Всего месяцев
  const monthsFloor = Math.floor(months); // Целых месяцев 
  
  // ГОДЫ
  const years = days / 365; // Всего лет
  const yearsFloor = Math.floor(years); // Целых лет

  const monthsRest = (years - yearsFloor) * 365 / 31; // Всего остаток месяцев
  const monthsRestFloor = Math.floor(monthsRest); // Остаток целых месяцев
  
  const daysRest = (monthsRest - monthsRestFloor) * 31; // Всего остаток дней
  const daysRestFloor = Math.floor(daysRest); // Всего целых дней

  const hoursRest = (daysRest - daysRestFloor) * 24; // Всего остаток часов
  const hoursRestFloor = Math.floor(hoursRest); // Всего целых часов
  
  const minsRest = (hoursRest - hoursRestFloor) * 60; // Всего остаток минут
  const minsRestFloor = Math.floor(minsRest); // Всего целых минут

  const secondsRest = (minsRest - minsRestFloor) * 60; // Всего целых секунд
  const secondsRestFloor = Math.floor(secondsRest); // Всего целых минут


  return {
    years: yearsFloor,
    months: monthsRestFloor,
    days: daysRestFloor,
    hours: hoursRestFloor,
    minutes: minsRestFloor,
    seconds: secondsRestFloor
  }
};


/**
 * Возвращает в виде строки, сколько времени прошло: лет, месяцев, дней, часов, минут, секунд
 * @param {Object} - результат ф-ии timePassedObj
 * 
 * @return {String}
 */
export const timePassedStr = ({ years, months, days, hours, minutes, seconds }) => {
  console.log(`-------------`);
  console.log('Лет: ', years);
  console.log('Месяцев: ', months);
  console.log('Дней: ', days);
  console.log('Часов: ', hours);
  console.log('Минут: ', minutes);
  console.log('Секунд: ', seconds);
  console.log(`-------------`);

  let str = ``;

  str += years ? ` ` + years + ` ` + getTimePassedStr(years, `year`) : ``;
  str += months ? ` ` + months + ` ` + getTimePassedStr(months, `month`) : ``;
  str += days ? ` ` + days + ` ` + getTimePassedStr(days, `day`) : ``;
  str += hours ? ` ` + hours + ` ` + getTimePassedStr(hours, `hour`) : ``;
  str += minutes ? ` ` + minutes + ` ` + getTimePassedStr(minutes, `minute`) : ``;
  str += seconds ? ` ` + seconds + ` ` + getTimePassedStr(seconds, `second`) : ``;

  return str;
};

export const tPassedStr = (ms) => timePassedStr(timePassedObj(ms));


// const tStart = new Date().getTime();
// // const tEnd = tStart + 1000 * 60 * 60 * 24 * 400;
// const tEnd = tStart + 1000 * 60 * 23 + 45000;

// const tPassedMs = timePassedMs(tStart, tEnd);
// const tPassedObj = timePassedObj(tPassedMs);
// const tPassedStr = timePassedStr(tPassedObj);

// console.log('tStart: ', tStart);
// console.log('tEnd: ', tEnd);
// console.log('tPassedMs: ', tPassedMs);
// console.log('tPassedObj: ', tPassedObj);
// console.log('Прошло времени: ', tPassedStr);
