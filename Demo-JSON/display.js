// part II
// Here is the code to data based on user's email
// Global variable to get local domain
const localDomain = window.location.origin;
const emailInput = document.getElementById("email-input"); // the email input field has this ID
const submitButton = document.getElementById("submit-button"); // button has this ID
const userDataContainer = document.getElementById("user-data-container"); // container for user data has this ID
const userForm = document.getElementById("user-data-form");



async function loadData() {
  const email = emailInput.value.trim();

  if (!email) {
    alert("Please enter your email address.");
    return;
  }

  try {
    const response = await fetch(
      `${localDomain}/dashboard/MKB/cohort1/MKB-cohort-1-Demo/Demo-backend/Display.php
      `,
      {
        // Replace with your actual endpoint
        method: "GET", // Specify GET method for retrieving data
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch user data: ${response.status}`);
    }

    const allSurveysData = await response.json();

    // Find surveys where any answer text matches the email
    const foundSurveys = allSurveysData.surveys.filter((survey) => {
      return survey.questions.some((question) => {
        return question.answer_text === email; // Check answer_text for email match
      });
    });

    if (foundSurveys.length) {
      userDataContainer.innerHTML = `<h2>User Answers</h2>`;

      foundSurveys.forEach((survey) => {
        userDataContainer.innerHTML += `<h3>Survey: ${survey.title}</h3>`; // Add survey title

        survey.questions.forEach((question) => {
          userDataContainer.innerHTML += `
            <p>Question: ${question.question_text}</p>
            <p>Answer: ${question.answer_text}</p>
          `;
        });
      });
      userDataContainer.style.display = "block"; // Display user data container
    } else {
      userDataContainer.innerHTML = "<p>User email not found in any answers.</p>";
      userDataContainer.style.display = "block"; // Display "User not found" message
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    alert("Error retrieving your data. Please try again later.");
  }
}


userForm.addEventListener("submit", (event)=>{
    event.preventDefault(); // Prevent default form submission behavior
    loadData();
});

