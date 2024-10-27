import React from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { GripVertical, Trash2 } from "lucide-react";
import { StrictModeDroppable } from "../utils/StrictModeDroppable";

const SurveyPreview = ({ questions, onQuestionsChange, onDeleteQuestion }) => {
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    onQuestionsChange(items);
  };

  const renderQuestionContent = (question) => {
    switch (question.type) {
      case "shortText":
        return (
          <input
            type="text"
            placeholder="Short answer"
            className="w-full p-2 border rounded"
          />
        );
      case "longText":
        return (
          <textarea
            placeholder="Long answer"
            className="w-full p-2 border rounded h-24"
            rows={4}
          />
        );
      case "multipleChoice":
      case "checkboxList":
        return (
          <div>
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type={
                    question.type === "multipleChoice" ? "radio" : "checkbox"
                  }
                  id={`${question.id}-${index}`}
                  name={question.id}
                  className="mr-2"
                />
                <label htmlFor={`${question.id}-${index}`}>{option}</label>
              </div>
            ))}
          </div>
        );
      default:
        return <p>Unsupported question type: {question.type}</p>;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StrictModeDroppable droppableId="questions">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {questions.map((question, index) => (
              <Draggable
                key={question.id}
                draggableId={question.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="bg-white p-6 mb-4 rounded shadow flex items-start"
                  >
                    <div {...provided.dragHandleProps} className="mr-4 pt-1">
                      <GripVertical className="cursor-move text-gray-400" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <span className="font-medium mr-2">q{index + 1}</span>
                          <h3 className="text-lg font-semibold">
                            {question.text}
                          </h3>
                        </div>
                        <button
                          className="text-red-500"
                          onClick={() => onDeleteQuestion(question.id)}
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                      {renderQuestionContent(question)}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
};

export default SurveyPreview;
