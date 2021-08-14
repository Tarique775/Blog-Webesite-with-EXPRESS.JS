// const socket = io(`${process.env.APP_URL}`);

const comment = document.getElementById('comment');
const commentHolder = document.getElementById('comment-holder');
// const parent = document.getElementById('parent');

// socket.on('new_comment', (msg) => {
//     const commentElement = createComment(msg);
//     const commentHolders = commentHolder.children[0];
//     commentHolder.insertBefore(commentElement, commentHolders);
// });
// socket.on('new_reply', (msgs) => {
//     const replyElement = createReplyElement(msgs);
//     parent.previousElementSibling.appendChild(replyElement);
// });

comment.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (e.target.value) {
            const postId = comment.dataset.post;
            const data = {
                body: e.target.value,
            };
            const req = reqCommentReply(`/api/comments/${postId}`, 'POST', data);

            fetch(req)
                .then((res) => res.json())
                .then((data) => {
                    const commentElement = createComment(data);
                    const commentHolders = commentHolder.children[0];
                    commentHolder.insertBefore(commentElement, commentHolders);
                    console.log(data);
                    e.target.value = '';
                })
                .catch((err) => {
                    console.log(err);
                    alert(err.message);
                });
        } else {
            alert('Please Enter A Valid Comment');
        }
    }
});

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

function createComment(comment) {
    const innerHTML = `
            <div class="flex-shrink-0">
            <a
            href="/author/${comment.user._id}"
            style="text-decoration: none; color: currentColor"
            ><img src="${
    comment.user.profilePics
            }" class="align-self-start rounded-circle mx-3 my-3" style="width: 40px"/></a>
            </div>
            <div class="flex-grow-0 col-md-9 my-3">
            <div class="bg-light border border-1 rounded-3 p-2">
            <a
            href="/author/${comment.user._id}"
            style="text-decoration: none; color: currentColor"
            ><h6>${comment.user.userName}</h6></a>
                <span>${comment.body}</span>
                </div>
                <small>${moment(comment.createdAt).fromNow()}</small>
    
                <div class="my-3">
                    <input type="text" class="form-control" placeholder="Press Enter to Reply" name="reply" data-comment=${
    comment._id
                    }/>
                </div>
            </div>
      `;

    const div = document.createElement('div');
    div.className = 'd-flex';
    div.innerHTML = innerHTML;

    return div;
}

function createReplyElement(reply) {
    const innerHTML = `
    <div class="flex-shrink-0"><a
    href="/author/${reply.id}"
    style="text-decoration: none; color: currentColor"
    ><img src="${
        reply.profilePics
    }" class="align-self-start me-3 rounded-circle" style="width: 40px"/></a></div>
        <div class="flex-grow-0 col-md-10">
        <div class="bg-light border border-1 rounded-3 p-2">
        <a
        href="/author/${reply.id}"
        style="text-decoration: none; color: currentColor"
        ><h6>${reply.userName}</h6></a>
            <span>${reply.body}</span>
            </div>
            <small>${moment(reply.createAt).fromNow()}</small>
        </div>`;

    const div = document.createElement('div');
    div.className = 'd-flex mt-3';
    div.innerHTML = innerHTML;

    return div;
}
