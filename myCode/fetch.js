/**
 * Created with IntelliJ IDEA.
 * User: Acer
 * Date: 12-11-18
 * Time: 下午2:51
 * To change this template use File | Settings | File Templates.
 */


var Crawler = require("node-simplecrawler");
var fs =require("fs");
var myFile = require("../myLib/jsFile.js").jsFile;
//var MyReader = require("./myReader.js");
var myCrawler = new Crawler();
//var myReader = new MyReader();
//Nonstandard port? HTTPS? Want to start archiving a specific path? No problem:
myCrawler.host = "www.npc.gov.cn";
myCrawler.initialPath = "/";
myCrawler.initialPort = 80;
myCrawler.initialProtocol = "http";
myCrawler.downloadUnsupported= false;
myCrawler.scanSubdomains=true;
myCrawler.stripWWWDomain = true;
var parentPath="../data/";

myCrawler.on("fetchcomplete",function(queueItem, responseBuffer, response){
    var fileUrl=queueItem.url.replace(/:/,"/");
    //console.log("fetch" +fileUrl);
   if(count>=1) writeFile(fileUrl,responseBuffer);
    //if(count>2)myReader.read(responseBuffer.toString());
});

myCrawler.on("queueadd", function(queueItem){
    if(!isNeeded(queueItem.url)) myCrawler.queue.pop()  ;
    else console.log(queueItem.url);
});
var count= 0;
var isNeeded = function(url){
    var htmlUrl = /npc.gov.cn\/npc/;
    switch (count){
        case 0:
            if(htmlUrl.test(url)){count =1;
            }
            break;
        case 1:
            htmlUrl = /npc.gov.cn\/npc\/flsyywd/;
            if(htmlUrl.test(url)){count =2;}
            break;

        case 2:
            htmlUrl = /npc.gov.cn\/npc\/flsyywd/;
            //if(htmlUrl.test(url)){count =2;}
            break;
        /*
        case 3:
            htmlUrl = /npc.gov.cn\/npc\/flsyywd\/xianfa/;
            break;
            */
    }

   // var htmlUrl = /npc.gov.cn\/npc\/flsyywd\/xianfa/;

    //console.log(htmlUrl.test(url)+" "+url);
    return htmlUrl.test(url)&&isHtml(url);

}

var isHtml = function(url){
    var htmlReg = /htm$/;
    return htmlReg.test(url);
};

var writeFile = function(fileUrl,responseBuffer){
    var filePath=parentPath+"/"+fileUrl.substr(0,fileUrl.lastIndexOf("/"));
    var fileName=fileUrl.substr(fileUrl.lastIndexOf("/"));
    if(!fs.exists(filePath)){
        myFile.mkdirSync(filePath, function(err) {
            if (err)
                return console.log(err);
        });
    }
    fs.writeFile(filePath+"/"+fileName,responseBuffer);
    console.log("writefile: "+filePath+"/"+fileName);
}

myCrawler.start();



