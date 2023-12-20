import { useCurrency } from '../../context/Currencies';
import currencies from '../../model/listCurrencies';
import * as S from './styles';

interface IList {
  request: 'to' | 'from';
  title?: string;
  listOpen?: boolean;
  onClick?: () => void;
}

export default function ListCurrencies({
  request,
  title,
  listOpen,
  onClick,
}: IList) {
  const { setTo, setFrom } = useCurrency();

  const setValue = (value: string) => {
    if (request === 'to') {
      setTo(value);
    } else {
      setFrom(value);
    }
  };

  return (
    <S.Container>
      <S.Paragraph onClick={onClick}>{title}</S.Paragraph>
      <S.List $visible={listOpen}>
        {currencies && (
          <>
            {currencies.map(item => (
              <S.ItemList title='li-currency' onClick={() => setValue(item)} key={item}>
                {item}
              </S.ItemList>
            ))}
          </>
        )}
      </S.List>
    </S.Container>
  );
}
