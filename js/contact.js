// Form validation
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector("form");
  const formFeedback = document.createElement("p");
  formFeedback.classList.add("feedback");
  contactForm.appendChild(formFeedback);

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission until validation

    // Collect and trim form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("emailaddress").value.trim();
    const order = document.getElementById("order").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Clear previous feedback
    formFeedback.textContent = "";
    formFeedback.classList.remove("success", "error");
  });
});
