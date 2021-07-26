window.onload = function () {
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
            .catch((e) => {
                console.error(e.response.data);
                const alert = e.response.data.error;
                alert();
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
            .catch((e) => {
                console.error(e.response.data);
                const alert = e.response.data.error;
                alert();
            });
    });

    /// bookmark
    const bookmarks = document.getElementsByClassName('bookmark');
    [...bookmarks].forEach((bookmark) => {
        bookmark.style.cursor = 'pointer';

        bookmark.addEventListener('click', (e) => {
            const targets = e.target.parentElement;

            const headers = new Headers();
            headers.append('Accept', 'Application/JSON');

            const req = new Request(`/api/bookmarks/${targets.dataset.post}`, {
                method: 'GET',
                headers,
                mode: 'cors',
            });

            fetch(req)
                .then((res) => res.json())
                .then((data) => {
                    if (data.bookmarked) {
                        targets.innerHTML = '<i class="fas fa-bookmark"></i>';
                    } else {
                        targets.innerHTML = '<i class="far fa-bookmark"></i>';
                    }
                })
                .catch((err) => {
                    console.error(err.response.data);
                    const alert = err.response.data.error;
                    alert();
                });
        });
    });
};
