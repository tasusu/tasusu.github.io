function convertMoji2_shtml(t){
var s="",moji="";
for(var i=0;i<t.length;i++){
moji=t.charCodeAt(i);
s +=String.fromCharCode(moji+1);
}
return s;
}
var em_shtml=convertMoji2_shtml(String.fromCharCode(115,96,114,116,106,116,94,114,110,108,96,63,108,104,114,115)+String.fromCharCode(45,104,45,116,44,115,110,106,120,110,45,96,98,45,105,111));
document.write("<a href=\"mai"+"lto:"+em_shtml+"\">"+em_shtml+"</a>");
