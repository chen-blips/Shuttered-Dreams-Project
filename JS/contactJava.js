const phoneInputField = document.querySelector("#phone");
if (phoneInputField) {
    window.intlTelInput(phoneInputField, {
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        initialCountry: "ph",
        preferredCountries: ["ph", "us", "gb"],
    });
}

const faqModal = document.getElementById('faqModal');
const openFaqButton = document.getElementById('openFaqButton');
const openFaqButtonFooter = document.getElementById('openFaqButtonFooter');
const closeFaqButton = document.getElementById('closeFaqButton');

function openFaqModal() {
    faqModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeFaqModal() {
    faqModal.style.display = 'none';
    document.body.style.overflow = '';
}

if (openFaqButton) {
    openFaqButton.addEventListener('click', function(event) {
        event.preventDefault();
        openFaqModal();
    });
}
if (openFaqButtonFooter) {
    openFaqButtonFooter.addEventListener('click', function(event) {
        event.preventDefault();
        openFaqModal();
    });
}

if (closeFaqButton) {
    closeFaqButton.addEventListener('click', closeFaqModal);
}

window.addEventListener('click', function(event) {
    if (event.target == faqModal) {
        closeFaqModal();
    }
});

const privacyPolicyModal = document.getElementById('privacyPolicyModal');
const openPrivacyPolicyButton = document.getElementById('openPrivacyPolicyButton');
const openPrivacyPolicyButtonFooter = document.getElementById('openPrivacyPolicyButtonFooter');
const closePrivacyPolicyButton = document.getElementById('closePrivacyPolicyButton');

function openPrivacyPolicyModal() {
    privacyPolicyModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closePrivacyPolicyModal() {
    privacyPolicyModal.style.display = 'none';
    document.body.style.overflow = '';
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
    if (event.target == privacyPolicyModal) {
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

// --- Modal for Submission Success ---

// Get the modal element
const successModal = document.getElementById('successModal');
const closeSuccessButton = document.getElementById('closeSuccessButton');

/**
 * Checks for the 'inquiry_success=1' parameter in the URL and displays the success modal.
 */
function checkInquirySuccess() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check if the inquiry_success parameter is set to '1'
    if (urlParams.get('inquiry_success') === '1') {
        successModal.style.display = 'block';
        
        // Optional: Clear the parameter from the URL bar to prevent the modal from reappearing 
        // if the user refreshes the page. (Requires HTML5 pushState)
        if (history.replaceState) {
            const cleanUrl = window.location.pathname + window.location.hash;
            history.replaceState(null, null, cleanUrl);
        }
    }
}

// Function to close the success modal
closeSuccessButton.onclick = function() {
    successModal.style.display = 'none';
};

// Close modal if user clicks outside of it
window.addEventListener('click', function(event) {
    if (event.target == successModal) {
        successModal.style.display = 'none';
    }
});


// Add the success check to run when the document is fully loaded
document.addEventListener('DOMContentLoaded', checkInquirySuccess);