const surveyListElement = document.getElementById("survey-list");
const questionContainerElement = document.getElementById("question-container");

// Function to load survey data from a file
function loadSurveyData(fileName) {
  fetch(`surveys/${fileName}`)
    .then((response) => response.json())
    .then((data) => {
      displaySurvey(data);
    })
    .catch((error) => console.error("Error loading survey:", error));
}

// Function to display the survey questions
function displaySurvey(data) {
  questionContainerElement.innerHTML = ""; // Clear existing content

  const title = document.createElement("h2");
  title.textContent = data.title;
  questionContainerElement.appendChild(title);

  const questionsList = document.createElement("div");


  //create button
  const button = document.createElement("button");
  button.type = "submit";
  button.textContent = "Submission"; // Set button text

  data.questions.forEach((question) => {
    // Create a label element
    const questionLabel = document.createElement("label");
    questionLabel.setAttribute("for", "username"); // Set the 'for' attribute
    questionLabel.innerHTML = question.text; // Set the label content with bold text

    // Create an input element
    const questionInput = document.createElement("input");
    questionInput.setAttribute("type", "text");
    questionInput.setAttribute("question", "question");
    questionInput.setAttribute("id", "question");
    questionInput.required = true; // Set the input as required

    

    // Append the label and input to the div
    questionsList.appendChild(questionLabel);
    questionsList.appendChild(questionInput);


    
  });
  questionContainerElement.appendChild(questionsList);
  questionContainerElement.append(button);

  questionContainerElement.style.display = "block";
}

// Function to populate the survey list based on available files
function populateSurveyList() {
  const surveyList = [
    // Replace with actual file names from your "surveys" directory
    "frontend.json",
    "backend.json",
    "fullstack.json",
  ];

  const surveyListElement = document.getElementById("survey-list");
  surveyListElement.innerHTML = ""; // Clear existing content

  const list = document.createElement("ul");
  surveyList.forEach((fileName) => {
    const listItem = document.createElement("li");
    listItem.textContent = fileName;
    listItem.addEventListener("click", () => loadSurveyData(fileName));
    list.appendChild(listItem);
  });
  surveyListElement.appendChild(list);
}

populateSurveyList(); // Call the function to populate the list on load
