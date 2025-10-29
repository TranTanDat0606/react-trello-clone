export interface IListItem {
  id: string;
  title: string;
  cards: string[];
}

export interface ICardItem {
  id: string;
  title: string;
  description: string;
  members: string[];
}

export interface IMember {
  id: string;
  name: string;
  avatar: string;
}

export interface ITrello {
  columns: string[];
  lists: {
    [key: string]: IListItem;
  };
  cards: {
    [key: string]: ICardItem;
  };
  members: { [key: string]: IMember };
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
