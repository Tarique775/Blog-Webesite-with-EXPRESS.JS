window.onload = function () {
    tinymce.init({
        selector: '#tiny-mce-post-body',
        plugins: [
            'a11ychecker advcode advlist lists link checklist autolink autosave code',
            'preview',
            'searchreplace',
            'wordcount',
            'media table emoticons image imagetools',
        ],
        toolbar:
            'bold italic underline | alignleft aligncenter alignright alingjustify | bullist numlist outdent indent | link image media | forecolor backcolor emoticons | code preview',
        height: 300,
        automatic_uploads: true,
        images_upload_url: '/api/dashbord/uploads/postimage',
        relative_urls: false,
        images_upload_handler(blobInfo, success, failure) {
            const header = new Headers();
            header.append('Accept', 'Application/JSON');

            const formData = new FormData();
            formData.append('post-image', blobInfo.blob(), blobInfo.filename());

            const req = new Request('/api/dashbord/uploads/postimage', {
                method: 'POST',
                headers: header,
                mode: 'cors',
                body: formData,
            });

            fetch(req)
                .then((res) => res.json())
                .then((data) => success(data.imgUrl))
                .catch(() => failure('HTTP Error'));
        },
    });
};
