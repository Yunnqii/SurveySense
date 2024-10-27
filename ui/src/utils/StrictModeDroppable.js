import { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";

export const StrictModeDroppable = ({
  children,
  droppableId,
  type = "DEFAULT",
}) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <Droppable droppableId={droppableId} type={type}>
      {(provided, snapshot) => children(provided, snapshot)}
    </Droppable>
  );
};
