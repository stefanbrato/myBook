export const initDb = {
  dbName: "myBook",
  lastSaveDate: "",
  version: "",
  character: {
    level: 0,
  },
  skills: [
    {
      skillName: "Willpower",
      tasks: [
        {
          taskId: "1",
          taskName: "First Task",
          taskInstruction: "Click me Daily!",
          exp: 0,
        },
      ],
      exp: 0,
      expToLvl: 100,
      level: 0,
    },
  ],
  settings: {},
};
