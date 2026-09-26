const membershipLinks = document.querySelectorAll(".membership-card a");
const closeButtons = document.querySelectorAll(".close-modal");

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