onIsOff = true;
window.callback = function(res){
if(res.ret === 0){
   window.clearInterval(t2);
}
if(res.ret === 2){
   onIsOff = true;
}
}

var t2 = window.setInterval(function() {
if (onIsOff == true){
        act = document.activeElement.id;
        if(act=="veditor")
        {
        document.getElementById("TencentCaptcha").click();
        onIsOff = false;
        }
}
},1000);