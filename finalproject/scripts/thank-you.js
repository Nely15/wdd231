
const summary = document.querySelector("#request-summary");
const message = document.querySelector("#thank-you-message");
const heading = document.querySelector("#thank-you-heading");

const params = new URLSearchParams(window.location.search);

const fields = [
    ["Name", "name"],
    ["Email", "email"],
    ["Recipient", "recipient"],
    ["Occasion", "occasion"],
    ["Budget", "budget"],
    ["Preferred style", "style"],
    ["Interests", "interests"],
    ["Additional details", "details"]
];

// Check whether a form was submitted.
if (!params.has("name")) {
    message.textContent =
        "No recent request was found. Please submit the gift request form first.";
} else {
    const name = params.get("name") || "there";

    heading.textContent = `Thank you, ${name}!`;
    message.textContent =
        "Here is a summary of the information you submitted.";

    fields.forEach(([label, key]) => {
        const term = document.createElement("dt");
        const description = document.createElement("dd");

        term.textContent = label;
        description.textContent =
            params.get(key) || "Not provided";

        summary.append(term, description);
    });
}
