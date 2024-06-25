// data.js

const testCategories = [
    {
      categoryName: "Тести ЗНО",
      id: "1",
      tests: [
        {
          testName: "Тест 1",
          id: "101",
          questions: [
            {
              questionText: "What is the capital of France?",
              options: ["Paris", "London", "Berlin", "Rome"],
              correctAnswer: "Paris",
              additionalInfo: "Paris is the capital and most populous city of France."
            },
            {
              questionText: "What is the capital of Germany?",
              options: ["Vienna", "Berlin", "Zurich", "Munich"],
              correctAnswer: "Berlin",
              additionalInfo: "Berlin is the capital and largest city of Germany."
            },
            // Add more questions as needed
          ]
        },
        // Add more tests as needed
      ]
    },
    {
        categoryName: "Тести НМТ",
        id: "2",
        tests: [
          {
            testName: "Capital Cities",
            id: "201",
            questions: [
              {
                questionText: "What is the capital of France?",
                options: ["Paris", "London", "Berlin", "Rome"],
                correctAnswer: "Paris",
                additionalInfo: "Paris is the capital and most populous city of France."
              },
              {
                questionText: "What is the capital of Germany?",
                options: ["Vienna", "Berlin", "Zurich", "Munich"],
                correctAnswer: "Berlin",
                additionalInfo: "Berlin is the capital and largest city of Germany."
              },
              // Add more questions as needed
            ]
          },
          // Add more tests as needed
        ]
      },
      {
        categoryName: "Авторські тести",
        id: "3",
        tests: [
          {
            testName: "Тест 1",
            id: "101",
            questions: [
              {
                questionText: "What is the capital of France?",
                options: ["Paris", "London", "Berlin", "Rome"],
                correctAnswer: "Paris",
                additionalInfo: "Paris is the capital and most populous city of France."
              },
              {
                questionText: "What is the capital of Germany?",
                options: ["Vienna", "Berlin", "Zurich", "Munich"],
                correctAnswer: "Berlin",
                additionalInfo: "Berlin is the capital and largest city of Germany."
              },
              // Add more questions as needed
            ]
          },
          // Add more tests as needed
        ]
      }
    // Add more categories as needed
  ];
  
  export default testCategories;
  