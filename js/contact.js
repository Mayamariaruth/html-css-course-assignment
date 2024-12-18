// Form validation
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      clearErrorMessages();

      // Collect form values
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("emailaddress").value.trim();
      const order = document.getElementById("order").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      // Validation checks
      let isValid = true;

      if (name.length < 3) {
        showError("nameError", "Please enter at least 3 characters.", "name");
        isValid = false;
      }

      if (!validateEmail(email)) {
        showError(
          "emailError",
          "Please enter a valid email address.",
          "emailaddress"
        );
        isValid = false;
      }

      if (order && order.length !== 7) {
        showError("orderError", "Order number must be 7 digits.", "order");
        isValid = false;
      }

      if (subject.length < 3) {
        showError(
          "subjectError",
          "Please enter a subject (at least 3 characters).",
          "subject"
        );
        isValid = false;
      }

      if (message.length < 10) {
        showError(
          "messageError",
          "Your message must be at least 10 characters.",
          "message"
        );
        isValid = false;
      }

      // If all fields are valid, display success message
      if (isValid) {
        const contactSuccess = document.getElementById("contactSuccess");
        contactSuccess.textContent = "Thank you! Your message has been sent.";
        contactSuccess.className = "contact-success";
        contactForm.reset();
      }
    });
  }

  // Helper function to display error messages
  function showError(elementId, message, inputId) {
    const errorElement = document.getElementById(elementId);
    const inputElement = document.getElementById(inputId);
    if (errorElement && inputElement) {
      errorElement.textContent = message;
      errorElement.classList.add("visible");
      inputElement.classList.add("input-error");
    } else {
      console.error(
        `Error element or input field with ID ${inputId} not found`
      );
    }
  }

  // Clear all error messages
  function clearErrorMessages() {
    document.querySelectorAll(".error-message").forEach((element) => {
      element.textContent = "";
      element.classList.remove("visible");
    });

    document.querySelectorAll("input, textarea").forEach((input) => {
      input.classList.remove("input-error");
    });
  }

  // Email validation helper
  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
});
