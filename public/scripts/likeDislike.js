const likeBtn = document.getElementById('likeBtn');
const dislikeBtn = document.getElementById('dislikeBtn');

function reqlikeDislike(type, postId) {
    const headers = new Headers();
    headers.append('Accept', 'Application/JSON');
    headers.append('Content-Type', 'Application/JSON');

    const req = new Request(`/api/${type}/${postId}`, {
        method: 'GET',
        headers,
        mode: 'cors',
    });

    return fetch(req);
}

likeBtn.addEventListener('click', (e) => {
    const postId = likeBtn.dataset.post;
    reqlikeDislike('likes', postId)
        .then((res) => res.json())
        .then((data) => {
            let liketext = data.liked ? 'Liked' : 'Like';
            liketext += ` ( ${data.totalLikes} )`;
            const disliketext = `Dislike ( ${data.totalDislikes} )`;

            likeBtn.innerHTML = liketext;
            dislikeBtn.innerHTML = disliketext;
        })
        .catch((err) => {
            console.log(err);
            alert(err.message);
        });
});

dislikeBtn.addEventListener('click', (e) => {
    const postId = likeBtn.dataset.post;
    reqlikeDislike('dislikes', postId)
        .then((res) => res.json())
        .then((data) => {
            let disliketext = data.disliked ? 'Disliked' : 'Dislike';
            disliketext += ` ( ${data.totalDislikes} )`;
            const liketext = `Like ( ${data.totalLikes} )`;

            dislikeBtn.innerHTML = disliketext;
            likeBtn.innerHTML = liketext;
        })
        .catch((err) => {
            console.log(err);
            alert(err.message);
        });
});
