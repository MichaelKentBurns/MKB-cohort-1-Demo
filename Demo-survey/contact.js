const userDataContainer = document.getElementById("contact-data-container"); // container for user data has this ID

async function loadData() {
  const displayURL = "../Demo-backend/Display_contact_Info.php";

  try {
    const response = await fetch(`${displayURL}`, {
      method: "GET", // Specify GET method for retrieving data
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user data: ${response.status}`);
    }

    const allSurveysData = await response.json();

    // Find surveys where any answer text matches the email
    const foundSurveys = allSurveysData.contacts;
    console.log(foundSurveys);

    if (foundSurveys.length) {
      userDataContainer.innerHTML = `<h2>User Info</h2>`;

      foundSurveys.forEach((survey) => {
        userDataContainer.innerHTML += `
          <div style="  border: 1px solid #ccc; ">
            <h3  style="padding:10px;">Contact Form</h3>  
            <p style=" text-align: start;padding:10px;font-weight: 600;">User Name: ${survey.name}<p> 
            <p style=" text-align: start;padding:10px;font-weight: 600;">User Email: ${survey.email}<p> 
            <p style=" text-align: start;padding:10px;font-weight: 600;">User Message: ${survey.message}<p> 
        
        
         `;

        userDataContainer.innerHTML += `
          </div>`; // Close survey container
      });
    } else {
      userDataContainer.innerHTML =
        "<p>User email not found in any answers.</p>";
      userDataContainer.style.display = "flex"; // Display "User not found" message
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    alert("Error retrieving your data. Please try again later.");
  }
}

loadData();
