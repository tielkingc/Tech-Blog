async function editPostHandler(event) {
    event.preventDefault();

    const post_title = document.querySelector('#post_title').value.trim();
    const post_content = document.querySelector('#post_content').value.trim();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            post_title,
            post_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        window.location.replace('/dashboard')
    } else {
        alert(response.statusText)
    }
}

document.querySelector('.edit-post-form').addEventListener('submit', editPostHandler)