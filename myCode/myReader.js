// Print all of the news items on hackernews
var jsdom = require("jsdom");
var fs = require("fs"),
    jquery = fs.readFileSync("../lib/jquery-1.9.1.js").toString(),
    MyPage = require("./moudule/page.js").MyPage,
    staticjs = require("./staticjs.js"),
    cheerio = require('cheerio'),
    pageType = staticjs.PageType;

var MyReader = function () {


};
var isNode = function (fileName) {
    var nodeReg = /\/node_\d+.htm/;
    return nodeReg.test(fileName);
}
MyReader.prototype.readNode = function (fileUrl,  $) {
    var page = new MyPage();
    page.title = $("div_topline").context;
    page.type = pageType.NODE;

    var as = $("a");
    for(var i=0;i<as.length;i++){
        var a = as[i];
        console.log(a.textContent+"  "+a.href);
    }
}
MyReader.prototype.readContent = function(fileUrl,$){
    var type;//,page = new MyPage();
    if ($("#morebg").length) {
        type = staticjs.PageType.BODY;
        //$("p.MsoPlainText").css("TEXT-INDENT","0pt");
        //var body = $("#pgcontent").html();
        //var body = $("#morebg").html();
        //var pageContent = staticjs.PageContent;
        //for (var idx in pageContent) {
        //    var reg = new RegExp(pageContent[idx], "gm");
        //    //"test".replace
        //    body = body.replace(reg, "");
        //}

        this.readMorebg($);
       // console.log(body);
    } else if ($("span.div_text").length) {
        console.log($("span.div_text").html());
        type = staticjs.PageType.CATALOGUE;
        //readDivText()
        if ($("div.page_lie").length) {
            readDivPageLie($("div.page_lie"));
        }
    }else


    //目录


    // 正文
    if ($("#pgcontent").length) {
        this.readPgcontent($("#pgcontent"));
    } else {

        console.log("no");
    }


    // });




    var readDivPageLie = function (body) {
        var content = body.get(0);
    }

    var readDivText = function (body) {


    }
}

MyReader.prototype.read = function (fileUrl, file ){
    var reader = this;
    jsdom.env({
        html: file,
        src: [jquery],
        //scripts: ["http://code.jquery.com/jquery.js"],
        done: function (errors, window) {
            var $ = window.$;
            if (isNode(fileUrl)) {
                reader.readNode(fileUrl,$);
            } else {
                console.log("fileUrl: " + fileUrl);
                reader.readContent(fileUrl,$);
            }
        }
    });
}

MyReader.prototype.readMorebg=function($){

    var info = $("#morebg.info"),title = $("#morebg.tit");
    console.log("title"+this.readTitle(title));
    console.log("info:" +this.readInfo(info));
    var body = $("#pgcontent");
    if(body.length){
        this.readPgcontentInMoreBg(body);
    }

}
MyReader.prototype.readPgcontentInMoreBg = function(body){
    //body.remove(".source");
    //body.remove(".editor");
    body.contents().filter(function() {
        return this.nodeType == 3;
    }).wrap('<p></p>').end().filter('br').remove();
    console.log(body.html());
    body.children(function(child){
        //if(!child)
        if(child.tagName=="P" ){
            console.log(child.textContent);
        }else if(child.tagName =="BR"){
            var newChild = children[i-1];






            if(newChild)
            console.log(children[i-1].textContent);
        }else{
            console.log(child.tagName+"   "+child._nodeName);
        }
        //console.log(child.tagName+" : "+child.textContent);
    })
   // body.remove();
}
MyReader.prototype.readPgcontent = function(body){
    var content = body.get(0);
    var array = content.children;
    var start = /各位代表：/ig, end = /　　来源/ig;
    var endContent;

    var tmp = array.shift().textContent;
    if (!start.test(tmp)) {
        console.log(tmp);
    }
    tmp = array.pop().textContent;
    if (!end.test(tmp)) {
        var arr = tmp.split("　");
        console.log(arr[2] + "aaa" + arr[3]);
    } else {
        endContent = tmp;
    }
    for (var i = 0; i < array.length; i++) {

        var p = array[i], t;
        t = p.textContent ? p.textContent : p.outerHTML;
        console.log(t);
    }
    if (endContent)console.log(endContent);
}
MyReader.prototype.readTitle = function(body){
    if(body.length<1)return;
    return body.textContent;
}
MyReader.prototype.readInfo = function(body){
    if(body.length<1)return;
    var dateReg = /日期:[\d\w]+浏览/;
    var matches = body.textContent.match(dateReg),res;
    if(matches){
        res = matches[0];
       // body.remove();
    }

return res;
}
/*MyReader.prototype.read = function(html){
 var $ = cheerio.load(html),
 type,page = new MyPage();
 if($("#morebg")){
 //        type = staticjs.pageType.BODY;
 var tt =$("#pgcontent").html().
 $("#pgcontent").html(tt.replaceAll("TEXT-INDENT: 27pt;",""));
 console.log("body "+ $("#pgcontent").text());
 }else if($("span.div_text")){
 //  type = staticjs.pageType.CATALOGUE;
 console.log("tiltle "+ $("span.div_text").text());
 }

 }*/


exports.MyReader = MyReader;