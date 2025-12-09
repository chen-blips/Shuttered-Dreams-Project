const phoneInputField = document.querySelector("#phone");
if (phoneInputField) {
    window.intlTelInput(phoneInputField, {
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        initialCountry: "ph",
        preferredCountries: ["ph", "us", "gb"],
    });
}

// --- Generic Modal Functions (NEW/FIXED) ---
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

const loadingModal = document.getElementById('loadingModal'); // NEW: Loading Modal
const form = document.querySelector('.form-spacing'); // Form element


// --- FAQ Modal Functions and Listeners (Now use generic functions) ---
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

// --- Privacy Policy Modal Functions and Listeners (Now use generic functions) ---
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

// --- General Form/DOM Logic ---
document.addEventListener('DOMContentLoaded', function() {
    
    // Package Select Logic
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

    // Source Select Logic
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

}); // End of DOMContentLoaded listener


// --- Success Modal Logic ---

/**
 * Checks for the 'inquiry_success=1' parameter in the URL and displays the success modal.
 */
function checkInquirySuccess() {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('inquiry_success') === '1') {
        openModal(successModal); // Use generic function
        
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
        closeModal(successModal); // Use generic function
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
    if (event.target === successModal) { // Also handles success modal
        closeModal(successModal);
    }
});


// --- FORM SUBMISSION WITH LOADING ANIMATION (FIXED) ---

if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // 1. Check if the form is valid (native browser validation)
        if (!form.checkValidity()) {
            form.reportValidity();
            return; // Stop if validation fails
        }

        // 2. Show the loading modal
        openModal(loadingModal); 

        // 3. Wait for the delay (1.5 seconds), then force the submission
        const submissionDelay = 1500; 
        
        setTimeout(function() {
            // Re-submit the form programmatically, bypassing this event listener
            form.submit();
        }, submissionDelay);
    });
}


// Add the success check to run when the document is fully loaded
document.addEventListener('DOMContentLoaded', checkInquirySuccess);