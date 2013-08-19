//var PageType =(function(){
var type = new function(){};
type.prototype = {
CATALOGUE : "CATALOGUE",
BOYE : "BODY",
NODE : "NODE"
}
//return type;
//})();
exports.PageType = type;
//var PageContent = (function(){
var content = new function(){};
content.prototype = {
  BLACKS : "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
  MsoPlainText : 'class="MsoPlainText" style="TEXT-INDENT: 27pt"',
  MsoPlainText2 : 'class="MsoPlainText" style="TEXT-INDENT: 21pt; mso-char-indent-count: 2.0"',
  spacerun : '<span style="mso-spacerun: yes">&nbsp;</span>'
}
//    return content;
//});
exports.PageContent = content;
