import styled from 'styled-components';

interface IListStyle {
  $visible?: boolean;
}

export const List = styled.ul<IListStyle>`
  width: 100%;
  max-height: 230px;
  text-align: center;
  overflow-y: auto;

  @media (max-width: 775px) {
    display: ${props => (props.$visible ? 'block' : 'none')};
    max-height: 200px;
  }

  @media (max-width: 775px) {
    max-height: 150px;
  }
`;

export const ItemList = styled.li`
  padding: 8px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #ff9999;
  }
`;

export const Paragraph = styled.p`
  text-transform: capitalize;
  text-align: center;
  padding: 8px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  width: 100%;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
`;

export const Container = styled.div`
  width: 100%;
`;
