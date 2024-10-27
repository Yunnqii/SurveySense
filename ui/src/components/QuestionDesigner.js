import React, { useState } from "react";
import { PlusCircle, MinusCircle, Plus } from "lucide-react";

const QuestionDesigner = ({ addQuestion }) => {
  const [questionType, setQuestionType] = useState("shortText");
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([]);

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleRemoveOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (questionText.trim()) {
      addQuestion({ type: questionType, text: questionText, options });
      setQuestionText("");
      setOptions([]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow"
    >
      <div className="relative">
        <label
          htmlFor="questionType"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Question Type
        </label>
        <select
          id="questionType"
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="shortText">Short Text</option>
          <option value="longText">Long Text</option>
          <option value="multipleChoice">Multiple Choice</option>
          <option value="checkboxList">Checkbox List</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="questionText"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Question Text
        </label>
        <input
          type="text"
          id="questionText"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Enter question text"
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      {(questionType === "multipleChoice" ||
        questionType === "checkboxList") && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Options
          </label>
          {options.map((option, index) => (
            <div key={index} className="flex items-center">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={() => handleRemoveOption(index)}
                className="ml-2 text-red-600 hover:text-red-800"
              >
                <MinusCircle size={20} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddOption}
            className="flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <PlusCircle size={20} className="mr-1" />
            Add Option
          </button>
        </div>
      )}
      <button
        type="submit"
        className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Plus size={20} className="mr-1" />
        Add Question
      </button>
    </form>
  );
};

export default QuestionDesigner;
