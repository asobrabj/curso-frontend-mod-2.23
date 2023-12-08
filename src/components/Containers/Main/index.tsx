import { useState } from 'react';
import { MdCurrencyExchange, MdListAlt } from 'react-icons/md';
import Currencies from '../Currencies';
import History from '../History';
import * as S from './styles';

export default function Main() {
  const [history, setHistory] = useState<boolean>(false);

  return (
    <S.Container>
      <S.ContainerButton>
        <button
          type='button'
          title='converter moedas'
          onClick={() => setHistory(false)}
        >
          <MdCurrencyExchange />
        </button>
        <button
          type='button'
          title='historico de conversões'
          onClick={() => setHistory(true)}
        >
          <MdListAlt />
        </button>
      </S.ContainerButton>
      {!history ? <Currencies /> : <History />}
    </S.Container>
  );
}
