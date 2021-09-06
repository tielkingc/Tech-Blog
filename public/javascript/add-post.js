async function addPostHandler(event) {
    event.preventDefault();

    const post_title = document.querySelector('#post_title').value.trim();
    const post_content = document.querySelector('#post_content').value.trim();

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            post_title,
            post_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert(response.statusText)
    }
}

document.querySelector('.new-post-form').addEventListener('submit', addPostHandler);