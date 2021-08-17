const likeBtn = document.getElementById("likeBtn");
const dislikeBtn = document.getElementById("dislikeBtn");

function reqlikeDislike(type, postId) {
  const headers = new Headers();
  headers.append("Accept", "Application/JSON");
  headers.append("Content-Type", "Application/JSON");

  const req = new Request(`/api/${type}/${postId}`, {
    method: "GET",
    headers,
    mode: "cors",
  });

  return fetch(req);
}

likeBtn.addEventListener("click", (e) => {
  const postId = likeBtn.dataset.post;
  reqlikeDislike("likes", postId)
    .then((res) => res.json())
    .then((data) => {
      let liketext = data.liked
        ? `<strong
                ><i style="color: blue" class="fas fa-thumbs-up"></i
            ></strong>
            <small style="color: blue">Liked</small>`
        : '<strong> <i class="far fa-thumbs-up"></i> </strong><small>Like</small>';
      liketext +=
        data.totalLikes < 1 ? "" : ` <small>${data.totalLikes}</small>`;
      const disliketext =
        data.totalDislikes < 1
          ? '<strong> <i class="far fa-thumbs-down"></i> </strong><small>Dislike</small>'
          : `<strong> <i class="far fa-thumbs-down"></i> </strong><small>Dislike ${data.totalDislikes}</small>`;

      likeBtn.innerHTML = liketext;
      dislikeBtn.innerHTML = disliketext;
    })
    .catch((err) => {
      console.log(err);
      alert(err.message);
    });
});

dislikeBtn.addEventListener("click", (e) => {
  const postId = likeBtn.dataset.post;
  reqlikeDislike("dislikes", postId)
    .then((res) => res.json())
    .then((data) => {
      let disliketext = data.disliked
        ? `<strong
                ><i style="color: blue" class="fas fa-thumbs-down"></i
              ></strong>
              <small style="color: blue">Disliked</small>`
        : '<strong> <i class="far fa-thumbs-down"></i> </strong><small>Dislike</small>';
      disliketext +=
        data.totalDislikes < 1 ? "" : ` <small>${data.totalDislikes}</small>`;
      const liketext =
        data.totalLikes < 1
          ? '<strong> <i class="far fa-thumbs-up"></i> </strong><small>Like</small>'
          : `<strong> <i class="far fa-thumbs-up"></i> </strong><small>Like ${data.totalLikes}</small>`;

      dislikeBtn.innerHTML = disliketext;
      likeBtn.innerHTML = liketext;
    })
    .catch((err) => {
      console.log(err);
      alert(err.message);
    });
});
