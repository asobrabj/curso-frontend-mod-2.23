import React, { useEffect, useState } from 'react'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'
import { MdListAlt } from 'react-icons/md'
import { useStorage } from '../../context/localStorage/localStorage'
import { useModal } from '../../context/modals'
import Card, { ICard } from '../CardAnotation'
import { IFormData } from '../FormAddAnnotation'
import * as S from './styles'

export default function Anotations() {
  const [index, setIndex] = useState<number>(0)
  const [cards, setCards] = useState<Array<IFormData>>()
  const [disableNext, setDisableNext] = useState<boolean>(false)
  const [disablePrev, setDisablePrev] = useState<boolean>(true)
  const { setIsVisible, setIsForm } = useModal()
  const { anotations } = useStorage()

  const PERPAGE = 6

  useEffect(() => {
    if (anotations) {
      setCards(anotations)
      if (index + PERPAGE >= anotations.length) {
        setDisableNext(true)
      } else {
        setDisableNext(false)
      }
      if (index - PERPAGE < 0) {
        setDisablePrev(true)
      } else {
        setDisablePrev(false)
      }
    }
  }, [index, anotations])

  const handleNext = () => {
    if (anotations instanceof Array && anotations.length > 0) {
      const newIndex = index + PERPAGE
      setIndex(newIndex)
    }
  }
  const handlePrev = () => {
    if (anotations instanceof Array && anotations.length > 0) {
      const newIndex = index - PERPAGE
      setIndex(newIndex)
    }
  }

  const openForm = () => {
    setIsForm(true)
    setIsVisible(true)
  }

  return (
    <S.Container title="container-cards">
      {cards && cards.length > 0 ? (
        <React.Fragment>
          <S.ContainerCards>
            {cards.slice(index, index + PERPAGE).map((item, i) => (
              <Card key={i} {...(item as ICard)} id={item.id} />
            ))}
          </S.ContainerCards>
          <S.ContainerArrows>
            <button
              disabled={disablePrev}
              onClick={handlePrev}
              aria-label="prev"
            >
              <FaArrowCircleLeft />
            </button>
            <button
              disabled={disableNext}
              onClick={handleNext}
              className="mg"
              aria-label="next"
            >
              <FaArrowCircleRight />
            </button>
          </S.ContainerArrows>
        </React.Fragment>
      ) : (
        <S.ContainerNotFound title="not-found">
          <S.Icon>
            <MdListAlt />
          </S.Icon>
          <S.Paragraph>
            Nenhuma anotação foi encontrada{' '}
            <span onClick={openForm}>Click aqui para adicionar</span>
          </S.Paragraph>
        </S.ContainerNotFound>
      )}
    </S.Container>
  )
}
