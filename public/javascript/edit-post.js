const postId = document.querySelector('input[name="post-id"]').value;

const editFormHandler = async function (event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const contents = document.querySelector('textarea[name="post-body"]').value;

    await fetch(`/api/post/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            contents
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    document.location.replace('/dashboard');
};

const deleteClickHandler = async function () {
    await fetch(`/api/post/${postId}`, {
        method: 'DELETE'
    });

    document.location.replace('/dashboard');
};

document.querySelector('#post-container').addEventListener('submit', editFormHandler);

document.querySelector('#delete-btn').addEventListener('click', deleteClickHandler);
