import { Avatar, Card, Popconfirm, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Draggable } from "@hello-pangea/dnd";
import type { SimpleCardProps } from "../type";
import { useTrelloContext } from "../contexts/trello-context";
import FormModal from "./FormModal";

const { Meta } = Card;

const SimpleCard = ({ index, card, listId }: SimpleCardProps) => {
  const { trello, handleDeleteCard, openEditModal } = useTrelloContext();

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
                className="h-[130px]"
              />
            }
            actions={[
              <Tooltip title="Setting">
                <SettingOutlined key="setting" />
              </Tooltip>,
              <Tooltip title="Edit">
                <EditOutlined
                  key="edit"
                  onClick={() => {
                    openEditModal(card.id);
                  }}
                  // }
                />
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
            <Meta title={card.title} description={card.description} className="card-body mt-[-6px]!" />{" "}
            <div className="main-Card flex justify-end">
              <Avatar.Group
                max={{
                  count: 2,
                  style: {
                    color: "#f56a00",
                    backgroundColor: "#fde3cf",
                  },
                }}
                size="large"
              >
                {card.members.map((memberId) => {
                  const memberInfo = trello.members[memberId];
                  if (!memberInfo) return null;
                  return (
                    <Tooltip title={memberInfo.name} placement="top" key={memberInfo.id}>
                      <Avatar src={memberInfo.avatar} icon={<UserOutlined />} />
                    </Tooltip>
                  );
                })}
              </Avatar.Group>
            </div>
          </Card>
          <FormModal />
        </div>
      )}
    </Draggable>
  );
};

export default SimpleCard;
