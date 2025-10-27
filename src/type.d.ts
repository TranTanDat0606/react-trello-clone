export interface IListItem {
  id: string;
  title: string;
  cards: string[];
}

export interface ICardItem {
  id: string;
  title: string;
  description: string;
}

export interface ITrello {
  columns: string[];
  lists: {
    [key: string]: IListItem;
  };
  cards: {
    [key: string]: ICardItem;
  };
}

export interface IFormInput {
  title: string;
  desc: string;
  members: [];
}

export interface TrelloListProps {
  index: number;
  listItem: IListItem;
  cards: ICardItem[];
}
export interface SimpleCardProps {
  index: number;
  card: ICardItem;
  listId: string;
}
