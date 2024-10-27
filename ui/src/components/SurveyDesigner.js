import React, { useState } from "react";
import QuestionDesigner from "./QuestionDesigner";
import SurveyPreview from "./SurveyPreview";

function SurveyDesigner() {
  const [questions, setQuestions] = useState([]);

  const addQuestion = (newQuestion) => {
    setQuestions([
      ...questions,
      {
        ...newQuestion,
        id: Date.now().toString(),
        options:
          newQuestion.type === "multipleChoice" ||
          newQuestion.type === "checkboxList"
            ? newQuestion.options.length > 0
              ? newQuestion.options
              : ["Option 1", "Option 2", "Option 3"]
            : [],
      },
    ]);
  };

  const deleteQuestion = (questionId) => {
    setQuestions(questions.filter((question) => question.id !== questionId));
  };

  return (
    <div className="flex h-screen bg-gray-100 p-6">
      <div className="w-1/3 bg-blue-50 rounded-lg p-6 mr-6 shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">
          Question Designer
        </h2>
        <QuestionDesigner addQuestion={addQuestion} />
      </div>
      <div className="w-2/3 bg-green-50 rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-green-800">
          Survey Preview
        </h2>
        <SurveyPreview
          questions={questions}
          onQuestionsChange={setQuestions}
          onDeleteQuestion={deleteQuestion}
        />
      </div>
    </div>
  );
}

export default SurveyDesigner;
