import styled from 'styled-components';

interface IModalStyle {
  $width?: string;
  $height?: string;
  $paddingSides?: string;
  $margin?: string;
}

export const Modal = styled.div<IModalStyle>`
  max-width: ${props => (props.$width ? props.$width + 'px' : '800px')};
  max-height: ${props => (props.$height ? props.$height + 'px' : '400px')};

  background-color: #fff;
  border-radius: 24px;
  padding: 20px
    ${props => (props.$paddingSides ? props.$paddingSides + 'px' : '70px')};
  margin: ${props => (props.$margin ? props.$margin + 'px' : '30px')} 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 820px) {
    width: 90%;
  }

  @media (max-width: 675px) {
    max-width: 400px;
    padding: 20px;
  }
`;
