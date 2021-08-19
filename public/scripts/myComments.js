const commentHolder = document.getElementById('comment-holder');

commentHolder.addEventListener('keypress', (e) => {
    if (commentHolder.hasChildNodes(e.target)) {
        if (e.key === 'Enter') {
            const commentId = e.target.dataset.comment;
            const { value } = e.target;

            if (value) {
                const data = {
                    body: value,
                };
                const req = reqCommentReply(`/api/comments/replies/${commentId}`, 'POST', data);
                fetch(req)
                    .then((res) => res.json())
                    .then((data) => {
                        const replyElement = createReplyElement(data);
                        const parent = e.target.parentElement;
                        parent.previousElementSibling.appendChild(replyElement);
                        e.target.value = '';
                    })
                    .catch((err) => {
                        console.log(err);
                        alert(err.message);
                    });
            } else {
                alert('Please Enter A Valid Reply');
            }
        }
    }
});

function reqCommentReply(url, method, body) {
    const headers = new Headers();
    headers.append('Accept', 'Application/JSON');
    headers.append('Content-Type', 'Application/JSON');

    const req = new Request(url, {
        method,
        headers,
        body: JSON.stringify(body),
        mode: 'cors',
    });

    return req;
}

function createReplyElement(reply) {
    const innerHTML = `
    <div class="flex-shrink-0"><a
    href="/author/${reply.user._id}"
    style="text-decoration: none; color: currentColor"
    ><img src="${
        reply.user.profilePics
}" class="align-self-start me-3 rounded-circle" style="width: 40px"/></a></div>
        <div class="flex-grow-0 col-md-10">
        <div class="bg-light border border-1 rounded-3 p-2">
        <a
        href="/author/${reply.user._id}"
        style="text-decoration: none; color: currentColor"
        ><h6>${reply.user.userName}</h6></a>
            <span>${reply.replies[reply.replies.length - 1].body}</span>
            </div>
            <small>${moment(reply.replies[reply.replies.length - 1].createAt).fromNow()}</small>
        </div>`;

    const div = document.createElement('div');
    div.className = 'd-flex mt-3';
    div.innerHTML = innerHTML;

    return div;
}
