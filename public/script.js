document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const submitBtn = document.getElementById("submitBtn");
    const message = document.getElementById("message");

    function isValidGmail(email) {
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return gmailRegex.test(email);
    }

    function checkInputs() {
        if (nameInput.value.trim() !== "" && isValidGmail(emailInput.value.trim())) {
            submitBtn.removeAttribute("disabled");
        } else {
            submitBtn.setAttribute("disabled", "true");
        }
    }

    emailInput.addEventListener("input", checkInputs);
    nameInput.addEventListener("input", checkInputs);

    document.getElementById("loginForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        if (!isValidGmail(emailInput.value.trim())) {
            message.textContent = "Please enter a valid Gmail address!";
            message.style.color = "red";
            return;
        }

        const userData = {
            name: nameInput.value,
            email: emailInput.value
        };

        const response = await fetch("/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        const result = await response.json();
        message.textContent = result.message;
        if (response.ok) {
            window.location.href = "https://unstop.com/auth/signup?utm_source=Techsol&utm_medium=Affiliates&utm_campaign=signup&ref=AffTS3"; // Change to your redirect URL
        }
    });
});
