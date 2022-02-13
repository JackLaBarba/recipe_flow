const recipes = [
  {
    title: "Boring onion soup",
    ingredients: ["1 onion", "water"],
    steps: [
      {
        id: "1",
        title: "chop",
        description: "Chop 1 onion into 1cm pieces.",
        imageSource:
          "https://images.pexels.com/photos/4198169/pexels-photo-4198169.jpeg",
        parentIds: [],
      },
      {
        id: "2",
        title: "boil",
        description: "Boil 1 quart of water",
        imageSource:
          "https://images.pexels.com/photos/11069886/pexels-photo-11069886.jpeg",
        parentIds: [],
      },
      {
        id: "3",
        title: "cook",
        description:
          "Add the chopped onion to the water and cook for 10 minutes.",
        imageSource:
          "https://images.pexels.com/photos/8599738/pexels-photo-8599738.jpeg",
        parentIds: ["1", "2"],
      },
      {
        id: "4",
        title: "serve",
        imageSource:
          "https://images.pexels.com/photos/3296680/pexels-photo-3296680.jpeg",
        parentIds: ["3"],
      },
    ],
  },
];

export default recipes;
