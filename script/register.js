
// ----------register an account-----------

let postData = document.getElementById("regForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let age = document.getElementById("age").value;

    if (email === "" || password === "" || age === "") {
        alert("You have to fill all the fields");
    } else {
        let existingUsers = localStorage.getItem('users');
        existingUsers = existingUsers ? JSON.parse(existingUsers) : [];

        // Check if user with the same email already exists
        let isUserExist = existingUsers.some(user => user.email === email);
        if (isUserExist) {
            alert("User already registered with this email");
        } else {
            let userData = {
                email: email,
                password: password,
                age: age
            };
            existingUsers.push(userData);
            localStorage.setItem('users', JSON.stringify(existingUsers));
            alert('Registration successful!');
            window.location.href = "login.html";
        }
    }
});


