import styled from 'styled-components'

export const ContainerTheme = styled.div`
  cursor: pointer;
  margin-left: 450px;
  margin-top: 5px;
  margin-right: 80px;
  position: relative;
  border: 1px solid ${(props) => props.theme.color.shadow};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  > i {
    position: absolute;
    top: 6px;
    left: 6px;
    font-size: 18px;
    border-radius: 50%;
    color: ${(props) => props.theme.color.hardShadow};
  }

  @media (max-width: 820px) {
    margin-left: 226px;
  }
`
