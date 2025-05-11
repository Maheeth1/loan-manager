import React, { useState, useEffect } from 'react';
import api from '../api';

interface FormData {
  fullName: string;
  loanAmount: string;
  loanTenure: string;
  employmentStatus: string;
  reasonForLoan: string;
  employmentAddress: string;
  agreeTerms: boolean;
  agreeDisclosure: boolean;
}

const ApplicationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    loanAmount: '',
    loanTenure: '',
    employmentStatus: '',
    reasonForLoan: '',
    employmentAddress: '',
    agreeTerms: false,
    agreeDisclosure: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionMessage(null);
  
    const newErrors: { [key: string]: string } = {};
  
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!formData.loanAmount.trim()) newErrors.loanAmount = 'Loan amount is required.';
    if (!formData.loanTenure.trim()) newErrors.loanTenure = 'Loan tenure is required.';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms.';
    if (!formData.agreeDisclosure) newErrors.agreeDisclosure = 'You must agree to disclosure.';
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length > 0) return;
  
    try {
      const response = await api.post('/', {
        fullName: formData.fullName,
        loanAmount: formData.loanAmount,
        loanTenure: formData.loanTenure,
        employmentStatus: formData.employmentStatus,
        reasonForLoan: formData.reasonForLoan,
        employmentAddress: formData.employmentAddress,
        agreeTerms: formData.agreeTerms,
        agreeDisclosure: formData.agreeDisclosure,
      });
  
      if (response.status === 200 || response.status === 201) { // Assuming successful responses are 200 or 201
        setSubmissionMessage(response.data?.message || 'Application submitted successfully!');
        setFormData({
          fullName: '',
          loanAmount: '',
          loanTenure: '',
          employmentStatus: '',
          reasonForLoan: '',
          employmentAddress: '',
          agreeTerms: false,
          agreeDisclosure: false,
        });
        setErrors({});
      } else {
        setSubmissionMessage(response.data?.error || 'Submission failed.');
      }
    } catch (error: any) {
      setSubmissionMessage('An unexpected error occurred.');
      console.error('Submission error:', error);
    }
  };

  return (
    <div>
      <div className="form-container">
        <h2 className="form-title">APPLY FOR A LOAN</h2>
        <form className="loan-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
                type="text"
                name="fullName"
                placeholder="Full name as it appears on bank account"
                value={formData.fullName}
                onChange={handleChange}
            />
            {errors.fullName && <p className="error-text">{errors.fullName}</p>}
            
            <input
                type="number"
                name="loanAmount"
                placeholder="How much do you need?"
                value={formData.loanAmount}
                onChange={handleChange}
            />
            {errors.loanAmount && <p className="error-text">{errors.loanAmount}</p>}
          </div>

          <div className="form-row">
            <input
              type="number"
              name="loanTenure"
              placeholder="Loan tenure (in months)"
              value={formData.loanTenure}
              onChange={handleChange}
            />
            {errors.loanTenure && <p className="error-text">{errors.loanTenure}</p>}

            <input
              type="text"
              name="employmentStatus"
              placeholder="Employment status"
              value={formData.employmentStatus}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <textarea
              name="reasonForLoan"
              placeholder="Reason for loan"
              value={formData.reasonForLoan}
              onChange={handleChange}
            />
            <input
              type="text"
              name="employmentAddress"
              placeholder="Employment address"
              value={formData.employmentAddress}
              onChange={handleChange}
            />
          </div>

          <div className="form-row checkboxes">
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="agree-terms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
              />
              <label htmlFor="agree-terms">
                I have read the important information and accept that by completing the application, I will be bound by the terms.
              </label>
              {errors.agreeTerms && <p className="error-text">{errors.agreeTerms}</p>}
            </div>

            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="agree-disclosure"
                name="agreeDisclosure"
                checked={formData.agreeDisclosure}
                onChange={handleChange}
              />
              <label htmlFor="agree-disclosure">
                Any personal and credit information obtained may be disclosed from time to time to other lenders, credit bureaus or other credit reporting agencies.
              </label>
              {errors.agreeDisclosure && <p className="error-text">{errors.agreeDisclosure}</p>}
            </div>
          </div>

          <button type="submit" className="submit-button">Submit</button>
          {submissionMessage && <p className="submission-message">{submissionMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
