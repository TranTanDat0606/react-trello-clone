import { Card, Button, Tooltip, Popconfirm } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import { Draggable, Droppable } from "@hello-pangea/dnd";
import type { ICardItem, IListItem } from "../type";
import SimpleCard from "./SimpleCard";
import { useTrelloContext } from "../contexts/trello-context";

interface TrelloListProps {
  index: number;
  listItem: IListItem;
  cards: ICardItem[];
}

const TrelloList = ({ index, listItem, cards }: TrelloListProps) => {
  const { handleAddCard, handleDeleteList } = useTrelloContext();

  return (
    <Draggable draggableId={listItem.id.toString()} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="todoList">
          <Droppable droppableId={listItem.id.toString()} type="CARD" direction="vertical">
            {(provided) => (
              <Card
                key={listItem.id}
                title={listItem.title}
                size="small"
                extra={
                  <>
                    <Tooltip title="Add a card">
                      <Button
                        shape="circle"
                        icon={<PlusOutlined />}
                        style={{ margin: 10 }}
                        onClick={() => handleAddCard(listItem.id)}
                      />
                    </Tooltip>

                    <Popconfirm
                      title="Delete the task"
                      description="Are you sure to delete this task?"
                      onConfirm={() => handleDeleteList(listItem.id)}
                      onCancel={() => {}}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Tooltip title="Delete this list">
                        <Button shape="circle" icon={<DeleteOutlined />} />
                      </Tooltip>
                    </Popconfirm>
                  </>
                }
                style={{ width: 300 }}
              >
                <div ref={provided.innerRef} {...provided.droppableProps} className="trelloList_content">
                  {cards.map((card, cardIndex) => {
                    return <SimpleCard key={card.id} index={cardIndex} card={card} listId={listItem.id.toString()} />;
                  })}
                  {provided.placeholder}
                </div>
              </Card>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default TrelloList;
