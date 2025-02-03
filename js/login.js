let inpUser = document.getElementById("inpUser");
let inpPassword = document.getElementById("inpPassword");
let logButton = document.getElementById("logButton");
let showPassword = document.getElementById("showPassword");



logButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (inpUser.value.trim() == "admin" && inpPassword.value.trim() == "admin") {
        window.location.href = "products.html";
    } else {
        alert("please type admin in Username & PW")
    }
})
showPassword.addEventListener('change', () => {
    if (showPassword.checked) {
        inpPassword.type = "text";
    } else {
        inpPassword.type = "password";
    }
});
