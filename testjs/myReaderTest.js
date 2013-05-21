var  filePath = "../data/",
     myFile = require("../myLib/jsFile.js").jsFile,
     fs = require("fs");
var MyReader = require("../myCode/myReader.js").MyReader,
     myReader = new MyReader();
    // myFile =  new MyFile();

//var allDFs = ;
var test1 = function(){
var files = myFile.getAllFoldersAndFiles(filePath).files;
for(var idx in files){
    console.log(files[idx]);
    var file = fs.readFileSync(files[idx]);
    //console.log(file.toString());
    myReader.read(file.toString());
}
}
var test2 = function(){
    //../data//http/www.npc.gov.cn/npc/flsyywd/xianfa/2010-04/14/content_1567091.htm
    //../data//http/www.npc.gov.cn/npc/flsyywd/xianfa/2002-07/11/content_297478.htm
    //../data//http/www.npc.gov.cn/npc/flsyywd/xianfa/2001-08/01/content_140411.htm
    //../data//http/www.npc.gov.cn/npc/flsyywd/xianfa/2000-11/29/content_8461.htm
    //../data//http/www.npc.gov.cn/npc/flsyywd/xianfa/2000-10/20/content_8435.htm
var fileP = "../data//http/www.npc.gov.cn/npc/flsyywd/xianfa/node_2165.htm";
var file = fs.readFileSync(fileP);
myReader.read(file.toString());
}
test1();

