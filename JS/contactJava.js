const phoneInputField = document.querySelector("#phone");
if (phoneInputField) {
    window.intlTelInput(phoneInputField, {
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        initialCountry: "ph",
        preferredCountries: ["ph", "us", "gb"],
    });
}

// --- GENERIC MODAL FUNCTIONS ---
// Kept these functions as they are used by the Success/FAQ/Privacy modals
function openModal(modal) {
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}
// --- END GENERIC MODAL FUNCTIONS ---


// --- Global Modal Elements ---
const faqModal = document.getElementById('faqModal');
const openFaqButton = document.getElementById('openFaqButton');
const openFaqButtonFooter = document.getElementById('openFaqButtonFooter');
const closeFaqButton = document.getElementById('closeFaqButton');

const privacyPolicyModal = document.getElementById('privacyPolicyModal');
const openPrivacyPolicyButton = document.getElementById('openPrivacyPolicyButton');
const openPrivacyPolicyButtonFooter = document.getElementById('openPrivacyPolicyButtonFooter');
const closePrivacyPolicyButton = document.getElementById('closePrivacyPolicyButton');

const successModal = document.getElementById('successModal');
const closeSuccessButton = document.getElementById('closeSuccessButton');

// The 'form' and 'loadingModal' variables have been removed here.


// --- All Modal Listeners ---

// FAQ Modals
if (openFaqButton) {
    openFaqButton.addEventListener('click', function(event) {
        event.preventDefault();
        openModal(faqModal);
    });
}
if (openFaqButtonFooter) {
    openFaqButtonFooter.addEventListener('click', function(event) {
        event.preventDefault();
        openModal(faqModal);
    });
}
if (closeFaqButton) {
    closeFaqButton.addEventListener('click', function() {
        closeModal(faqModal);
    });
}

// Privacy Policy Modals
if (openPrivacyPolicyButton) {
    openPrivacyPolicyButton.addEventListener('click', function(event) {
        event.preventDefault();
        openModal(privacyPolicyModal);
    });
}
if (openPrivacyPolicyButtonFooter) {
    openPrivacyPolicyButtonFooter.addEventListener('click', function(event) {
        event.preventDefault();
        openModal(privacyPolicyModal);
    });
}
if (closePrivacyPolicyButton) {
    closePrivacyPolicyButton.addEventListener('click', function() {
        closeModal(privacyPolicyModal);
    });
}

// Set Policy Last Updated Date
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
    // Other/Package Select Logic
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

    // Other/Source Select Logic
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
});


// --- Success Modal Logic (Remains unchanged and is ready to work) ---

/**
 * Checks for the 'inquiry_success=1' parameter in the URL and displays the success modal.
 */
function checkInquirySuccess() {
    // CRITICAL: Ensure the modal element exists
    if (!successModal) {
        console.error("Success modal element not found!");
        return; 
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('inquiry_success') === '1') {
        openModal(successModal); 
        
        // This is the fallback line to ensure visibility against any CSS conflict
        successModal.style.cssText = 'display: block !important; z-index: 1000;';
        
        // Clear the parameter from the URL bar
        if (history.replaceState) {
            const cleanUrl = window.location.pathname + window.location.hash;
            history.replaceState(null, null, cleanUrl);
        }
    }
}

// Function to close the success modal
if (closeSuccessButton) {
    closeSuccessButton.onclick = function() {
        closeModal(successModal);
    };
}

// Close modals if user clicks outside of them
window.addEventListener('click', function(event) {
    if (event.target === faqModal) {
        closeModal(faqModal);
    }
    if (event.target === privacyPolicyModal) {
        closeModal(privacyPolicyModal);
    }
    if (event.target === successModal) {
        closeModal(successModal);
    }
});

// Add the success check to run immediately after script load
checkInquirySuccess();