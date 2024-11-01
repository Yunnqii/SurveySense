import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { saveSurvey } from "../utils/serverComm";
import QuestionDesigner from "./QuestionDesigner";
import SurveyPreview from "./SurveyPreview";

/**
 * SurveyDesigner component handles the creation and management of surveys
 */
function SurveyDesigner() {
  const { currentUser } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  /**
   * Add a new question to the survey
   * @param {Object} newQuestion - The question to add
   */
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

  /**
   * Delete a question from the survey
   * @param {string} questionId - ID of the question to delete
   */
  const deleteQuestion = (questionId) => {
    setQuestions(questions.filter((question) => question.id !== questionId));
  };

  /**
   * Handle the survey save operation
   * Checks for user authentication and validates survey content
   */
  const handleSaveSurvey = async () => {
    // Check if user is authenticated
    if (!currentUser) {
      document.getElementById("signin-modal").showModal();
      return;
    }

    // Validate survey has questions
    if (questions.length === 0) {
      setSaveError("Survey cannot be empty");
      return;
    }

    try {
      setIsSaving(true);
      setSaveError(null);
      await saveSurvey(questions);
      alert("Survey saved successfully!");
    } catch (error) {
      setSaveError(error.message);
    } finally {
      setIsSaving(false);
    }
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
        {/* Header with save button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-indigo-600">
            Survey Preview
          </h2>
          <button
            onClick={handleSaveSurvey}
            disabled={isSaving || questions.length === 0}
            className={`
              px-4 py-2 rounded-md text-white font-medium
              ${
                isSaving || questions.length === 0
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }
              transition-colors duration-200
            `}
          >
            {isSaving ? "Saving..." : "Save Survey"}
          </button>
        </div>

        {/* Error message display */}
        {saveError && (
          <div className="mb-4 p-2 bg-red-50 text-red-600 rounded-md text-sm">
            {saveError}
          </div>
        )}

        {/* Survey preview section */}
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
