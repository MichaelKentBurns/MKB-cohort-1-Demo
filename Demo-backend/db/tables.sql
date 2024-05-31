-- Create Surveys Table
CREATE TABLE Surveys (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL
);

-- Create Questions Table
CREATE TABLE Questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    survey_id INT NOT NULL,
    question_text VARCHAR(255) NOT NULL,
    FOREIGN KEY (survey_id) REFERENCES Surveys(id)
);

-- Create Answers Table
CREATE TABLE Answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    survey_id INT NOT NULL,
    question_id INT NOT NULL,
    answer_text VARCHAR(255) NOT NULL,
    FOREIGN KEY (survey_id) REFERENCES Surveys(id),
    FOREIGN KEY (question_id) REFERENCES Questions(id)
);
