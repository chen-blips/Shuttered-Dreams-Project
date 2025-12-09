const body = document.body;
const images = [
    'images/slideshow1.jpg',
    'images/slideshow2.jpg',
    'images/slideshow3.jpg',
    'images/slideshow4.jpg',
    'images/slideshow5.jpg'
];
let currentIndex = 0;
const slideInterval = 7000;
let intervalId;
const indicatorContainer = document.querySelector('.slide-indicators');

function changeBackground(index) {
    body.style.backgroundImage = `url('${images[index]}')`;
    updateIndicators();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    changeBackground(currentIndex);
}

function previousSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    changeBackground(currentIndex);
}

function startSlider() {
    intervalId = setInterval(nextSlide, slideInterval);
}

function stopSlider() {
    clearInterval(intervalId);
}

function createIndicators() {
    images.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => {
            stopSlider();
            currentIndex = index;
            changeBackground(currentIndex);
            startSlider();
        });
        indicatorContainer.appendChild(dot);
    });
}

function updateIndicators() {
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

document.querySelector('.slide-control.left').addEventListener('click', () => {
    stopSlider();
    previousSlide();
    startSlider();
});

document.querySelector('.slide-control.right').addEventListener('click', () => {
    stopSlider();
    nextSlide();
    startSlider();
});

createIndicators();
changeBackground(currentIndex);
startSlider();
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

// ========================= POP-UP PRIVACY POLICY JAVASCRIPT =========================
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

// ========================= FORM LOGIC JAVASCRIPT =========================
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

// Function to dynamically position the mega-menu
function positionMegaMenu() {
    const header = document.getElementById('mainHeader');
    const megaMenu = document.getElementById('megaMenuContent');
    
    if (header && megaMenu) {
        // Calculate the height of the header
        const headerHeight = header.offsetHeight;
        
        // Set the 'top' of the mega-menu to be equal to the header height
        // This ensures the menu drops down perfectly from the header's bottom edge.
        megaMenu.style.top = `${headerHeight}px`;
    }
}

function positionMegaMenu() {
    const header = document.getElementById('mainHeader');
    const megaMenu = document.getElementById('megaMenuContent');
    
    if (header && megaMenu) {
        // Calculate the height of the header
        const headerHeight = header.offsetHeight;
        
        // Set the 'top' of the mega-menu
        megaMenu.style.top = `${headerHeight}px`;
    }
}

// Function to handle the hover state using JavaScript
function setupMegaMenuToggle() {
    const dropdownItem = document.getElementById('aboutDropdown');
    const megaMenu = document.getElementById('megaMenuContent');

    if (dropdownItem && megaMenu) {
        // Show menu on mouse enter by adding the active class
        dropdownItem.addEventListener('mouseenter', () => {
            megaMenu.classList.add('mega-menu-active');
        });

        // Hide menu on mouse leave by removing the active class
        dropdownItem.addEventListener('mouseleave', () => {
            megaMenu.classList.remove('mega-menu-active');
        });
    }
}

// Run the positioning and toggle functions when the page loads
window.addEventListener('load', () => {
    positionMegaMenu();
    setupMegaMenuToggle();
});

// Recalculate position if the browser window size changes
window.addEventListener('resize', positionMegaMenu);

function positionMegaMenu() {
    // You can keep the header and megaMenu declarations, but we won't use them to set the 'top'
    const header = document.getElementById('mainHeader');
    const megaMenu = document.getElementById('megaMenuContent');
    
    if (header && megaMenu) {
        // No action needed here now, as CSS handles the positioning relative to the LI
    }
}

// Get the modal
        var modal = document.getElementById('loginModal');

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

