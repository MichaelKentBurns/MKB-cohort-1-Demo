# MKB-cohort-1-Demo
Where the MichaelKentBurns.com students in cohort-1 can demonstrate what they have learned.
This repository serves as the foundation for a collaborative project by the first cohort of MichaelKentBurns.com students.  Here, you'll gain practical experience by building an application to collect feedback on your learning journey.

## About MichaelKentBurns.com
MichaelKentBurns.com is a burgeoning training platform designed to empower individuals with valuable skills.  (Visit: https://MichaelKentBurns.com/)

## Purpose of this repository

We just completed the first cohort of students and they are eager to put their knowledge into practice.  This project provides a valuable hands-on experience for students to showcase their recently acquired skills.  Working as a team, you'll develop an application that gathers feedback on your learning experiences.  The application will feature a form that collects data points such as student identification and a series of feedback questions.  Upon form submission, the application will generate a JSON file containing the responses.  This file will be saved within the "responses" directory of your local repository.  Additional functionalities may be introduced throughout the project through designated "issues" within this repository.

## Requirements:

Work together to build out this repository with an application that will ask each of you to answer a set of questions about your learning experience.  It will present a form that identifies you as a student, and asks a series of questions.  When you fill out the form, the page will construct a json file with the results and save that file in the responses directory in your copy of this repository.  There will be additional requirements added as issues in this repository.  

## Collaboration Guidelines:
1. Each team member will clone this repository and do their part of the work in their copy.
2. Everything done will be in response to an issue in this repository.  That is, Michael will create the first issue, and you as a team will design the solution together by creating new issues and then completing them. 
3. Before any changes can be pushed a test script should be created in the test directory and the test should be run and results left in the test/results directory.  Those files should be commited as well.
4. Every commit of any material will identify the issue by number and title that is addressed by the commit.  You may commit many times to an issue until it is complete and closed.
5. The work to be done for an issue will be described in the issue, and the team will use the issue comments to work together to agree on what needs to be done and who will do the work.  
6. After each commit and push to this original repository, the other team members should review the changes, verify the test results, and approve or suggest changes needed.  

## Team roles:

### Project owner: Michael
This person defines the requirements and completion criteria.  The owner also invites the initial people to join the team, and assigns initial roles.
### Team lead: Philemon 
Oversees the creation of high-level issues, ensuring each team member has a clear starting point for their assigned tasks.
Acts as a central point of communication and facilitates collaboration among team members.
### Web page author: Efatha  
Develops the HTML page responsible for collecting user input through a well-structured form.
Ensures the user interface is intuitive and user-friendly.
### Database designer: Ash
Defines the initial structure for the JSON file that will store student feedback data. This may optionally include the creation of a MySQL database schema.
### Documentation: Efatha
While each team member will write some documentation during the project, this person is responsible for putting it all together and reviewing the documentation.  The documentation starts with this README.md file.
### Front end lead: Philemon
Orchestrates the efforts of the Web Page Author and oversees any additional front-end elements, potentially including JavaScript code.
Manages the process of transforming user input from the form into the designated JSON file format.
### Back end lead: Ash
Develops the back-end code responsible for processing the generated JSON files. This may involve functions to insert or update data records within a MySQL database (if applicable).
Oversees the deployment of the final application onto the designated demo platform (demo.MichaelKentBurns.com), enabling public access and future student use.

## Getting Started

### Prerequisites
- Git
- SQL

### Installation
1. Clone the repository
    ```bash
    git clone https://github.com/michaelkentburns/mkb-cohort-1-demo.git
    ```
2. Install dependencies
    ```bash
    npm install
    ```

## Skills Demonstrated

This project involves a variety of skills, including:

* **Front-End Development:** Building a user-friendly interface with HTML, CSS, and potentially JavaScript ([https://github.com/MichaelKentBurns/MKB-cohort-1-Demo/tree/main/Demo-survey])(Front-End Development Tutorial).
* **Back-End Development:** Processing form submissions and potentially storing data in a database (if applicable), start with ([https://github.com/MichaelKentBurns/MKB-cohort-1-Demo/tree/main/Demo-JSON])(JSON), then dive deep into the Back-End ([https://github.com/MichaelKentBurns/MKB-cohort-1-Demo/tree/main/Demo-backend])(Back-End Development Tutorial).
* **Testing:** Writing unit tests to ensure code quality ([https://github.com/MichaelKentBurns/MKB-cohort-1-Demo/tree/main/test])(Unit Testing Documentation).
* **Collaboration:** Working effectively in a team using Git for version control ([https://github.com/MichaelKentBurns/MKB-cohort-1-Demo?tab=readme-ov-file#collaboration-guidelines])(Git Documentation).

### License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Acknowledgements
Special thanks to MichaelKentBurns.com and all the cohort-1 students for their contributions.
