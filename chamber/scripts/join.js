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

    /* Organizational Title is optional */
    if (title !== "") {
        
        /*Must be 7 characters min */
        if (title.length < 7) {

            event.preventDefault();
            organizationTitle.setCustomValidity(

                "organizational title must be at least 7 characters."

            );

            organizationTitle.reportValidity();

            return;

    }

        /* Only letters, spaces, and hyphens are allowed */
        if (!/^[A-Za-z -]+$/.test(title)) {

            event.preventDefault();
            organizationTitle.setCustomValidity(
                
                "organizational title can only contain letters, spaces, and hyphens."

            );

            organizationTitle.reportValidity();

            return;

        }

    }

    organizationTitle.setCustomValidity("");
    
});