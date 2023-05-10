import { initDb } from "../init-db.js";
const dbName = "myBook";

export function initDatabase() {
  const loadDb = localStorage.getItem(dbName);
  if (loadDb === null) {
    localStorage.setItem(dbName, JSON.stringify(initDb));
    console.log("No database found, initializing database");
  } else {
    console.log("Database was found, good luck!");
  }
}

export function readDb() {
  return JSON.parse(localStorage.getItem(dbName));
}

export function getAllSkills() {
  const dbInfo = JSON.parse(localStorage.getItem(dbName));
  return dbInfo.skills;
}

export function getSkill(skillName) {
  const dbInfo = JSON.parse(localStorage.getItem(dbName));
  let result = dbInfo.skills.filter((sk) => sk.skillName === skillName);
  return result[0];
}
