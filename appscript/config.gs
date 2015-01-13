var _sheetId = '*** your SpreadSheet id ***';
var _sheet = SpreadsheetApp.openById(_sheetId).getSheets()[0];

var _dyCols = ['timestamp', 'yffye'];
var _dyColsFunc = [function(x) {
    return Number(x) * 1000;
}, function(x) {
    return Number(x);
}];

var _myCampus = '*** your campus ***';
var _myDorm = '*** your dorm ***';
var _myRoom = '*** your room ***';
