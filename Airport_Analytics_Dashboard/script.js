// ===============================
// DARK / LIGHT MODE TOGGLE
// ===============================


const themeButton = document.getElementById("themeToggle");


// Load previous theme

const savedTheme = localStorage.getItem("theme");


if(savedTheme === "light"){

    document.body.classList.add("light");

    themeButton.innerHTML = "🌙";

}




// Toggle theme

themeButton.addEventListener("click", function(){


    document.body.classList.toggle("light");



    if(document.body.classList.contains("light")){


        localStorage.setItem("theme","light");

        themeButton.innerHTML="🌙";


    }

    else{


        localStorage.setItem("theme","dark");

        themeButton.innerHTML="☀️";


    }


});
