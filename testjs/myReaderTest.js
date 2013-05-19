var  filePath = "../data/",
     myFile = require("../myLib/jsFile.js").jsFile;
     //MyReader = require("../myCode/myReader.js"),
     //myReader = new MyReader(),
    // myFile =  new MyFile();

//var allDFs = ;
var files = myFile.getAllFoldersAndFiles(filePath).files;
for(var idx in files){
    console.log(files[idx].toString());
}



