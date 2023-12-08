import { useState } from 'react';
import ListCurrencies from '../../ListCurrencies';
import * as S from './styles';

export default function Currencies() {
  const [openList, setOpenList] = useState<boolean>(true);
  const handleOpen = () => {
    setOpenList(v => !v);
  };
  return (
    <>
      <S.Title>Conversor de moedas</S.Title>
      <S.ContainerGrid>
        <ListCurrencies
          request='to'
          title='De'
          onClick={handleOpen}
          listOpen={openList}
        />
        <ListCurrencies
          request='from'
          title='Para'
          onClick={handleOpen}
          listOpen={!openList}
        />
      </S.ContainerGrid>
    </>
  );
}
