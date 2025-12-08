document.addEventListener('DOMContentLoaded', function() {
    const placeholders = document.querySelectorAll('.image-placeholder');
    const galleries = document.querySelectorAll('.image-gallery');
    const closeButtons = document.querySelectorAll('.close-button');

    placeholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            const galleryId = this.dataset.gallery;
            const targetGallery = document.getElementById(galleryId);
            if (targetGallery) {
                targetGallery.style.display = 'flex'; 
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const gallery = this.closest('.image-gallery');
            if (gallery) {
                gallery.style.display = 'none'; 
            }
        });
    });

    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('image-gallery')) {
            event.target.style.display = 'none';
        }
    });
});