import { Avatar, Card, Popconfirm, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined, SettingOutlined } from "@ant-design/icons";
import { Draggable } from "@hello-pangea/dnd";
import type { ICardItem } from "../type";
import { useTrelloContext } from "../contexts/trello-context";

const { Meta } = Card;

interface SimpleCardProps {
  index: number;
  card: ICardItem;
  listId: string;
}

const SimpleCard = ({ index, card, listId }: SimpleCardProps) => {
  const { handleDeleteCard, handleChangeCard } = useTrelloContext();

  return (
    <Draggable draggableId={card.id.toString()} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="card">
          <Card
            key={card.id}
            cover={
              <img
                draggable={false}
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <Tooltip title="Setting">
                <SettingOutlined key="setting" />
              </Tooltip>,
              <Tooltip title="Edit">
                <EditOutlined key="edit" onClick={() => handleChangeCard(card.id, listId)} />
              </Tooltip>,
              <Popconfirm
                title="Delete the card"
                description="Are you sure to delete this card"
                onConfirm={() => handleDeleteCard(card.id, listId)}
                okText="Yes"
                cancelText="No"
                className="nl-10"
              >
                <Tooltip title="Delete">
                  <DeleteOutlined key="delete" />
                </Tooltip>
              </Popconfirm>,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
              title={card.title}
              description={card.description}
              className="card-body mt-[-6px]!"
            />
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default SimpleCard;
