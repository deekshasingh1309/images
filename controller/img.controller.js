var fs = require('fs');
var Image = require('../model/img.model');

exports.busboy = (req, res) => {
    console.log("uupload");
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);

        //Path where image will be uploaded
        fstream = fs.createWriteStream('./pictures/' + filename); 
        file.pipe(fstream);
        fstream.on('close', function () {
            console.log("Upload Finished of " + filename);
            var image = new Image();

            image.fileName = filename;
            image.url = './pictures/' + filename;

            image.save(function (err) {
                if (err) {
                    res.json(err);
                }
                res.json({
                    success: true,
                    path: image.url,
                    fileName: image.fileName
                })
            });
        });
    });
}

exports.baseUpload = (req, res) => {
    var base64Data = req.body.image.replace(/^data:image\/(?:jpeg|jpg|JPEG|JPG|png|PNG);base64,/, "");
    var filename = Math.random().toString(36).substring(7);
    let lowerCaseData = base64Data.toLowerCase()
    let extension;
    //write logic of finding extension from base64 string.
    console.log(lowerCaseData)
    if(lowerCaseData.indexOf('jpg') !== -1){
        extension = '.jpg'
    }

    if(lowerCaseData.indexOf('png') !== -1){
        extension = '.png'
    }

    if(lowerCaseData.indexOf('jpeg') !== -1){
        extension = '.jpeg'
    }
    fs.writeFile("./pictures/" + filename + extension, base64Data, 'base64', function (err) {
        if (err) {
            console.log(err);
        }
        var image = new Image();

        image.fileName = filename;
        image.url = './pictures/' + filename + extension;

        image.save(function (err) {
            if (err) {
                res.json(err);
            }
            res.json({
                success: true,
                path: image.url,
                fileName: image.fileName +extension
            })
        });
    });
}