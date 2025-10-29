
import React from 'react';
import { SubmissionStatus } from '../types';
import { LoadingSpinnerIcon, SuccessIcon, ErrorIcon } from './icons';

interface StatusDisplayProps {
  status: SubmissionStatus;
  message: string | null;
  error: string | null;
  onReset: () => void;
}

const StatusDisplay: React.FC<StatusDisplayProps> = ({ status, message, error, onReset }) => {
  const renderContent = () => {
    switch (status) {
      case SubmissionStatus.LOADING:
        return (
          <div className="flex flex-col items-center text-center">
            <LoadingSpinnerIcon className="w-16 h-16 text-yellow-500 animate-spin mb-4" />
            <h3 className="text-xl font-semibold text-white">Обрабатываем ваш запрос...</h3>
            <p className="text-gray-400">Пожалуйста, подождите.</p>
          </div>
        );
      case SubmissionStatus.SUCCESS:
        return (
          <div className="flex flex-col items-center text-center">
            <SuccessIcon className="w-20 h-20 text-green-400 mb-4" />
            <h3 className="text-2xl font-bold text-green-400">Заявка принята!</h3>
            <p className="text-gray-200 mt-2 leading-relaxed max-w-md">{message}</p>
          </div>
        );
      case SubmissionStatus.ERROR:
        return (
          <div className="flex flex-col items-center text-center">
            <ErrorIcon className="w-16 h-16 text-red-500 mb-4" />
            <h3 className="text-xl font-semibold text-red-500">Ошибка!</h3>
            <p className="text-gray-300">{error}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="py-8 min-h-[400px] flex flex-col items-center justify-center text-center">
      {renderContent()}
      {(status === SubmissionStatus.SUCCESS || status === SubmissionStatus.ERROR) && (
        <button
          onClick={onReset}
          className="mt-8 bg-gray-700 text-yellow-400 font-bold py-2 px-6 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-600/50 transition-colors"
        >
          {status === SubmissionStatus.SUCCESS ? 'Создать новую заявку' : 'Попробовать снова'}
        </button>
      )}
    </div>
  );
};

export default StatusDisplay;
