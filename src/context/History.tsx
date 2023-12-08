/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';

export interface IDataCurrency {
  to: string;
  from: string;
  amount: string;
  result: string;
  date: string;
}

export interface IHistoryContext {
  setHistory: (data: IDataCurrency) => void;
  history?: Array<IDataCurrency>;
}

interface IHistoryProvider {
  children: React.ReactNode;
}

const HistoryContext = createContext<IHistoryContext>({} as IHistoryContext);

export const HistoryProvider: React.FC<IHistoryProvider> = ({ children }) => {
  const [history, setHistoryState] = useState<Array<IDataCurrency>>();

  useEffect(() => {
    const currentData = window.localStorage.getItem('history');
    const newData = currentData ? JSON.parse(currentData) : [];
    setHistoryState(newData);
  }, []);

  const setHistory = (data: IDataCurrency) => {
    const currentData = window.localStorage.getItem('history');
    const newData = currentData ? JSON.parse(currentData) : [];
    newData.push(data);
    setHistoryState(newData);
    window.localStorage.setItem('history', JSON.stringify(newData));
    return;
  };

  return (
    <HistoryContext.Provider value={{ setHistory, history }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  return useContext(HistoryContext);
};
