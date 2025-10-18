// export const data = [
//   {
//     id: "list1",
//     title: "list1",
//     cards: [
//       {
//         id: "card1",
//         title: "Card1",
//         description: "Card1",
//       },
//     ],
//   },
//   {
//     id: "list2",
//     title: "list2",
//     cards: [
//       {
//         id: "card2-1",
//         title: "Card2-1",
//         description: "Card2-1",
//       },
//       {
//         id: "card2-2",
//         title: "Card2-2",
//         description: "Card2-2",
//       },
//     ],
//   },
// ];

/* add, update, delete, get with array 
delete card2-2 in list2 
-loop data to find list2
-loop cards in list2 -> find index of card2-2 -> delete it

const source = 0
const destination = 1

drap drop card in same list
- loop data to find list item 
- loop list.cards to find source index (sourceIndex)
- list.cards.splice(sourceIndex, 1) // delete source
- list.cards.splice(destination, 0) // add source
*/

// hash object
export const mockData = {
  columns: ["list1", "list2"],
  lists: {
    list1: {
      id: "list1",
      title: "List 1",
      cards: ["card1-1"],
    },
    list2: {
      id: "list2",
      title: "List 2",
      cards: ["card2-1", "card2-2"],
    },
  },

  cards: {
    "card1-1": {
      id: "card1-1",
      title: "Card 1-1",
      description: "This is card 1-1",
    },
    "card2-1": {
      id: "card2-1",
      title: "Card 2-1",
      description: "This is card 2-1",
    },
    "card2-2": {
      id: "card2-2",
      title: "Card 2-2",
      description: "This is card 2-2",
    },
  },
};

// data["key"].id

/* add, update, delete, get with array 

delete card2-2 in list2 
-loop data.columns

const source = 0
const destination = 1

drap drop card in same list
- data.lists['xxx'].cards
- data.lists['xxx'].cards to find index source (sourceIndex)
- list.cards.splice(sourceIndex, 1) // delete source
- list.cards.splice(destination, 0) // add source
*/
