// Form validation
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    // Clear any previous error messages
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
      showError("nameError", "Please enter at least 3 characters.");
      isValid = false;
    }

    if (!validateEmail(email)) {
      showError("emailError", "Please enter a valid email address.");
      isValid = false;
    }

    if (order && order.length !== 7) {
      showError("orderError", "Order number must be exactly 7 digits.");
      isValid = false;
    }

    if (subject.length < 3) {
      showError(
        "subjectError",
        "Please enter a subject (at least 3 characters)."
      );
      isValid = false;
    }

    if (message.length < 10) {
      showError("messageError", "Your message must be at least 10 characters.");
      isValid = false;
    }

    // If all fields are valid, display success message
    if (isValid) {
      alert("Thank you for your message!");
      contactForm.reset();
    }
  });

  // Helper function to display error messages
  function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add("visible");
    } else {
      console.error(`Error element with ID ${elementId} not found`);
    }
  }

  // Clear all error messages
  function clearErrorMessages() {
    document.querySelectorAll(".error-message").forEach((element) => {
      element.textContent = "";
      element.classList.remove("visible");
    });
  }

  // Email validation helper
  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
});
