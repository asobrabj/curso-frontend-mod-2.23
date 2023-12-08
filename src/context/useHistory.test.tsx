import { act, renderHook } from "@testing-library/react-hooks";
import { HistoryProvider, useHistory } from "./History";


const DATA = {
  to: "USD",
  from: "GBP",
  amount: "100",
  result: "1000",
  date: '2023-12-07 10:37:17',
}

test('useCurrency retorna estado inicial correto', async() => {
  const wrapper: React.FC = ({ children }:{children?:React.ReactNode} ) => (
    <HistoryProvider>{children}</HistoryProvider>
  );

  const { result } = renderHook(() => useHistory(), { wrapper });
  const {history, setHistory} = result.current

  expect(history).toEqual([]);
  expect(typeof setHistory).toBe('function');
});

test('useCurrency retorna novo estado apos alterações sem dados nos localstorage', async() => {
  const wrapper: React.FC = ({ children }:{children?:React.ReactNode} ) => (
    <HistoryProvider>{children}</HistoryProvider>
  );

  const { result } = renderHook(() => useHistory(), { wrapper });
  act(() => {
    result.current.setHistory(DATA)
  });

  expect(result.current.history).toEqual([DATA])
});

test('useCurrency retorna novo estado apos alterações com dados nos localstorage', async() => {
  const wrapper: React.FC = ({ children }:{children?:React.ReactNode} ) => (
    <HistoryProvider>{children}</HistoryProvider>
  );

  const { result } = renderHook(() => useHistory(), { wrapper });
  act(() => {
    result.current.setHistory(DATA)
  });
  
  expect(result.current.history).toEqual([DATA, DATA])
});