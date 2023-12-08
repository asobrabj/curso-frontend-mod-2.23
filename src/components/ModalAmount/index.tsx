import { useEffect, useState } from 'react';
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { ICurrencyContext, useCurrency } from '../../context/Currencies';
import { useHistory } from '../../context/History';
import currencies from '../../model/listCurrencies';
import Modal from '../Modal';
import * as S from './styles';

export default function ModalAmount() {
  const { to, setTo, from, setFrom, amount, setAmount, fecthConversion } =
    useCurrency();
  const { setHistory } = useHistory();
  const [result, setResult] = useState<string>('');
  const [loading, setloading] = useState<boolean>(false);
  const [toRender, setToRender] = useState<string>('');
  const [fromRender, setFromRender] = useState<string>('');
  const [amountRender, setamountRender] = useState<string>('');

  const { control, setError, formState, handleSubmit, setValue } = useForm();
  const { errors } = formState;

  useEffect(() => {
    setValue('to', to);
    setValue('from', from);
    setValue('amount', amount);
  }, [to, from, amount,setValue]);

  const handleChangeTo = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string,
  ) => {
    const { value } = event.target;
    const regex = /^[A-Za-z]+$/;

    if ((value.length <= 3 && regex.test(value)) || value === '') {
      setTo(value);
      validValue(value, name);
    }
  };

  const handleChangeFrom = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string,
  ) => {
    const { value } = event.target;
    const regex = /^[A-Za-z]+$/;

    if ((value.length <= 3 && regex.test(value)) || value === '') {
      setFrom(value);
      validValue(value, name);
    }
  };

  const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const regex = /^[0-9]+$/;

    if (regex.test(value) || value === '') {
      setAmount(value);
    }
  };

  const validValue = (value: string, name: string) => {
    if (value.length > 0 && value.length < 3) {
      setError(name, { type: 'manual', message: 'Moeda inválida' });
    } else if (value && !currencies.includes(value.toUpperCase())) {
      setError(name, { type: 'manual', message: 'Moeda não suportada' });
    } else {
      setError(name, { type: 'manual', message: '' });
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = data => {
    const { to, from, amount } = data as ICurrencyContext;
    if (to && from && amount) {
      const request = async () => {
        try {
          setloading(true);
          const result = await fecthConversion(to, from, amount);
          setResult(result);
          setFromRender(from);
          setToRender(to);
          setamountRender(amount);
          const date = currentDate();
          setHistory({ to, from, amount, result, date });
        } catch (e) {
          //
        } finally {
          setloading(false);
        }
      };
      request();
    }
    const currentDate = () => {
      const date = new Date();
      const padZero = (value: number) => (value < 10 ? `0${value}` : value);

      const ano = date.getFullYear();
      const mes = padZero(date.getMonth() + 1);
      const dia = padZero(date.getDate());
      const hora = padZero(date.getHours());
      const minutos = padZero(date.getMinutes());
      const segundos = padZero(date.getSeconds());

      return `${ano}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;
    };
    return;
  };

  return (
    <Modal paddingSides='20' height='400' margin='30'>
      <S.Container onSubmit={handleSubmit(onSubmit)}>
        <S.ContainerInput>
          <label htmlFor='to'>De:</label>
          <Controller
            name='to'
            control={control}
            defaultValue={to}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  onChange={e => {
                    handleChangeTo(e, 'to');
                    field.onChange(to);
                  }}
                  value={to}
                  type='text'
                  id='to'
                  placeholder='Ex: USD'
                  maxLength={3}
                />
                {errors.to && (
                  <p className='error'>{errors.to.message as string}</p>
                )}
                {!field.value ? (
                  <p>Digite uma moeda</p>
                ) : (
                  <p className='no-visible'>_</p>
                )}
              </>
            )}
          />
        </S.ContainerInput>
        <S.ContainerInput>
          <label htmlFor='from'>Para:</label>
          <Controller
            name='from'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <>
                <input
                  {...field}
                  onChange={e => {
                    handleChangeFrom(e, 'from');
                    field.onChange(e);
                  }}
                  value={from}
                  type='text'
                  id='from'
                  placeholder='Ex: GBP'
                  maxLength={3}
                />
                {errors.from && (
                  <p className='error'>{errors.from.message as string}</p>
                )}
                {!field.value && <p>Digite uma moeda</p>}
              </>
            )}
          />
        </S.ContainerInput>
        <S.ContainerInput>
          <label htmlFor='amount'>Amount:</label>
          <Controller
            name='amount'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <>
                <input
                  {...field}
                  onChange={e => {
                    handleChangeAmount(e);
                    field.onChange(e);
                  }}
                  value={amount}
                  type='text'
                  id='amount'
                  placeholder='Ex: GBP'
                />
                {errors.amount && (
                  <p className='error'>
                    {errors.amount.message as string}
                  </p>
                )}
                {!field.value && <p>Digite uma moeda</p>}
              </>
            )}
          />
        </S.ContainerInput>

        <S.ContainerButton>
          <button className='send' type='submit' title='converter'>
            {loading ? 'Convertendo...' : 'Converter'}
          </button>
        </S.ContainerButton>
        <S.Result title='result'>
          {result
            ? `${Number(amountRender).toFixed(
                2,
              )} ${toRender.toUpperCase()} equivalem a: ${Number(
                result,
              ).toFixed(2)} ${fromRender.toUpperCase()}`
            : ''}
        </S.Result>
      </S.Container>
    </Modal>
  );
}
