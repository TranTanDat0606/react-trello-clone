// hash object
export const mockData = {
  columns: ["list-1", "list-2", "list-3"],

  lists: {
    "list-1": {
      id: "list-1",
      title: "Todo",
      cards: ["card-1", "card-2"],
    },
    "list-2": {
      id: "list-2",
      title: "Doing",
      cards: ["card-3", "card-4"],
    },
    "list-3": {
      id: "list-3",
      title: "Done",
      cards: ["card-5"],
    },
  },

  cards: {
    "card-1": { id: "card-1", title: "Learn React", description: "Hooks, State, Props" },
    "card-2": { id: "card-2", title: "Learn Context API", description: "Provider/Consumer" },
    "card-3": { id: "card-3", title: "Build Trello App", description: "Drag & Drop feature" },
    "card-4": { id: "card-4", title: "Fix DnD Bug", description: "Reorder problem" },
    "card-5": { id: "card-5", title: "Deploy to Vercel", description: "CI/CD test" },
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
