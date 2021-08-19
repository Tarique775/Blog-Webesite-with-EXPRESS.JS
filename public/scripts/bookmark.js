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
                console.log(err);
                alert(err.message);
            });
    });
});
