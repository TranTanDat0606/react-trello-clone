import React from "react";
import type { ITrello } from "../type";
import { mockData } from "../mocks/data";
import type { DropResult } from "@hello-pangea/dnd";
import { message } from "antd";

type TrelloContextType = {
  trello: ITrello;
  handleAddList: () => void;
  handleAddCard: (listID: string) => void;
  handleDeleteList: (listID: string) => void;
  handleDeleteCard: (cardID: string, listID: string) => void;
  handleChangeCard: (cardID: string, listID: string) => void;
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setTitleList: React.Dispatch<React.SetStateAction<string>>;
  onDragEnd: (result: DropResult) => void;
};

export const TrelloContext = React.createContext<TrelloContextType | undefined>(undefined);

export const TrelloProvider = ({ children }: React.PropsWithChildren) => {
  const [trello, setTrello] = React.useState<ITrello>(mockData);
  const [showForm, setShowForm] = React.useState(false);
  const [titleList, setTitleList] = React.useState("");

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
        const newCard = prevState.tasks[sourceDroppableId].cards;
        newCard.splice(sourceIndex, 1);
        newCard.splice(destinationIndex, 0, draggableId);

        return {
          ...prevState,
          lists: {
            ...prevState.tasks,
            [sourceDroppableId]: {
              ...prevState.tasks[sourceDroppableId],
              cards: newCard,
            },
          },
        };
      });
      return;
    }

    // Todo: drap drop card different list
    setTrello((prevState) => {
      prevState.tasks[sourceDroppableId].cards.splice(sourceIndex, 1);
      prevState.tasks[destinationDroppableId].cards.splice(destinationIndex, 0, draggableId);

      return {
        ...prevState,
        lists: prevState.tasks,
      };
    });
  };

  // Todo: add list
  const handleAddList = () => {
    setTrello((prevState) => {
      const newListId = `list${Object.keys(prevState.tasks).length + 1}`;
      const newList = {
        id: newListId,
        title: titleList,
        cards: [],
      };

      return {
        ...prevState,
        columns: [...prevState.columns, newListId], // thêm ID list mới
        lists: {
          ...prevState.tasks,
          [newListId]: newList, // thêm list mới vào object lists
        },
      };
    });
    setShowForm(false);
  };

  // Todo: add card
  const handleAddCard = (listID: string) => {
    setTrello((prevState) => {
      const idList = prevState.lists[listID];

      const newCardId = `card1-${Date.now()}`;

      const newCard = {
        id: newCardId,
        title: `Card1-${idList.cards.length + 1}`,
        description: `This is ${newCardId}`,
      };
      return {
        ...prevState,
        lists: {
          ...prevState.lists,
          [listID]: {
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
      const findList = prevState.tasks[listID];
      const deleteCard = findList.cards.filter((id) => id !== cardID);

      const updatedLists = {
        ...prevState.tasks,
        [listID]: {
          ...findList,
          cards: deleteCard,
        },
      };

      const updatedCardsData = { ...prevState.cards };
      delete updatedCardsData[cardID];

      return {
        ...prevState,
        tasks: updatedLists,
        cards: updatedCardsData,
      };
    });
    message.success("Đã xác nhận xóa card thành công!");
  };

  // Todo: change card
  const handleChangeCard = (cardID: string, listID: string) => {};

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
