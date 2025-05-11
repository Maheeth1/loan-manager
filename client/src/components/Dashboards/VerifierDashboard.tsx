// src/pages/verifierDashboard.tsx
import React, { useEffect, useState } from 'react';
import axios from '../../api';

interface Application {
  id: number;
  fullName: string;
  loanTenure: number;
  employmentStatus: string;
  loanAmount: number;
  status: string;
  submittedAt: string;
}

const VerifierDashboard = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get('/');
        setApplications(res.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div>
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Verifier Dashboard</h1>
            {loading ? (
                <p>Loading applications...</p>
                ) : (
                <table className="min-w-full bg-white border border-gray-200 shadow-md">
                <thead>
                    <tr>
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">Full Name</th>
                    <th className="px-4 py-2 border">Loan Tenure</th>
                    <th className="px-4 py-2 border">Loan Amount</th>
                    <th className="px-4 py-2 border">Employment Status</th>
                    <th className="px-4 py-2 border">Status</th>
                    <th className="px-4 py-2 border">Submitted At</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map(app => (
                    <tr key={app.id}>
                        <td className="px-4 py-2 border">{app.id}</td>
                        <td className="px-4 py-2 border">{app.fullName}</td>
                        <td className="px-4 py-2 border">{app.loanTenure}</td>
                        <td className="px-4 py-2 border">₹{app.loanAmount}</td>
                        <td className="px-4 py-2 border">{app.employmentStatus}</td>
                        <td className="px-4 py-2 border">{app.status}</td>
                        <td className="px-4 py-2 border">{app.submittedAt}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            )}
        </div>
    </div>
  );
};

export default VerifierDashboard;
