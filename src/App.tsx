import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { mockData } from "./data";
import type { ITrello } from "./type";

import { DragDropContext, Droppable, type DropResult } from "@hello-pangea/dnd";

import TrelloList from "./components/TrelloList";

function App() {
  const [trello, setTrello] = React.useState<ITrello>(mockData);

  const onDragEnd = (result: DropResult) => {
    console.log("onDragEnd", { result });

    const { source, destination, draggableId, type } = result;

    if (!destination) return;
    const { index: sourceIndex, droppableId: sourceDroppableId } = source;
    const { index: destinationIndex, droppableId: destinationDroppableId } = destination;

    // Todo: drap drop list
    if (type === "LIST") {
      setTrello((prevState) => {
        const newColumn = [...prevState.columns];
        newColumn.splice(sourceIndex, 1);
        newColumn.splice(destinationIndex, 0, draggableId);
        return { ...prevState, columns: newColumn };
      });
      return;
    }

    // Todo: drap drop card in same list
    if (sourceDroppableId === destinationDroppableId) {
      setTrello((prevState) => {
        const newCard = prevState.lists[sourceDroppableId].cards;
        newCard.splice(sourceIndex, 1);
        newCard.splice(destinationIndex, 0, draggableId);

        return {
          ...prevState,
          lists: {
            ...prevState.lists,
            [sourceDroppableId]: {
              ...prevState.lists[sourceDroppableId],
              cards: newCard,
            },
          },
        };
      });
      return;
    }

    // Todo: drap drop card different list
    setTrello((prevState) => {
      prevState.lists[sourceDroppableId].cards.splice(sourceIndex, 1);
      prevState.lists[destinationDroppableId].cards.splice(destinationIndex, 0, draggableId);

      return {
        ...prevState,
        lists: prevState.lists,
      };
    });

    // Todo: delete list
    // Todo: delete card
    // Todo: add list
    // Todo: add card
  };

  return (
    <>
      <header>
        <div className="header__container">
          <div className="dashboard" style={{ width: 30, flexShrink: 0 }}>
            <span role="img" aria-label="bar-chart" style={{ fontSize: 15 }} className="anticon anticon-bar-chart">
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="bar-chart"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm-600-80h56c4.4 0 8-3.6 8-8V560c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v144c0 4.4 3.6 8 8 8zm152 0h56c4.4 0 8-3.6 8-8V384c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v320c0 4.4 3.6 8 8 8zm152 0h56c4.4 0 8-3.6 8-8V462c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v242c0 4.4 3.6 8 8 8zm152 0h56c4.4 0 8-3.6 8-8V304c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v400c0 4.4 3.6 8 8 8z" />
              </svg>
            </span>
          </div>
          <div className="header__logo" style={{ cursor: "pointer" }} />
          <div className="header__right">
            <div className="header__avatar">
              <img src="/assets/images/avatar-user.png" alt="Avatar" />
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="container">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="all-lists" type="LIST" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  // style={{ backgroundColor: snapshot.isDraggingOver ? "blue" : "grey" }}
                  className="listContainer"
                  {...provided.droppableProps}
                >
                  {trello.columns.map((column: string, columnIndex: number) => {
                    const listItem = trello.lists[column] || {};
                    const cards = (listItem.cards || []).map((cardId: string) => trello.cards[cardId]);

                    return <TrelloList key={listItem.id} index={columnIndex} listItem={listItem} cards={cards} />;
                  })}

                  {provided.placeholder}
                  <Button type="text">
                    <PlusOutlined /> Add another list
                  </Button>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </main>
    </>
  );
}

export default App;
