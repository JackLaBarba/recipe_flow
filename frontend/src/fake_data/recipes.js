const recipes = [
  {
    title: "Demo onion soup",
    description:
      "This onion soup isn't very delicious but it's good for demonstrating a user experience.",
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
  {
    title: "Hot salad",
    description:
      "A hot salad. Perfect for winter nights and demonstrating user experiences.",
    ingredients: ["1 head of lettuce", "2 tomatoes", "1 cucumber"],
    steps: [
      {
        id: "1",
        title: "chop",
        description: "Chop 1 head of lettuce.",
        imageSource:
          "https://images.pexels.com/photos/4198169/pexels-photo-4198169.jpeg",
        parentIds: [],
      },
      {
        id: "2",
        title: "chop",
        description: "Chop 2 tomatoes in 1cm square pieces.",
        imageSource:
          "https://images.pexels.com/photos/4198169/pexels-photo-4198169.jpeg",
        parentIds: [],
      },
      {
        id: "3",
        title: "chop",
        description: "Chop 1 cucumber into .5cm thick medallions.",
        imageSource:
          "https://images.pexels.com/photos/4198169/pexels-photo-4198169.jpeg",
        parentIds: [],
      },
      {
        id: "4",
        title: "combine",
        description:
          "Combine the lettuce, tomato, and cucumber in a microwave-safe bowl",
        imageSource:
          "https://images.pexels.com/photos/4198169/pexels-photo-4198169.jpeg",
        parentIds: ["1", "2", "3"],
      },
      {
        id: "5",
        title: "heat",
        description: "Microwave the salad on High for 15 minutes.",
        imageSource:
          "https://images.pexels.com/photos/4198169/pexels-photo-4198169.jpeg",
        parentIds: ["4"],
      },
      {
        id: "6",
        title: "dressing",
        description: "Mix chocolate sauce and sriracha",
        imageSource:
          "https://images.pexels.com/photos/4198169/pexels-photo-4198169.jpeg",
        parentIds: [],
      },
      {
        id: "7",
        title: "dress",
        description: "Add the dressing to the hot salad",
        imageSource:
          "https://images.pexels.com/photos/4198169/pexels-photo-4198169.jpeg",
        parentIds: ["5", "6"],
      },
      {
        id: "8",
        title: "serve",
        description: "Carefully place the hot salad in serving bowls.",
        imageSource:
          "https://images.pexels.com/photos/4198169/pexels-photo-4198169.jpeg",
        parentIds: ["7"],
      },
    ],
  },
];

export default recipes;
