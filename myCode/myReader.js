// Print all of the news items on hackernews
var jsdom = require("jsdom");
var fs = require("fs");
var jquery = fs.readFileSync("lib/jquery-1.9.1.js").toString();

var MyReader = function () {


};

module.exports = MyReader;

MyReader.prototype.read= function(html){
    jsdom.env({
        html: html,
        src: [jquery],
        //scripts: ["http://code.jquery.com/jquery.js"],
        done: function (errors, window) {
            var $ = window.$;
            console.log("HN Links");
            if ($("#morebg")) {
                var content = $("#morebg");
                 //var content = window.document.getElementById("morebg");
                console.log(content+"  "+content.text());
            }

        }
    });
}