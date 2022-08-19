async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('post-title').value;
    const contents = document.querySelector('post-body').value;
    const postId = document.querySelector('delete-btn').dataset.id;


    const response = await fetch(`/api/post/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            contents
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace(`/dashboard`);
    } else {
        alert(response.statusText);
    }
}



const deleteClickHandler = async function () {
    await fetch(`/api/post/${postId}`, {
        method: 'DELETE'
    });

    document.location.replace(`/dashboard`);
};



document.querySelector('#save-btn').addEventListener('submit', editFormHandler);

document.querySelector('#post-container').addEventListener('click', deleteClickHandler);
