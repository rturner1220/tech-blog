async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('post-title').value;
    const body = document.querySelector('post-body').value;


    const response = await fetch(`/api/post/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            body
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

const deleteClickHandler = async function () {
    await fetch(`/api/post/${postId}`, {
        method: 'DELETE'
    });

    document.location.replace('/dashboard');
};


document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);

document.querySelector('.delete-btn').addEventListener('click', deleteClickHandler);
