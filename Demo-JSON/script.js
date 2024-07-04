const surveyListElement = document.getElementById("survey-list");
const questionContainerElement = document.getElementById("question-container");

// Global variable to get local domain
const localDomain = window.location.origin;

// Function to load survey data from a file
function loadSurveyData(fileName) {
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
      answerElement.required = question.required || false; // Set required based on question property
    } else if (question.type === "multiple-choice") {
      answerElement = document.createElement("select");
      question.options.forEach((option) => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;
        answerElement.appendChild(optionElement);
      });
    }else if(question.type==="text-area"){
      answerElement = document.createElement("textarea");
      answerElement.required = question.required || false; // Set required based on question property
      answerElement.rows = 5; // Set the number of visible rows
      answerElement.cols = 40; // Set the number of visible columns
      answerElement.textContent = "Write your text here...";

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
    const surveyData = {
      title: data.title,
      answers: answers,
    };

    saveSurveyResults(surveyData); // Call the function to save data
  });

  questionContainerElement.appendChild(questionsList);
  questionContainerElement.append(button);
  questionContainerElement.style.display = "block";
}


//function to save results
function saveSurveyResults(data) {
  const firstName = data.answers ? data.answers["What's your first name?"] : ""; // Handle potential missing answer
  const filename = `${firstName ? firstName+" responses "+data.title : 'unknown'}-${Date.now()}.json`; // Use firstName if available, fallback to 'unknown'
  const jsonData = JSON.stringify(data, null, 2); // Stringify data with indentation

 

  // Create a pre element to display formatted JSON
  const jsonDisplay = document.createElement('pre');
  jsonDisplay.textContent = jsonData;
  document.body.appendChild(jsonDisplay);


  // Create a button to trigger "Save As"
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save Survey Results (JSON)';
  document.body.appendChild(saveButton);

  saveButton.addEventListener('click', () => {
    const blob = new Blob([jsonData], { type: 'application/json' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = filename;
    downloadLink.style.display = 'none'; // Hide the link visually
    document.body.appendChild(downloadLink);
    downloadLink.click();
    URL.revokeObjectURL(downloadLink.href); // Revoke the object URL after download


  fetch(`../Demo-backend/`, {
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
          //window.location.href = 'http://localhost/dashboard/MKB/cohort1/MKB-cohort-1-Demo/Demo-JSON/display.html';
        } else {
          alert('Error: ' + result.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error saving survey results: ' + error.message);
      });
  });

 
}
function populateSurveyList() {
  const surveyListElement = document.getElementById("survey-list");
  surveyListElement.innerHTML = ""; // Clear existing content
  const getFilesURL = "../Demo-backend/GetFiles.php";

  fetch(getFilesURL)
    .then(response => response.json())
    .then(data => {
      const list = document.createElement("ul");
      data.forEach((survey) => {
        const listItem = document.createElement("li");
        listItem.textContent = survey.title || survey.name + ".json" || 'Unknown Survey'; // Use title or name if available, fallback to 'Unknown Survey'
        listItem.addEventListener("click", () => {
          // Hide remaining list items
          surveyListElement.querySelectorAll('li').forEach(item => item.style.display = 'none');
          // Load survey data (optional)
          loadSurveyData(survey.id || survey.name + ".json"); 
        });
        list.appendChild(listItem);
      });
      surveyListElement.appendChild(list);
    })
    .catch(error => {
      console.error('Error fetching survey list:', error);
      alert('Error retrieving survey list from server.');
    });
}

populateSurveyList(); // Call the function to populate the list on load







