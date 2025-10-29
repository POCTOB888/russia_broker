
export interface WithdrawalRequest {
  accountNumber: string;
  fullName: string;
  amount: number;
  currency: 'RUB' | 'USD' | 'EUR';
  bankDetails: string;
}

export enum SubmissionStatus {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR,
}
