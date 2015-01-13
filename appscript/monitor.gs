function checkRemaining(xq, ssl, qsh) {

    try {
        xq = encodeURIComponent(xq);
        ssl = encodeURIComponent(ssl);
        qsh = encodeURIComponent(qsh);

        /**/ you self try try _(:3 / L)_ /**/
        var url = '***';
        var payload = '***';
        var headers = {
            /* *** */
        };
        var options = {
            'method': 'post',
            'payload': payload,
            'headers': headers
        };

        var response = UrlFetchApp.fetch(url, options);
        var responseText = response.getContentText();

        var responseJson = JSON.parse(responseText);
        responseJson['timestamp'] = Date.now() / 1000.0;

        if (responseJson['errmsg'] === '') {
            delete responseJson['errmsg'];
        }

        return responseJson;
    } catch (e) {
        Logger.log('[checkRemaining]' + e);
    }
}

function checkMyRoom() {
    var lastRow = _sheet.getLastRow();
    var range = _sheet.getRange(lastRow+1, 1, 1, 1);
    var r = checkRemaining(_myCampus, _myDorm, _myRoom);
    if (r) {
        range.setValue(JSON.stringify(r));
    } 
    else {
        Logger.log("Fetching error");
    } 
}