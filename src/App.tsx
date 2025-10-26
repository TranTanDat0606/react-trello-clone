import { Button, Card, Input, Tooltip } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";

import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useTrelloContext } from "./contexts/trello-context";

import Header from "./layouts/Header";
import TrelloList from "./components/TrelloList";

function App() {
  const { trello, handleAddList, showForm, setShowForm, setTitleList, onDragEnd } = useTrelloContext();

  return (
    <>
      <Header />

      <main>
        <div className="container">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="all-lists" type="LIST" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  // style={{ backgroundColor: snapshot.isDraggingOver ? "blue" : "grey" }}
                  className="listContainer "
                  {...provided.droppableProps}
                >
                  {trello.columns.map((column: string, columnIndex: number) => {
                    const listItem = trello.tasks[column] || {};
                    const cards = (listItem.cards || []).map((cardId: string) => trello.cards[cardId]);

                    return <TrelloList key={listItem.id} index={columnIndex} listItem={listItem} cards={cards} />;
                  })}

                  {provided.placeholder}

                  {showForm ? (
                    <Card
                      className="min-w-[350px] mt-[5px]!"
                      actions={[
                        <Button type="primary" onClick={() => handleAddList()}>
                          Add List
                        </Button>,
                        <Tooltip title="Cancel">
                          <CloseOutlined onClick={() => setShowForm(false)} />
                        </Tooltip>,
                      ]}
                    >
                      <Input
                        required
                        autoFocus
                        placeholder="Enter a list title"
                        className="max-w-[305px]! m-[20px]! ml-[15px]!"
                        onChange={(e) => setTitleList(e.target.value)}
                      />
                    </Card>
                  ) : (
                    <div className="addList">
                      <Button type="text" onClick={() => setShowForm(true)}>
                        <PlusOutlined /> Add another list
                      </Button>{" "}
                    </div>
                  )}
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
