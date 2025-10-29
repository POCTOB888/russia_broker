
import React, { useState, useCallback } from 'react';
import { WithdrawalRequest, SubmissionStatus } from './types';
import { generateConfirmationMessage } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';
import WithdrawalForm from './components/WithdrawalForm';
import StatusDisplay from './components/StatusDisplay';
import { GoldBarIcon } from './components/icons';

const App: React.FC = () => {
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>(SubmissionStatus.IDLE);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleWithdrawalSubmit = useCallback(async (data: WithdrawalRequest) => {
    setSubmissionStatus(SubmissionStatus.LOADING);
    setErrorMessage(null);
    setConfirmationMessage(null);

    try {
      const message = await generateConfirmationMessage(data.amount, data.currency, data.fullName);
      setConfirmationMessage(message);
      setSubmissionStatus(SubmissionStatus.SUCCESS);
    } catch (error) {
      console.error('Failed to generate confirmation:', error);
      setErrorMessage('Произошла ошибка при обработке вашего запроса. Пожалуйста, попробуйте еще раз.');
      setSubmissionStatus(SubmissionStatus.ERROR);
    }
  }, []);
  
  const handleReset = () => {
    setSubmissionStatus(SubmissionStatus.IDLE);
    setConfirmationMessage(null);
    setErrorMessage(null);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 sm:p-6 md:p-8">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-2xl bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-yellow-500/10 border border-gray-700 overflow-hidden transition-all duration-500">
           <div className="p-8 md:p-12">
            {submissionStatus !== SubmissionStatus.SUCCESS ? (
              <WithdrawalForm 
                isLoading={submissionStatus === SubmissionStatus.LOADING}
                onSubmit={handleWithdrawalSubmit} 
              />
            ) : (
              <StatusDisplay
                status={submissionStatus}
                message={confirmationMessage}
                error={errorMessage}
                onReset={handleReset}
              />
            )}
           </div>
           <div className="h-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
