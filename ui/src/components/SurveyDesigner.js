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
    <div className="grid grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-semibold text-indigo-600 mb-6">
          Question Designer
        </h2>
        <div className="bg-white rounded-lg shadow-md">
          <QuestionDesigner addQuestion={addQuestion} />
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-indigo-600 mb-6">
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
