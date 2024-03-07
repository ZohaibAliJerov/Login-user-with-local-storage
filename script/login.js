// ---------------login------------
let loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let email = document.getElementById("inputEmail").value;
    let password = document.getElementById("inputPassword").value;

    let existingUsers = localStorage.getItem('users');
    console.log(existingUsers)

    existingUsers = existingUsers ? JSON.parse(existingUsers) : [];
    let user = existingUsers.find(user => user.email === email && user.password === password);

    console.log(user)

    if (user) {
        alert('Login successful!');
        localStorage.setItem("isLoggedIn", true);

        window.location.href = "index.html";
    }
    else {
        alert('Email or password is incorrect');

    }
});
