import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const items = ["Task 1", "Task 2", "Task 3"];

function App() {
  const [list, setList] = React.useState(items);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newList = Array.from(list);
    const [moved] = newList.splice(result.source.index, 1);
    newList.splice(result.destination.index, 0, moved);
    setList(newList);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {list.map((item, index) => (
              <Draggable key={item} draggableId={item} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      margin: "8px",
                      padding: "12px",
                      background: "#fff",
                      borderRadius: "8px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      ...provided.draggableProps.style,
                    }}
                  >
                    {item}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
