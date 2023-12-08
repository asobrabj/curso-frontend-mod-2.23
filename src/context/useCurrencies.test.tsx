import { act, renderHook } from '@testing-library/react-hooks';
import axiosaInstace from '../service/axiosaInstace';
import { CurrencyProvider, useCurrency } from './Currencies';


test('useCurrency retorna estado inicial correto', async() => {
  const wrapper: React.FC = ({ children }:{children?:React.ReactNode} ) => (
    <CurrencyProvider>{children}</CurrencyProvider>
  );

  const { result } = renderHook(() => useCurrency(), { wrapper });
  const {to,from,amount,error,fecthConversion,setAmount,setFrom,setTo} = result.current

  expect(to).toBe('');
  expect(from).toBe('');
  expect(amount).toBe('');
  expect(typeof setTo).toBe('function');
  expect(typeof setFrom).toBe('function');
  expect(typeof setAmount).toBe('function');
  expect(typeof fecthConversion).toBe('function');
  expect(error).toBe(false);
});

const TO = 'USD'
const FROM = 'GBP'
const AMOUNT = '1000'


test('useCurrency retorna novo estado apos alterações', async() => {
  const wrapper: React.FC = ({ children }:{children?:React.ReactNode} ) => (
    <CurrencyProvider>{children}</CurrencyProvider>
  );

  const { result } = renderHook(() => useCurrency(), { wrapper });
   act(() => {
    result.current.setTo(TO);
    result.current.setFrom(FROM);
    result.current.setAmount(AMOUNT);
  });

  expect(result.current.to).toBe(TO);
  expect(result.current.from).toBe(FROM);
  expect(result.current.amount).toBe(AMOUNT);

});


test('useCurrency retorna resposta correta da api', async() => {
  const wrapper: React.FC = ({ children }:{children?:React.ReactNode} ) => (
    <CurrencyProvider>{children}</CurrencyProvider>
  );

  jest.spyOn(axiosaInstace, 'get').mockResolvedValueOnce({
    data: {
      conversion_result: '10.00',
    },
  });


  const { result } = renderHook(() => useCurrency(), { wrapper });
  const data = await result.current.fecthConversion(TO,FROM,AMOUNT)
  expect(data).toEqual("10.00");
});


test('useCurrency retorna erro da api', async() => {
  const wrapper: React.FC = ({ children }:{children?:React.ReactNode} ) => (
    <CurrencyProvider>{children}</CurrencyProvider>
  );

  const { result } = renderHook(() => useCurrency(), { wrapper });
  const data = await result.current.fecthConversion("TO","FROM",AMOUNT)
  expect(data).toEqual("Erro na conversão");
  expect(result.current.error).toBe(true)
});