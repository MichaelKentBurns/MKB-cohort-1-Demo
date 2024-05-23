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

  const answers = {}; // Object to store user answers

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

    questionInput.addEventListener('change',(event)=>{
      answers[question.text]=event.target.value;
    });
 

    // Append the label and input to the div
    questionsList.appendChild(questionLabel);
    questionsList.appendChild(questionInput);


    
  });

  
  questionContainerElement.addEventListener('submit',(event)=>{
    event.preventDefault(); // Prevent default form submission behavior
    const surveyData = {
      title: data.title,
      // questions: data.questions,
      answers: answers // Add the collected answers object
    };
   saveSurveyResults(surveyData); // Call the function to save data
    console.log(surveyData)
  })

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
  });
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
