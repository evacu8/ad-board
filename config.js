export const DB_URI =
  process.env.NODE_ENV === "production"
    ? process.env.DB_URL
    : "mongodb://localhost:27017/adBoardDB";
