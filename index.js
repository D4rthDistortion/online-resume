document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const data = new FormData(form);
  const action = "https://script.google.com/macros/s/AKfycbymmmMihv1VCUWZZ2AFtTDKjBxIVt8fqxXLdSVD4N58y8J1jHXZGuufcZDYWJJuhttV/exec";

  fetch(action, {
    method: "POST",
    body: data
  }).then(response => {
    document.getElementById("statusMessage").innerText = "Message sent successfully!";
    form.reset();
  }).catch(error => {
    document.getElementById("statusMessage").innerText = "Something went wrong. Try again!";
  });
});
