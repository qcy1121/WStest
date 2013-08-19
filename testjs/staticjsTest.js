var staticjs = require("../myCode/staticjs.js"),
    pageContent = staticjs.PageContent,
    pageType = staticjs.PageType;

for( var idx in pageContent){

    console.log(idx +" mapping : "+pageContent[idx]);
    console.log("pageContent test end");
}

for(var idx in pageType){
    console.log("pageType test start");
    console.log(idx +" mapping : "+pageType[idx]);
    console.log("pageType test end");
}


