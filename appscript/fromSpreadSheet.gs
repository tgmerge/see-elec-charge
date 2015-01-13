/* get object, remove unnecessery props, return [_dycols, sorteddata]*/
function getDyGraphArr(data) {
    var result = [];
    for (var i_data in data) {
        var newItem = [];
        for (var i_cols in _dyCols) {
            var key = _dyCols[i_cols];
            var value = data[i_data][key] || null;
            if (value) {
                newItem.push(_dyColsFunc[i_cols](value));
            }
        }
        if (newItem.length == _dyCols.length) {
            result.push(newItem);
        }
    }

    return [_dyCols, result];
}


// from, to: timestamp(js)
function getDataFromSheetByTime(from, to) {
    from = from || 0;
    to = to || (new Date()).valueOf();
    var fromPos = searchTimeInSheet(from);
    var toPos = searchTimeInSheet(to, fromPos);

    var sheetData = _sheet.getRange(fromPos, 1, toPos - fromPos + 1, 1).getValues();
    sheetData = transpose(sheetData)[0];

    var data = [];
    for (var i in sheetData) {
        data.push(JSON.parse(sheetData[i]));
    }
    return data;
}


// search timestamp in sheet, return its row number
// if not found, return the cell having max timestamp less than searchvalue
function searchTimeInSheet(timestamp, minIndex) {
    minIndex = minIndex || 1;
    var maxIndex = _sheet.getLastRow();
    var currentIndex;
    var currentElement;
    var searchElement = timestamp;

    while (minIndex <= maxIndex) {
        currentIndex = (minIndex + maxIndex) / 2 | 0;
        currentElement = getTimeFromSheet(currentIndex);
        if (currentElement < searchElement) {
            minIndex = currentIndex + 1;
        } else if (currentElement > searchElement) {
            maxIndex = currentIndex - 1;
        } else {
            return currentIndex;
        }
    }
    return maxIndex === 0 && 1 || maxIndex;
}


// get time by specified sheet and row index
// (python time -> js time)
function getTimeFromSheet(index) {
    var str = _sheet.getRange(index, 1, 1, 1).getValue();
    var data = JSON.parse(str);
    return Number(data['timestamp']) * 1000;
}


// 2-d array transpositon
function transpose(a) {
    return Object.keys(a[0]).map(function(c) {
        return a.map(function(r) {
            return r[c];
        });
    });
}
