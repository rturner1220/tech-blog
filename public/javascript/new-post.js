const newFormHandler = async function (e) {
    e.preventDefault();

    const response = await fetch(e.target.action, {
        method: e.target.method,
        body: JSON.stringify({
            title: e.target.title.value,
            contents: e.target.contents.value,
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
