var fs = require("fs"),
    http = require("http"),
    port = 3333;

// Adatok írása a JSON fájlba.
function writeJson(fileName, data) {
    fs.writeFile(fileName, data, function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });
}

// Url feldolgozása.
function processUrl(url) {
    if (url.charAt(0) === "/")
        url = url.substr(1);
    return url.split("/");
}

// Get kérések kezelése.
function handleGetRequest(request, result) {
    if (request.url.indexOf("favicon") > -1) {
        return result.end("Hello");
    }

    // Url feldolgozása.
    var url = processUrl(request.url);
    console.log(url);
    if (url.length < 2) {
        return result.end("Invalid url.");
    }
    var model = url[0],
        id = url[1];

    // Beolvassuk a modellt.
    var modelJson = fs.readFileSync(model + '.json', 'utf8');

    // Összes adat visszaadása.
    if (id == "all") {
        writeResult(result, modelJson);
        return;
    }

    // Megkeressük a usert az id alapján.
    modelJson = JSON.parse(modelJson);
    var user = {};
    for (var k in modelJson) {
        if (modelJson[k].id == id)
            user = modelJson[k];
    }

    // Visszaadjuk a kért adatokat.
    writeResult(result, JSON.stringify(user));

}

// Új adat beszúrása a modelbe.
function handlePutRequest(request, result) {

    var body = '';

    request.on('data', function (data) {
        body += data;
    });

    request.on('end', function () {

        body = JSON.parse(body);

        // Url feldolgozása és fájl lekérése.
        var url = processUrl(request.url),
            model = url[0],
            modelJson = fs.readFileSync(model + '.json', 'utf8');

        // Beszújruk az új sort a fájl végére.
        modelJson = JSON.parse(modelJson);
        var lastId = 0;
        if (modelJson.length > 0) {
            lastId = modelJson[modelJson.length - 1].id;
        }
        body.id = parseInt(lastId, 10) + 1;
        modelJson.push(body);

        // Fájl visszaírása a merevlemezre.
        writeJson(model + '.json', JSON.stringify(modelJson));

        // Visszaadjuk a kért adatokat.
        writeResult(result, JSON.stringify(body));

    });

}

// Adatok frissítése.
function handlePostRequest(request, result) {

    var body = '';

    request.on('data', function (data) {
        body += data;
    });

    request.on('end', function () {

        body = JSON.parse(body);

        // Url feldolgozása és fájl lekérése.
        var url = processUrl(request.url),
            model = url[0],
            modelJson = fs.readFileSync(model + '.json', 'utf8');

        // Beszújruk az új sort a fájl végére.
        modelJson = JSON.parse(modelJson);
        for (var k in modelJson) {
            if (modelJson[k].id == body.id)
                modelJson[k] = body;
        }

        // Fájl visszaírása a merevlemezre.
        writeJson(model + '.json', JSON.stringify(modelJson));

        // Visszaadjuk a kért adatokat.
        writeResult(result, JSON.stringify(body));

    });

}

// Adatok törlése.
function handleDeleteRequest(request, result) {

    // Url feldolgozása és fájl lekérése.
    var url = processUrl(request.url),
        model = url[0],
        id = url[1],
        modelJson = fs.readFileSync(model + '.json', 'utf8');

    // Beszújruk az új sort a fájl végére.
    modelJson = JSON.parse(modelJson);
    var index = -1;
    for (var k in modelJson) {
        if (modelJson[k].id == id)
            index = k;
    }

    // Ha találtunk megfelelő elemet, akkor eltávolítjuk a tömbből.
    var message = "";
    if (index !== -1) {
        modelJson.splice(index, 1);
        message = "Deleted: " + index;
    } else {
        message = "No element found.";
    }

    // Fájl visszaírása a merevlemezre.
    writeJson(model + '.json', JSON.stringify(modelJson));

    // Visszaadjuk a kért adatokat.
    writeResult(result, message);

}

// Write result.
function writeResult(result, data) {
    result.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS'
    });
    result.end(data);
}


http.createServer(function (request, result) {

    // Különböző típusú kérések lekezelése.
    switch (request.method.toLowerCase()) {
    case "get":
        handleGetRequest(request, result);
        break;
    case "put":
        handlePutRequest(request, result);
        break;
    case "post":
        handlePostRequest(request, result);
        break;
    case "delete":
        handleDeleteRequest(request, result);
        break;
    default:
        writeResult(result, "A metódus: " + request.method);
        break;
    }

}).listen(port);

console.log("Server listen in 3333 port.");
