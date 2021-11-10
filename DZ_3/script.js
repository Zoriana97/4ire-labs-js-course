function filterBy(array, dataType) {
    let filteredArr = [];
    for(let i = 0; i < array.length; i++) {
        if(typeof array[i] !== dataType) {
            filteredArr.push(array[i]);       
        }
    }
    return filteredArr;
}

let dataType;

const arrdataTypes = ['number', 'string', 'boolean', 'bigint', 'object', 'function', 'undefined', 'symbol', 'null'];

const arrToFilter = ['hello', false, 'world', undefined, 23, true, '23', null, 'hello', function(){}, 10n, [1, 200], {name: 'Zoriana'}, Symbol(6)];

while(true) {
    dataType = prompt(`Enter one of JS data type: ${arrdataTypes}`);

    if(dataType === null) {
        break;
    }

    if(!arrdataTypes.includes(dataType)) {
        alert('Incorrect type of data');
        continue;
    }

    const filteredArr = filterBy(arrToFilter, dataType);

    console.log(`Data type: ${dataType} \nFiltered array:`);

    console.log(filteredArr);

    alert(`Your result is logged in console`);

    if(!confirm('Do you want to try again?')) {
        break;
    }
}


