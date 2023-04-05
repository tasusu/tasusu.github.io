function convertMoji2_shtml(t){
var s="",moji="";
for(var i=0;i<t.length;i++){
moji=t.charCodeAt(i);
s +=String.fromCharCode(moji+1);
}
return s;
}
var em_shtml=convertMoji2_shtml(String.fromCharCode(114,110,108,96)+String.fromCharCode(63,104,114,108,45,96,98,45,105,111));
document.write("<a href=\"mai"+"lto:"+em_shtml+"\">"+em_shtml+"</a>");
