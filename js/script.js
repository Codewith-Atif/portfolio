window.addEventListener("scroll",function(){

const header=document.querySelector("header");

if(window.scrollY>50){

header.style.background="#0B1120";

header.style.boxShadow="0 5px 25px rgba(0,0,0,.3)";

}

else{

header.style.background="#111827";

header.style.boxShadow="none";

}

});
