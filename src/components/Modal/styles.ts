import styled from 'styled-components'

interface IModalStyle {
  $visible: boolean
}

export const Container = styled.div<IModalStyle>`
  /* z-index: 1; */
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: ${(props) => (props.$visible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
`
