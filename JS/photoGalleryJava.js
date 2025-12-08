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
                if (homePageSlider) {
                    homePageSlider.style.display = 'block';
                }
            }
        });
    });

    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('image-gallery')) {
            event.target.style.display = 'none';
            if (homePageSlider) {
                homePageSlider.style.display = 'block';
            }
        }
    });
});

const aboutUsTextContainer = document.querySelector('.about-us-text-container');

function checkVisibility() {
    if (!aboutUsTextContainer) return;
    const elementTop = aboutUsTextContainer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (elementTop < windowHeight / 1.2) {
        aboutUsTextContainer.classList.add('visible');
        window.removeEventListener('scroll', checkVisibility);
    }
}

window.addEventListener('scroll', checkVisibility);
checkVisibility();

const privacyPolicyModal = document.getElementById('privacyPolicyModal');
const openPrivacyPolicyButton = document.getElementById('openPrivacyPolicyButton');
const openPrivacyPolicyButtonFooter = document.getElementById('openPrivacyPolicyButtonFooter');
const closePrivacyPolicyButton = document.getElementById('closePrivacyPolicyButton');

function openPrivacyPolicyModal() {
    if (privacyPolicyModal) {
        privacyPolicyModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closePrivacyPolicyModal() {
    if (privacyPolicyModal) {
        privacyPolicyModal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

if (openPrivacyPolicyButton) {
    openPrivacyPolicyButton.addEventListener('click', function(event) {
        event.preventDefault();
        openPrivacyPolicyModal();
    });
}
if (openPrivacyPolicyButtonFooter) {
    openPrivacyPolicyButtonFooter.addEventListener('click', function(event) {
        event.preventDefault();
        openPrivacyPolicyModal();
    });
}

if (closePrivacyPolicyButton) {
    closePrivacyPolicyButton.addEventListener('click', closePrivacyPolicyModal);
}

window.addEventListener('click', function(event) {
    if (privacyPolicyModal && event.target == privacyPolicyModal) {
        closePrivacyPolicyModal();
    }
});

const policyLastUpdatedElement = document.getElementById('policyLastUpdated');
if (policyLastUpdatedElement) {
    const lastUpdatedDate = new Date('2025-06-02');
    policyLastUpdatedElement.textContent = lastUpdatedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const packageSelect = document.getElementById('package');
    const otherPackageInputContainer = document.getElementById('otherPackageInput');
    const otherPackageNameInput = document.getElementById('otherPackageName');

    if (packageSelect && otherPackageInputContainer && otherPackageNameInput) {
        packageSelect.addEventListener('change', function() {
            if (packageSelect.value === 'other_package') {
                otherPackageInputContainer.style.display = 'block';
                otherPackageNameInput.setAttribute('required', 'required');
            } else {
                otherPackageInputContainer.style.display = 'none';
                otherPackageNameInput.removeAttribute('required');
            }
        });
    }

    const howFindUsSelect = document.getElementById('howFindUs');
    const otherSourceInputContainer = document.getElementById('otherSourceInput');
    const otherSourceNameInput = document.getElementById('otherSourceName');

    if (howFindUsSelect && otherSourceInputContainer && otherSourceNameInput) {
        howFindUsSelect.addEventListener('change', function() {
            if (howFindUsSelect.value === 'other_source') {
                otherSourceInputContainer.style.display = 'block';
                otherSourceNameInput.setAttribute('required', 'required');
            } else {
                otherSourceInputContainer.style.display = 'none';
                otherSourceNameInput.removeAttribute('required');
            }
        });
    }

    const form = document.querySelector('form[data-redirect]');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            const actionUrl = form.getAttribute('action');
            const redirectUrl = form.getAttribute('data-redirect');
            const errorUrl = form.getAttribute('data-error');

            fetch(actionUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    window.location.href = redirectUrl;
                } else {
                    return response.json().then(errorData => {
                        console.error('Form submission error:', errorData);
                        window.location.href = errorUrl;
                    }).catch(() => {
                        console.error('Form submission error: Non-JSON response');
                        window.location.href = errorUrl;
                    });
                }
            })
            .catch(error => {
                console.error('Network or fetch error:', error);
                window.location.href = errorUrl;
            });
        });
    }
});
