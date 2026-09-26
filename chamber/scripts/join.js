const membershipLinks = document.querySelectorAll(".membership-card a");
const closeButtons = document.querySelectorAll(".close-modal");
const joinForm = document.querySelector(".join-form");
const organizationTitle = document.querySelector('input[name="organizationTitle"]');

membershipLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

        const modalId = link.getAttribute("href");
        const modal = document.querySelector(modalId);

        modal.showModal();

    });

});

closeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        button.closest("dialog").close();

    });
    
});

/* Check organizational title */
joinForm.addEventListener("submit", (event) => {
    const title = organizationTitle.value.trim();

    /* Organizational Title is optional. 
    If it is entered, it must have at least 7 characters 
    and only letters, spaces, and hyphens are allowed */
    if (title !== "") {
        
        const validTitle = /^[A-Za-z -]{7,}$/.test(title);

        if (!validTitle) {

            event.preventDefault();
            
            organizationTitle.setCustomValidity(
                
                "Please enter at least 7 letters, spaces, or hyphens."

            );

            organizationTitle.reportValidity();
        
        } else {

            organizationTitle.setCustomValidity("");

        }

    }  else {

        organizationTitle.setCustomValidity("");

    }

});