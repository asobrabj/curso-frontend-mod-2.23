import { act, fireEvent, render, screen, within } from '@testing-library/react'
import ModalAmount from "."
import { CurrencyProvider } from '../../context/Currencies'
import { HistoryProvider } from '../../context/History'
import axiosInstace from '../../service/axiosaInstace'
import ListCurrencies from '../ListCurrencies'

jest.mock('react', () => {
  const originalModule = jest.requireActual('react');
  return {
    ...originalModule,
    useContext: jest.fn(originalModule.useContext),
  };
});



test('valores iniciais dos inputs', () => {
  render(<ModalAmount />)
  expect(screen.getByRole('textbox',{name:/De/i}))
  expect(screen.getByRole('textbox',{name:/Para/i}))
  expect(screen.getByRole('textbox',{name:/Amount/i}))
  expect(screen.getByRole('button',{name:/Converter/i}))
})

test('valores iniciais dos inputs apos alterações', async () => {
 render(<CurrencyProvider><ModalAmount /></CurrencyProvider>)
  const inputTo = screen.getByRole('textbox',{name:/De/i}) as HTMLInputElement
  const inputFrom = screen.getByRole('textbox',{name:/Para/i}) as HTMLInputElement
  const inputAmount = screen.getByRole('textbox', { name: /Amount/i }) as HTMLInputElement

  act(() => {
    fireEvent.change(inputTo, {target: {value:'USD'}})
    fireEvent.change(inputFrom, { target: {value:'GBP'}})
    fireEvent.change(inputAmount, { target: {value:'1000'}})
  })

  expect(inputTo.value).toBe("USD")
  expect(inputFrom.value).toBe("GBP")
  expect(inputAmount.value).toBe("1000")
})

test('deve reinderizar o elemento result', async () => {
  render(<CurrencyProvider><HistoryProvider><ModalAmount /></HistoryProvider></CurrencyProvider>)
  const paragraph = screen.getByTitle('result') as HTMLParagraphElement
  expect(paragraph.textContent).toBe('')

  const inputTo = screen.getByRole('textbox',{name:/De/i}) as HTMLInputElement
  const inputFrom = screen.getByRole('textbox',{name:/Para/i}) as HTMLInputElement
  const inputAmount = screen.getByRole('textbox', { name: /Amount/i }) as HTMLInputElement
  const button = screen.getByRole('button', { name: /Converter/i }) as HTMLButtonElement
  
  jest.spyOn(axiosInstace, 'get').mockResolvedValueOnce({
    data: {
      conversion_result: '10.00',
    },
  });

  act(() => {
    fireEvent.change(inputTo, {target: {value:'USD'}})
    fireEvent.change(inputFrom, { target: {value:'GBP'}})
    fireEvent.change(inputAmount, { target: { value: '1000' } })
    fireEvent.click(button)
  })
  const resutElement = await screen.findByText("1000.00 USD equivalem a: 10.00 GBP") as HTMLParagraphElement
  expect(resutElement.textContent).toBe("1000.00 USD equivalem a: 10.00 GBP");
  
  
})
 

test('deve reinderizar menssagems de erro', async () => {
  render(<CurrencyProvider><HistoryProvider><ModalAmount /></HistoryProvider></CurrencyProvider>)
  const containerInput = screen.getByTestId('container-input')
  expect(containerInput).toBeInTheDocument()

  let messageInicial: HTMLElement|null = within(containerInput).getByText(/Digite uma moeda/i)
  expect(containerInput.contains(messageInicial)).toBeTruthy();
  
  const inputTo = screen.getByRole('textbox',{name:/De/i}) as HTMLInputElement

  act(() => {
    fireEvent.change(inputTo, { target: { value: "US"  }})
  })

  let messageErroDigitacao:HTMLElement|null = within(containerInput).getByText(/Moeda inválida/i)
  messageInicial = within(containerInput).queryByText(/Digite uma moeda/i)

  expect(containerInput.contains(messageErroDigitacao)).toBeTruthy();
  expect(containerInput.contains(messageInicial)).toBeFalsy();
  expect(inputTo.value).toBe('US')

  act(() => {
    fireEvent.change(inputTo, { target: { value: "AAA"  }})
  })

  const messageErroMoedaInexistente = screen.getByText(/Moeda não suportada/i)
  messageInicial = within(containerInput).queryByText(/Digite uma moeda/i)
  messageErroDigitacao = within(containerInput).queryByText(/Moeda inválida/i)

  expect(containerInput.contains(messageErroMoedaInexistente)).toBeTruthy();
  expect(containerInput.contains(messageErroDigitacao)).toBeFalsy();
  expect(containerInput.contains(messageInicial)).toBeFalsy();
  expect(inputTo.value).toBe('AAA')
  
})

test('useEffect', async () => {
  render(<CurrencyProvider><ModalAmount /><ListCurrencies request='to' /></CurrencyProvider>);

  const inputTo = screen.getByRole('textbox', { name: /De/i }) as HTMLInputElement;
  expect(inputTo.value).toBe('');

  const li = screen.getAllByTitle('li-currency')[0] as HTMLLIElement  

  act(() => {
    fireEvent.click(li)
  })

  expect(inputTo.value).toBe(li.textContent)

 
});


