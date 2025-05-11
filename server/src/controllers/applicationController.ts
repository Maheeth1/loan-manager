// server/src/controllers/applicationController.ts

import { Request, Response } from 'express';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';

// Function to initialize the database
const initializeDB = async () => {
  const db = await open({
    filename: path.join(__dirname, '../../../data/loans.db'), // adjusted path to root data directory
    driver: sqlite3.Database,
  });

  // Create table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS loan_applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT NOT NULL,
      loanAmount TEXT NOT NULL,
      loanTenure TEXT NOT NULL,
      employmentStatus TEXT,
      reasonForLoan TEXT,
      employmentAddress TEXT,
      agreeTerms INTEGER,
      agreeDisclosure INTEGER,
      submittedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  return db;
};

// Controller function to handle form submission
export const submitLoanApplication = async (req: Request, res: Response) => {
  const {
    fullName,
    loanAmount,
    loanTenure,
    employmentStatus,
    reasonForLoan,
    employmentAddress,
    agreeTerms,
    agreeDisclosure,
  } = req.body;

  try {
    const db = await initializeDB();

    await db.run(
      `
      INSERT INTO loan_applications (
        fullName, loanAmount, loanTenure,
        employmentStatus, reasonForLoan, employmentAddress,
        agreeTerms, agreeDisclosure
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        fullName,
        loanAmount,
        loanTenure,
        employmentStatus,
        reasonForLoan,
        employmentAddress,
        agreeTerms ? 1 : 0,
        agreeDisclosure ? 1 : 0,
      ]
    );

    res.status(201).json({ message: 'Application submitted successfully!' });
  } catch (error) {
    console.error('Error saving application:', error);
    res.status(500).json({ error: 'Failed to submit application.' });
  }
};

// Controller function to get all loan applications
export const getAllApplications = async (req: Request, res: Response) => {
  try {
    const db = await initializeDB();
    const applications = await db.all('SELECT * FROM loan_applications ORDER BY submittedAt');
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Failed to fetch applications.' });
  }
};
