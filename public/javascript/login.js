async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector("#username-input-login");
    const password = document.querySelector("#password-input-login");
    fetch("/api/user/login", {
        method: "post",
        body: JSON.stringify({
            username: username.value,
            password: password.value
        }),
        headers: { "Content-Type": "application/json" }
    })
        .then(function () {
            document.location.replace("/dashboard");
        })
        .catch(err => console.log(err));
};

document
    .querySelector("#login-form")
    .addEventListener("submit", loginFormHandler);
