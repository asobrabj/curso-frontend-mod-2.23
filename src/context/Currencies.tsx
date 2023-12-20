import { createContext, useContext, useState } from 'react';
import instance from '../service/axiosaInstace';

export interface ICurrencyContext {
  to: string;
  setTo: React.Dispatch<React.SetStateAction<string>>;
  from: string;
  setFrom: React.Dispatch<React.SetStateAction<string>>;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  fecthConversion: (
    to: string,
    from: string,
    amount: string,
  ) => Promise<string>;
  error: boolean;
}

interface ICurrencyProvider {
  children: React.ReactNode;
}

const CurrencyContext = createContext<ICurrencyContext>({} as ICurrencyContext);

export const CurrencyProvider: React.FC<ICurrencyProvider> = ({ children }) => {
  const [error, setError] = useState<boolean>(false);
  const [to, setTo] = useState<string>('');
  const [from, setFrom] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const fecthConversion = async (
    to: string,
    from: string,
    amount: string,
  ): Promise<string> => {
    try {
      const response = await instance.get(`${to}/${from}/${amount}`);
      return response.data.conversion_result;
    } catch (err) {
      setError(true);
      return 'Erro na conversão';
    }
  };

  return (
    <CurrencyContext.Provider
      value={{
        fecthConversion,
        error,
        amount,
        from,
        to,
        setTo,
        setAmount,
        setFrom,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  return useContext(CurrencyContext);
};
