import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 600px;
  height: 400px;

  @media (max-width: 675px) {
    width: 350px;
    height: 400px;
  }
`;

export const ContainerButton = styled.div`
  position: absolute;
  right: 0;

  > button {
    padding: 8px;
    margin-left: 8px;
    background-color: #0088ff;
    border: 1px solid transparent;
    border-radius: 5px;
    color: #ff9999;
    font-size: 16px;
    cursor: pointer;

    &:active {
      border-color: #ff9999;
    }

    @media (max-width: 675px) {
      padding: 5px;
    }
  }
`;
