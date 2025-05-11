import express from 'express';
import { submitLoanApplication, getAllApplications } from '../controllers/applicationController';

const router = express.Router();
// define your routes here
router.post('/', submitLoanApplication);
router.get('/', getAllApplications);


export default router; // ✅ this is the important part
