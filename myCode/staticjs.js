//var PageType =(function(){
var type = new Object();
//type.prototype = {
type.CATALOGUE = "CATALOGUE";
type.BOYE = "BODY";
//}
//return type;
//})();
exports.PageType = type;
//var PageContent = (function(){
var content = new Object();
content.BLACKS = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
content.MsoPlainText = 'class="MsoPlainText" style="TEXT-INDENT: 27pt"';
content.MsoPlainText2 = 'class="MsoPlainText" style="TEXT-INDENT: 21pt; mso-char-indent-count: 2.0"';
content.spacerun = '<span style="mso-spacerun: yes">&nbsp;</span>';

//    return content;
//});
exports.PageContent = content;
