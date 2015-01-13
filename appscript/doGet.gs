function doGet(request) {
    Logger.log(request);
    switch (request && request.parameter['type'] || null) {

        // type=timedata, from=(timestamp), to=(timestamp)
        case 'timedata':
            var from = request.parameter['from'];
            var to = request.parameter['to'];
            return ContentService
                .createTextOutput(JSON.stringify(getDataFromSheetByTime(from, to)))
                .setMimeType(ContentService.MimeType.JSON);

        // type=timedyarr, from=(timestamp), to=(timestamp)
        case 'timedyarr':
            var from = request.parameter['from'];
            var to = request.parameter['to'];
            return ContentService
                .createTextOutput(JSON.stringify(getDyGraphArr(getDataFromSheetByTime(from, to))))
                .setMimeType(ContentService.MimeType.JSON);

        default:
            return HtmlService
                .createHtmlOutputFromFile('hello');
    }
}
