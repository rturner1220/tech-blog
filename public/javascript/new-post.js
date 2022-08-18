const newFormHandler = async function (event) {
    event.preventDefault();

    const title = document.querySelector('post-title').value;
    const contents = document.querySelector('post-body').value;

    const response = await fetch('/api/post', {
        method: "POST",
        body: JSON.stringify({
            title,
            contents
        }),
        headers: {
            "Content-Type": "application/json",

        }
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};


document.querySelector("#new-form").addEventListener("submit", newFormHandler);
