async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector("#username-input-signup");
    const password = document.querySelector("#password-input-signup");

    fetch("/api/user", {
        method: "post",
        body: JSON.stringify({
            username: username.value,
            password: password.value
        }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(function () {
            document.location.replace("/dashboard");
        })
        .catch(err => console.log(err));
};
document
    .querySelector("#signup-form")
    .addEventListener("submit", signupFormHandler);
