// International Phone Input setup
const phoneInputField = document.querySelector("#phone");
if (phoneInputField) {
    window.intlTelInput(phoneInputField, {
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        initialCountry: "ph",
        preferredCountries: ["ph", "us", "gb"],
    });
}

// =========================================================
// 1. FAQ Modal Logic (Executed immediately)
// =========================================================
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

// =========================================================
// 2. Privacy Policy Modal Logic (Executed immediately)
// =========================================================
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

// =========================================================
// 3. Date Display Logic (Executed immediately)
// =========================================================
const policyLastUpdatedElement = document.getElementById('policyLastUpdated');
if (policyLastUpdatedElement) {
    const lastUpdatedDate = new Date('2025-06-02');
    policyLastUpdatedElement.textContent = lastUpdatedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// =========================================================
// 4. Input Visibility Toggles (Executed immediately)
// CRITICAL FIX: Moved outside the large DOMContentLoaded wrapper
// =========================================================

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


// =========================================================
// 5. Success Modal Logic (Waits for DOM to load before checking URL)
// =========================================================
const successModal = document.getElementById('successModal');
const closeSuccessButton = document.getElementById('closeSuccessButton');

/**
 * Checks for the 'inquiry_success=1' parameter in the URL and displays the success modal.
 */
function checkInquirySuccess() {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('inquiry_success') === '1') {
        if (successModal) { 
            successModal.style.display = 'block';
        }
        
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
        successModal.style.display = 'none';
    };
}

// Close modal if user clicks outside of it
window.addEventListener('click', function(event) {
    if (event.target == successModal) {
        successModal.style.display = 'none';
    }
});


// Add the success check to run when the document is fully loaded
document.addEventListener('DOMContentLoaded', checkInquirySuccess);