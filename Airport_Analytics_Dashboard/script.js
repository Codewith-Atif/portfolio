const themeButton = document.getElementById("themeToggle");


themeButton.addEventListener("click",()=>{

document.body.classList.toggle("light");


if(document.body.classList.contains("light")){

themeButton.innerHTML="🌙";

}

else{

themeButton.innerHTML="☀️";

}

});
