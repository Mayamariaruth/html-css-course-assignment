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

    // Validation checks
    if (name.length < 3) {
      formFeedback.textContent =
        "Please enter a valid name (at least 3 characters).";
      formFeedback.classList.add("error");
      return;
    }

    if (!validateEmail(email)) {
      formFeedback.textContent = "Please enter a valid email address.";
      formFeedback.classList.add("error");
      return;
    }

    if (order && (order.length !== 7 || isNaN(order))) {
      formFeedback.textContent = "Order number must be a 7-digit number.";
      formFeedback.classList.add("error");
      return;
    }

    if (subject.length < 3) {
      formFeedback.textContent =
        "Please enter a subject (at least 3 characters).";
      formFeedback.classList.add("error");
      return;
    }

    if (message.length < 10) {
      formFeedback.textContent = "Message must be at least 10 characters.";
      formFeedback.classList.add("error");
      return;
    }

    // If validation passes, show success message and reset form
    formFeedback.textContent = "Thank you for your message!";
    formFeedback.classList.add("success");
    contactForm.reset();
  });

  // Helper function for email validation
  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
});
