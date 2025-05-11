import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let db: Database | null = null;

export const initDB = async (): Promise<Database> => {
  if (db) return db;

  db = await open({
    filename: './loan.db',
    driver: sqlite3.Database
  });

  await db.run(`
    CREATE TABLE IF NOT EXISTS loan_applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT,
      loanAmount TEXT,
      loanTenure TEXT,
      employmentStatus TEXT,
      reasonForLoan TEXT,
      employmentAddress TEXT,
      agreeTerms INTEGER,
      agreeDisclosure INTEGER,
      submittedAt TEXT
    )
  `);

  return db;
};
