
function getRandomValue(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function getRandomArr(minLength, maxLength, minValue, maxValue) {
    const length = getRandomValue(minLength, maxLength);
    const arr = [];

    for(let i = 0; i < length; i++) {
        arr.push(getRandomValue(minValue, maxValue));
    }

    return arr;
}

function getRandomPowerLines(minLength, maxLength, minPower, maxPower, minPrice, maxPrice) {
    const length = getRandomValue(minLength, maxLength);
    const arr = [];

    for(let i = 0; i < length; i++) {
        arr.push({
            power: getRandomValue(minPower, maxPower),
            price: getRandomValue(minPrice, maxPrice)
        });
    }

    return arr;
}

function kilowattToMegawatt(klwValue) {
    return klwValue / 1000;
}

function getArrSum(arr) {
    return arr.reduce((sum, value) => (sum + value), 0);
}

function calculateResult(powerStationsMgwArr, solarPanelsMgwArr, housesArr, flatConsumeMgw, powerLinesArr) {
    const cityProductionMgw = getArrSum(powerStationsMgwArr) + getArrSum(solarPanelsMgwArr);
    const cityConsumeMgw = getArrSum(housesArr) * flatConsumeMgw;
    const needMgw = cityProductionMgw - cityConsumeMgw;
    const result = {
        needMgw,
        leftoverMgw: 0,
        money: 0
    };

    if(needMgw === 0) {
        return result;
    } 

    const shouldBuy = needMgw < 0;

    const sortedPowerLinesArr = powerLinesArr.slice();

    // if buy power, start from the cheapest lines. Otherwise start from more expensive lines
    if(shouldBuy) {
        sortedPowerLinesArr.sort((a, b) => {
            return a.price - b.price > 0 ? 1 : -1;
        });
    } else {
        sortedPowerLinesArr.sort((a, b) => {
            return a.price - b.price > 0 ? -1 : 1;
        });
    }
    
    let needAbsMgw = Math.abs(needMgw);

    for(let i = 0; i < sortedPowerLinesArr.length; i++) {
        const powerLine = sortedPowerLinesArr[i];
        const powerToBuyMgw = needAbsMgw > powerLine.power ? powerLine.power : needAbsMgw;

        result.money += powerToBuyMgw * powerLine.price;

        needAbsMgw -= powerToBuyMgw;

        if(needAbsMgw === 0) {
            break;
        }
    }

    result.leftoverMgw = needAbsMgw;

    return result;
}

function printResult(result) {
    if(result.needMgw > 0) {
        console.log('City produce enough power for itself and could sell it');
        console.log(`Power to sell: ${result.needMgw.toFixed(2)} Megawatts`);
        console.log(`Money profit: ${result.money.toFixed(2)}$`);
        console.log(`Leftower power: ${result.leftoverMgw.toFixed(2)} Megawatts`);
    } else if(result.needMgw < 0) {
        console.log('City produce not enough power for itself and must buy it');
        console.log(`Power to buy: ${result.needMgw.toFixed(2)} Megawatts`);
        console.log(`Money for power purchase: ${result.money.toFixed(2)}$`);
        console.log(`Not able to buy: ${result.leftoverMgw.toFixed(2)} Megawatts`);
    } else {
        console.log('City produces enough power only for itself. Nothing to sell');
    }
}   

const powerStationsMgwArr = getRandomArr(1, 5, 1, 100);

const solarPanelsMgwArr = getRandomArr(1, 10, 1, 5);

const housesArr = getRandomArr(5, 20, 1, 400);

const flatConsumeDayMgw = kilowattToMegawatt(4);

const flatConsumeNightMgw = kilowattToMegawatt(1);

const powerLinesArr = getRandomPowerLines(1, 1, 10, 30, 1, 20, 50);

const resultDay = calculateResult(powerStationsMgwArr, solarPanelsMgwArr, housesArr, flatConsumeDayMgw, powerLinesArr);

const resultNight = calculateResult(powerStationsMgwArr, [], housesArr, flatConsumeNightMgw, powerLinesArr);


console.log(`Power Stations number: ${powerStationsMgwArr.length}`);
console.log(`Power Stations Megawatts: ${powerStationsMgwArr}`);
console.log(`Solar Panels number: ${solarPanelsMgwArr.length}`);
console.log(`Solar Panels Megawatts: ${solarPanelsMgwArr}`);
console.log(`Houses number: ${housesArr.length}`);
console.log(`Flat numbers: ${housesArr}`);

console.log('------------------ Day result ------------------');
printResult(resultDay);

console.log('------------------ Night result ------------------');
printResult(resultNight);
