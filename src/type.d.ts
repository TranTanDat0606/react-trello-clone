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
  tasks: {
    [key: string]: IListItem;
  };
  cards: {
    [key: string]: ICardItem;
  };
}
