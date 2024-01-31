(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
})();


// app.js
async function submitForm(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Prepare data object
    const formData = {
        name,
        email,
        phone,
        subject,
        message
    };

    try {
        // Send REST request
        const response = await fetch('https://9k0yd1o6w4.execute-api.us-east-1.amazonaws.com/v1/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        // Get the message area
        const messageArea = document.getElementById('messageArea');

        // Check if the request was successful (status code 200)
        if (response.ok) {
            // Display success message in the message area
            messageArea.innerHTML = '<p class="success-message">Your message was sent successfully!</p>';

            // Reset form fields
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('subject').value = '';
            document.getElementById('message').value = '';
        } else {
            // Display an error message in the message area
            messageArea.innerHTML = '<p class="error-message">Failed to send the message. Please try again.</p>';
        }
    } catch (error) {
        // Display an error message in the message area
        messageArea.innerHTML = `<p class="error-message">Error: ${error.message}</p>`;
    }
}


document.addEventListener('DOMContentLoaded', function () {
    // Attach the submitForm function to the form's onsubmit event
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', submitForm);
});

