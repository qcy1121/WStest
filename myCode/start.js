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
var myCrawler = new Crawler();
//Nonstandard port? HTTPS? Want to start archiving a specific path? No problem:
myCrawler.host = "law.npc.gov.cn";
myCrawler.initialPath = "/";
myCrawler.initialPort = 80;
myCrawler.initialProtocol = "http";
myCrawler.downloadUnsupported= false;
myCrawler.scanSubdomains
var parentPath="data/";
//var queue= myCrawler.queue;
//caoliuhost http://cl.tedx.ee/index.php
//bobo host xx446.com
//or
//var myCrawler2 = new Crawler("news.baidu.com","/archive",80);
//And of course, you're probably wanting to ensure you don't take down your webserver. Decrease the concurrency from
// five simultaneous requests - and increase the request interval from the default 250ms like this:
myCrawler.on("fetchcomplete",function(queueItem, responseBuffer, response){
    var fileUrl=queueItem.url.replace(/:/,"/");
    console.log("fetch" +fileUrl);
   // if(isHtml(fileUrl)){
     if(fileUrl){   fileUrl =fileUrl.replace(/\/{2,3}/i,"/");


        var filePath=parentPath+"/"+fileUrl.substr(0,fileUrl.lastIndexOf("/"));
        var fileName=fileUrl.substr(fileUrl.lastIndexOf("/"));
        if(!fs.exists(filePath)){
            myFile.mkdirSync(filePath, function(err) {
                if (err)
                    return console.log(err);
            });
        }
        fs.writeFile(filePath+"/"+fileName,responseBuffer);
    }
});

myCrawler.on("queueadd", function(queueItem){
    if(!isNeeded(queueItem.url)) myCrawler.queue.pop()  ;
});
var isNeeded = function(url){
    return isHtml(url)||(1==2) ;

}

var isHtml = function(url){
    var htmlReg = /html$/;
    return htmlReg.test(url);
};

myCrawler.start();



