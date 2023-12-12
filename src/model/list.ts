import IList from '../types/lists'

const dataList: Array<IList> = [
  {
    id: 1,
    name: 'categoria',
    options: [
      { text: 'finanças', background: 'blue' },
      { text: 'comida', background: 'yellow' },
      { text: 'estudo', background: 'red' },
      { text: 'trabalho', background: 'greenDark' },
    ],
  },
  {
    id: 2,
    name: 'prioridade',
    options: [
      { text: 'urgente', background: 'red' },
      { text: 'alta', background: 'yellow' },
      { text: 'media', background: 'blue' },
      { text: 'baixa', background: 'green' },
    ],
  },
]

export default dataList
