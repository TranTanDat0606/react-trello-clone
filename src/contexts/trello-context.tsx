import React from "react";
import type { IFormInput, ITrello } from "../type";
import { mockData } from "../mocks/data";
import type { DropResult } from "@hello-pangea/dnd";
import { message } from "antd";

type TrelloContextType = {
  trello: ITrello;
  handleAddList: () => void;
  handleAddCard: (data: IFormInput) => void;
  handleDeleteList: (listID: string) => void;
  handleDeleteCard: (cardID: string, listID: string) => void;
  handleChangeCard: (data: IFormInput) => void;
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setTitleList: React.Dispatch<React.SetStateAction<string>>;
  onDragEnd: (result: DropResult) => void;
  openAddModal: (listID: string) => void;
  openEditModal: (cardID: string) => void;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEditingCard: boolean;
};

export const TrelloContext = React.createContext<TrelloContextType | undefined>(undefined);

export const TrelloProvider = ({ children }: React.PropsWithChildren) => {
  const [trello, setTrello] = React.useState<ITrello>(mockData);
  const [showForm, setShowForm] = React.useState(false);
  const [titleList, setTitleList] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentListId, setCurrentListId] = React.useState<string>("");
  const [currentCardID, setCurrentCardID] = React.useState<string>("");
  const [isEditingCard, setIsEditingCard] = React.useState(false);

  const openAddModal = (listId: string) => {
    setIsEditingCard(false);
    setCurrentListId(listId);
    setIsModalOpen(true);
  };

  const openEditModal = (cardID: string) => {
    setCurrentCardID(cardID);
    setIsEditingCard(true);
    setIsModalOpen(true);
  };

  // Todo: Drap and Drop
  const onDragEnd = (result: DropResult) => {
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
  };

  // Todo: add list
  const handleAddList = () => {
    setTrello((prevState) => {
      const newListId = `lists${Object.keys(prevState.lists).length + 1}`;
      const newList = {
        id: newListId,
        title: titleList,
        cards: [],
      };

      return {
        ...prevState,
        columns: [...prevState.columns, newListId], // thêm ID list mới
        lists: {
          ...prevState.lists,
          [newListId]: newList, // thêm list mới vào object lists
        },
      };
    });
    setShowForm(false);
  };

  // Todo: add Card
  const handleAddCard = (data: IFormInput) => {
    setTrello((prevState) => {
      const idList = prevState.lists[currentListId];
      const newCardId = `task-${Date.now()}`;

      const newCard = {
        id: newCardId,
        title: data.title,
        description: `This is ${data.desc}`,
        members: data.members,
      };

      return {
        ...prevState,
        lists: {
          ...prevState.lists,
          [currentListId]: {
            ...idList,
            cards: [...idList.cards, newCardId],
          },
        },
        cards: {
          ...prevState.cards,
          [newCardId]: newCard,
        },
      };
    });

    setCurrentListId("");
    setIsModalOpen(false);
  };

  // Todo: delete list
  const handleDeleteList = (listID: string) => {
    setTrello((prevState) => {
      const newList = prevState.columns;
      newList.splice(
        newList.findIndex((indexList) => indexList === listID),
        1
      );
      return {
        ...prevState,
      };
    });
    message.success("Đã xác nhận xóa list thành công!");
  };

  // Todo: delete card
  const handleDeleteCard = (cardID: string, listID: string) => {
    setTrello((prevState) => {
      const findList = prevState.lists[listID];
      const deleteCard = findList.cards.filter((id) => id !== cardID);

      const updatedLists = {
        ...prevState.lists,
        [listID]: {
          ...findList,
          cards: deleteCard,
        },
      };

      const updatedCardsData = { ...prevState.cards };
      delete updatedCardsData[cardID];

      return {
        ...prevState,
        lists: updatedLists,
        cards: updatedCardsData,
      };
    });
    message.success("Đã xác nhận xóa card thành công!");
  };

  // Todo: change card
  const handleChangeCard = (data: IFormInput) => {
    setTrello((prevState) => {
      const newCardId = prevState.cards[currentCardID].id;

      const newCard = {
        id: newCardId,
        title: data.title,
        description: `This is ${data.desc}`,
        members: data.members,
      };

      return {
        ...prevState,
        cards: {
          ...prevState.cards,
          [newCardId]: newCard,
        },
      };
    });
    setIsModalOpen(false);
  };

  return (
    <TrelloContext.Provider
      value={{
        trello,
        handleAddList,
        handleAddCard,
        showForm,
        setShowForm,
        setTitleList,
        onDragEnd,
        handleDeleteList,
        handleDeleteCard,
        handleChangeCard,
        openAddModal,
        openEditModal,
        isModalOpen,
        setIsModalOpen,
        isEditingCard,
      }}
    >
      {children}
    </TrelloContext.Provider>
  );
};

export const useTrelloContext = () => {
  const context = React.useContext(TrelloContext);
  if (!context) {
    throw new Error("useTrelloContext must be used within a TrelloProvider");
  }
  return context;
};
