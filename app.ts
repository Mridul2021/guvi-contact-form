const contactForm = document.getElementById("contactForm") as HTMLFormElement;

interface ContactFormData {
  name: string;
  email: string;
  contactNumber: string;
  subject: string;
  message: string;
}

contactForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const formData = getFormData();

  if (!isValidForm(formData)) {
    return;
  }

  try {
    const response = await postData(formData);
    if (response.ok) {
      alert("Form submitted successfully!");
      contactForm.reset();
    } else {
      alert("Failed to submit form. Please try again later.");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("An error occurred while submitting the form.");
  }
});

function getFormData(): ContactFormData {
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const contact = (document.getElementById("contact") as HTMLInputElement).value;
  const subject = (document.getElementById("subject") as HTMLInputElement).value;
  const message = (document.getElementById("message") as HTMLTextAreaElement).value;

  return { name, email, contactNumber: contact, subject, message };
}

function isValidForm(formData: ContactFormData): boolean {
  const { name, email, contactNumber, subject, message } = formData;

  if (!name || !email || !contactNumber || !subject || !message) {
    alert("All fields are required!");
    return false;
  }

  if (!emailValidation(email)) {
    alert("Please enter a valid email address!");
    return false;
  }

  if (!contactValidation(contactNumber)) {
    alert("Please enter a valid contact number!");
    return false;
  }

  return true;
}

function emailValidation(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


function contactValidation(contact: string): boolean {
  const contactRegex = /^[0-9-]+$/;
  return contactRegex.test(contact);
}

async function postData(formData: ContactFormData): Promise<Response> {
  const apiUrl = "https://67189a707fc4c5ff8f4a2941.mockapi.io/api/submit-form/submit";
  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
}
