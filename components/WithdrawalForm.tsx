
import React, { useState } from 'react';
import { WithdrawalRequest } from '../types';
import { LoadingSpinnerIcon } from './icons';

interface WithdrawalFormProps {
  onSubmit: (data: WithdrawalRequest) => void;
  isLoading: boolean;
}

const WithdrawalForm: React.FC<WithdrawalFormProps> = ({ onSubmit, isLoading }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [currency, setCurrency] = useState<'RUB' | 'USD' | 'EUR'>('RUB');
  const [bankDetails, setBankDetails] = useState('');
  
  const [errors, setErrors] = useState<Partial<Record<keyof WithdrawalRequest, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof WithdrawalRequest, string>> = {};
    if (!accountNumber.trim()) newErrors.accountNumber = 'Номер счета обязателен';
    if (!fullName.trim()) newErrors.fullName = 'ФИО обязательно';
    if (amount === '' || amount <= 0) newErrors.amount = 'Сумма должна быть больше нуля';
    if (!bankDetails.trim()) newErrors.bankDetails = 'Банковские реквизиты обязательны';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        accountNumber,
        fullName,
        amount: Number(amount),
        currency,
        bankDetails,
      });
    }
  };

  const InputField = ({ id, label, value, onChange, error, placeholder, type = 'text' }: {id: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, error?: string, placeholder?: string, type?: string}) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full bg-gray-900/50 border ${error ? 'border-red-500' : 'border-gray-600'} rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-shadow`}
        />
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-yellow-400 mb-6">Заявка на вывод средств</h2>
      <InputField id="accountNumber" label="Номер вашего счета" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} error={errors.accountNumber} placeholder="JB-12345678" />
      <InputField id="fullName" label="Ваше ФИО" value={fullName} onChange={e => setFullName(e.target.value)} error={errors.fullName} placeholder="Иванов Иван Иванович" />
      
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">Сумма вывода</label>
        <div className="flex">
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={e => setAmount(e.target.value === '' ? '' : parseFloat(e.target.value))}
            placeholder="100000"
            className={`w-full bg-gray-900/50 border ${errors.amount ? 'border-red-500' : 'border-gray-600'} rounded-l-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-shadow z-10`}
          />
          <select 
            id="currency"
            value={currency}
            onChange={e => setCurrency(e.target.value as 'RUB' | 'USD' | 'EUR')}
            className="bg-gray-700 border border-gray-600 text-white font-semibold rounded-r-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 appearance-none -ml-px"
            >
            <option>RUB</option>
            <option>USD</option>
            <option>EUR</option>
          </select>
        </div>
        {errors.amount && <p className="text-red-400 text-xs mt-1">{errors.amount}</p>}
      </div>

      <div>
        <label htmlFor="bankDetails" className="block text-sm font-medium text-gray-300 mb-1">Банковские реквизиты</label>
        <textarea
            id="bankDetails"
            value={bankDetails}
            onChange={e => setBankDetails(e.target.value)}
            rows={4}
            placeholder="Название банка, БИК, номер счета..."
            className={`w-full bg-gray-900/50 border ${errors.bankDetails ? 'border-red-500' : 'border-gray-600'} rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-shadow`}
        />
        {errors.bankDetails && <p className="text-red-400 text-xs mt-1">{errors.bankDetails}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center bg-yellow-500 text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-500/50 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:scale-100"
      >
        {isLoading ? (
            <>
                <LoadingSpinnerIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" />
                Обработка...
            </>
        ) : (
          'Отправить заявку'
        )}
      </button>
    </form>
  );
};

export default WithdrawalForm;
