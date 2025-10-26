// hash object
export const mockData = {
  columns: ["task-1", "doing-1", "done-1"],

  lists: {
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
      title: "Task 1-1",
      description: "This is card task-1-1",
    },
    "doing-1-1": {
      id: "doing-1-1",
      title: "Task 2-1",
      description: "This is card doing-1-1",
    },
    "doing-1-2": {
      id: "doing-1-2",
      title: "Task 2-2",
      description: "This is card doing-1-2",
    },
    "done-1-1": {
      id: "done-1-1",
      title: "Task 3-1",
      description: "This is card done-1-1",
    },
    "done-1-2": {
      id: "done-1-2",
      title: "Task 3-2",
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
