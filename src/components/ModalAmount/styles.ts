import styled from 'styled-components';

export const Container = styled.form`
  margin-top: 18px;
  min-height: 100%;
  padding: 0 30px;
  display: grid;
  grid-template-columns: repeat(3, minmax(150px, 1fr));
  justify-content: center;

  @media (max-width: 675px) {
    display: block;
  }
`;

export const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 30px;
  margin-bottom: 16px;
  > input {
    padding: 8px;
    border-radius: 8px 0;
    margin: 5px 0 2px;
    border: 1px solid #0099ff;
    outline-color: #0099ff;
    text-transform: uppercase;
  }

  > p {
    font-size: 14px;
    color: #555;

    &.no-visible {
      visibility: hidden;
    }

    &.error {
      color: red;
    }
  }
`;

export const ContainerButton = styled.div`
  > button {
    margin-right: 16px;
    padding: 5px;
    border-radius: 8px;
    border: 1px solid;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 2px 2px 6px;
    transition: all 0.3s ease;

    &.send {
      width: 150px;
      border-color: green;
      background-color: #55ff55;
    }

    &:active {
      transform: translateY(1px);
      box-shadow: 0px 0px 0px;
    }
  }
`;

export const Result = styled.p`
  grid-column: span 2;
  text-align: center;
  display: block;
  margin: auto;
  font-size: 18px;
  font-weight: bold;
`;
