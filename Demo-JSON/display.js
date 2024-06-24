// part II
// Here is the code to data based on user's email
// Global variable to get local domain
const localDomain = window.location.origin;
const emailInput = document.getElementById("email-input"); // the email input field has this ID
const submitButton = document.getElementById("submit-button"); // button has this ID
const userDataContainer = document.getElementById("user-data-container"); // container for user data has this ID
const userForm = document.getElementById("user-data-form");




async function  loadData(){

const email = emailInput.value.trim();

  if (!email) {
    alert("Please enter your email address.");
    return;
  }

  try {
    const response = await fetch(
      `${localDomain}/dashboard/MKB/cohort1/MKB-cohort-1-Demo/Demo-backend/Display.php`,
      {
        // Replace with your actual endpoint
        method: "GET", // Specify GET method for retrieving data
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch user data: ${response.status}`);
    }

    const allUsersData = await response.json();
    const foundUserAnswers = allUsersData.filter(data => data.answer_text === email); // Filter all answers matching the email

    if (foundUserAnswers.length) {
        userDataContainer.innerHTML = `<h2>User Answers</h2>`;
        foundUserAnswers.forEach(answer => {
          userDataContainer.innerHTML += `
            <p>Survey ID: ${answer.survey_id}</p>
            <p>Question: ${answer.question_text}</p>
            <p>Answer: ${answer.answer_text}</p>
          `;
        });
      userDataContainer.style.display = "block"; // Display user data container
    } else {
      userDataContainer.innerHTML = "<p>User not found.</p>";
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

