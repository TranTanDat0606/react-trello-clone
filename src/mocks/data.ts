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
  columns: ["task-1", "doing-1", "done-1"],

  tasks: {
    "task-1": {
      id: "task-1",
      title: "Task 1",
      cards: ["task-1-1"],
    },
    "doing-1": {
      id: "doing-1",
      title: "Doing 1",
      cards: ["doing-1-1", "doing-1-2"],
    },
    "done-1": {
      id: "done-1",
      title: "Done 1",
      cards: ["done-1-1", "done-1-2"],
    },
  },

  cards: {
    "task-1-1": {
      id: "task-1-1",
      title: "Card 1-1",
      description: "This is card task-1-1",
    },
    "doing-1-1": {
      id: "doing-1-1",
      title: "Card 2-1",
      description: "This is card doing-1-1",
    },
    "doing-1-2": {
      id: "doing-1-2",
      title: "Card 2-2",
      description: "This is card doing-1-2",
    },
    "done-1-1": {
      id: "done-1-1",
      title: "Card 3-1",
      description: "This is card done-1-1",
    },
    "done-1-2": {
      id: "done-1-2",
      title: "Card 3-2",
      description: "This is card done-1-2",
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
