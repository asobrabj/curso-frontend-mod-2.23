import { useHistory } from '../../../context/History';
import * as S from './styles';

export default function History() {
  const { history } = useHistory();

  return (
    <S.Container>
      <S.Title>Historico de conversões</S.Title>
      {history?.length && (
        <S.Table>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>De</th>
                <th>Para</th>
                <th>Valor</th>
                <th>Resultado</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{item.to}</td>
                  <td>{item.from}</td>
                  <td>{item.amount}</td>
                  <td>{item.result}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </S.Table>
      )}
    </S.Container>
  );
}
