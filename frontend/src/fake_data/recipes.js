const recipes = [
  {
    title: "Boring onion soup",
    ingredients: ["1 onion", "water"],
    steps: [
      {
        id: "1",
        title: "chop",
        parentIds: [],
      },
      {
        id: "2",
        title: "boil",
        parentIds: [],
      },
      {
        id: "3",
        title: "cook",
        parentIds: ["1", "2"],
      },
      {
        id: "4",
        title: "serve",
        parentIds: ["3"],
      },
    ],
  },
];

export default recipes;
