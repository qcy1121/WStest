// Print all of the news items on hackernews
var jsdom = require("jsdom");
var fs = require("fs"),
 jquery = fs.readFileSync("../lib/jquery-1.9.1.js").toString(),
  MyPage = require("./moudule/page.js"),
 staticjs = require("./staticjs.js"),
 cheerio = require('cheerio'),
    PageType=staticjs.PageType;

var MyReader = function () {


};

MyReader.prototype.read= function(html){
    jsdom.env({
        html: html,
        src: [jquery],
        //scripts: ["http://code.jquery.com/jquery.js"],
        done: function (errors, window) {
            var $ = window.$;
            setEnv($);
            /*
            //type,page = new MyPage();
            if($("#morebg").html()){
                type = staticjs.PageType.BODY;
                //$("p.MsoPlainText").css("TEXT-INDENT","0pt");
                //var body = $("#pgcontent").html();
                var body = $("#morebg").html();
                var pageContent = staticjs.PageContent;
                for( var idx in pageContent){
                    var reg = new RegExp(pageContent[idx],"gm");
                    //"test".replace
                    body = body.replace(reg,"");
                }

                console.log(body);
            }else if($("span.div_text").html()){
                  type = staticjs.PageType.CATALOGUE;
                console.log( $("span.div_text").html());
            }else
            */
            if($("#pgcontent").html()){
                readPgcontent($("#pgcontent"));
            }

        }
    });
    this.$ ;
    var setEnv= function($){
        this.$ = $;
    }

    var readPgcontent= function(body){
        var $ = this.$;
        var content = body.get(0);
        var array =content.children;
            for(var i in array){
                console.log(array[i].innerHTML);
            }



    }
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