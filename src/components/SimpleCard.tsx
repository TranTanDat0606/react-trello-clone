import { Avatar, Card, Popconfirm, Spin, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined, LoadingOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Draggable } from "@hello-pangea/dnd";
import type { SimpleCardProps } from "../types/type";
import { useTrelloContext } from "../contexts/trello-context";
import FormModal from "./FormModal";
import React from "react";

const { Meta } = Card;
const imageCache = new Set<string>();

const SimpleCard = ({ index, card, listId }: SimpleCardProps) => {
  const { trello, handleDeleteCard, openEditModal } = useTrelloContext();
  const [loading, setLoading] = React.useState<boolean>(() => !imageCache.has(card.image));

  return (
    <Draggable draggableId={card.id.toString()} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="card">
          <Card
            loading={loading}
            key={card.id}
            cover={
              <div style={{ position: "relative", width: "100%" }}>
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <Spin size="large" indicator={<LoadingOutlined spin />} />
                  </div>
                )}
                <img
                  onLoad={() => {
                    imageCache.add(card.image);
                    setLoading(false);
                  }}
                  draggable={false}
                  alt="example"
                  src={card.image}
                  className="h-[130px] w-full object-cover rounded-t-lg"
                  style={{
                    opacity: loading ? 0 : 1,
                    transition: "opacity 0.5s ease-in-out",
                  }}
                />
              </div>
              // <img draggable={false} alt="example" src={card.image} className="h-[130px] w-full object-cover" />
            }
            actions={[
              <Tooltip title="Setting">
                <SettingOutlined key="setting" />
              </Tooltip>,

              <Tooltip title="Edit">
                <EditOutlined key="edit" onClick={() => openEditModal(card.id)} />
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
            <div className="main-Card flex justify-end mb-[5px]!">
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
