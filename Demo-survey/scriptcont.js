const surveyListElement = document.getElementById("survey-list");
const questionContainerElement = document.getElementById("question-container");
const fileName = "contact.json";
// Global variable to get local domain
const localDomain = window.location.origin;

// Function to load survey data from a file
function loadSurveyData() {
  fetch(`surveys/${fileName}`)
    .then((response) => response.json())
    .then((data) => {
      displaySurvey(data);
    })
    .catch((error) => console.error("Error loading survey:", error));
}

function displaySurvey(data) {
  questionContainerElement.innerHTML = ""; // Clear existing content

  const title = document.createElement("h2");
  title.textContent = data.title;
  questionContainerElement.appendChild(title);

  const questionsList = document.createElement("div");
  const answers = {}; // Object to store user answers

  // Create button
  const button = document.createElement("button");
  button.type = "submit";
  button.textContent = "Submission"; // Set button text

  data.questions.forEach((question) => {
    const questionLabel = document.createElement("label");
    questionLabel.setAttribute("for", `${question.id || question.text}`); // Use ID or text as label 'for' attribute
    questionLabel.innerHTML = question.text; // Set the label content

    let answerElement;

    if (question.type === "text") {
      answerElement = document.createElement("input");
      answerElement.setAttribute("type", "text");
      answerElement.setAttribute('required', '');

      // Check for cookie values for name and email (optional)
      if (question.text ==="name") {

        const name = getCookie("name");
        if (name) {
          answers[question.text] = name;
          answerElement.value = name;
        }
      }
       else if (question.text === "email") {
        const emailCookie = getCookie("email");
        if (emailCookie) {
          answers[question.text] = emailCookie;
          answerElement.value = emailCookie;
        }
      }
    }  else if (question.type === "multiple-choice") {
      answerElement = document.createElement("select");
      question.options.forEach((option) => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;
        answerElement.appendChild(optionElement);
         // Initially select the first option
  answerElement.selectedIndex = 0;
  // Pre-populate answers object with the default selected value
  answers[question.text] = answerElement.value;

      });
    }else if(question.type==="text-area"){
      answerElement = document.createElement("textarea");
      answerElement.required = question.required || false; // Set required based on question property
      answerElement.rows = 5; // Set the number of visible rows
      answerElement.cols = 40; // Set the number of visible columns
      answerElement.placeholder= "Write your text here...";
      answerElement.setAttribute('required', '');

    }
    
    else {
      console.warn(`Unsupported question type: ${question.type}`);
      // Handle unsupported question types (optional)
    }

    answerElement.setAttribute("id", `${question.id || question.text}`); // Use ID or text as element ID
    answerElement.setAttribute("question", question.text);

    answerElement.addEventListener("change", (event) => {
      answers[question.text] = event.target.value;
    });

    questionContainerElement.appendChild(questionLabel);
    questionContainerElement.appendChild(answerElement);
  });

  questionContainerElement.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const surveyData = answers;
  

    saveSurveyResults(surveyData); // Call the function to save data
  });

  questionContainerElement.appendChild(questionsList);
  questionContainerElement.append(button);
  questionContainerElement.style.display = "block";
}
loadSurveyData();

// Function to get a cookie value by name
function getCookie(name) {
  const value = `; `;
  const documentCookie = document.cookie;
  const parts = documentCookie.split(value);
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i].split('=');
    if (part[0].trim() === name) {
      return decodeURIComponent(part[1]); // Decode the cookie value
    }
  }
  return null; // Return null if cookie is not found
}

// Function to set a cookie
function setCookie(name, value, expirationDays) {
  const expires = new Date();
  expires.setDate(expires.getDate() + expirationDays);
  const cookieValue = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/`;
  document.cookie = cookieValue;
}


//function to save results
function saveSurveyResults(data) {
  const name = data.answers ? data.answers["name"] : ""; // Handle potential missing answer
  const email = data.answers ? data.answers["email"] : ""; // Handle potential missing answer
  



    

     // Save user's name and email in cookies 
     if (name) {
      setCookie("name", name, 30); // Set cookie for 30 days
    }
    if (email) {
      setCookie("email", email, 30); // Set cookie for 30 days
    }
   


  fetch(`../Demo-backend/Contact.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(result => {
        console.log('Success:', result);
        if (result.status === 'success') {
         alert('Survey results saved successfully!');
          
        } else {
          alert('Error: ' + result.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error saving survey results: ' + error.message);
      });
  

 
}


