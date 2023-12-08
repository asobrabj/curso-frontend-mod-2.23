import Main from './components/Containers/Main';
import Modal from './components/Modal';
import ModalAmount from './components/ModalAmount';
import { CurrencyProvider } from './context/Currencies';
import { HistoryProvider } from './context/History';
import { GlobalStyle } from './styles/globalStyle';

export default function App() {
  return (
    <CurrencyProvider>
      <HistoryProvider>
        <GlobalStyle />
        <Modal>
          <Main />
        </Modal>
        <ModalAmount />
      </HistoryProvider>
    </CurrencyProvider>
  );
}