import styled from 'styled-components';

export const Container = styled.div`
  min-height: 400px;
`;

export const Title = styled.h1`
  text-align: center;
  padding: 24px;
`;

export const Table = styled.div`
  width: 100%;
  max-height: 250px;
  overflow-y: auto;
  table {
    width: 100%;

    thead {
      width: 100%;
      background-color: #555;
      color: #fff;
      position: sticky;
      top: 0;
      text-transform: capitalize;
    }

    tboby {
      width: 100%;
    }

    td,
    th {
      text-align: center;
      padding: 8px;
    }
  }

  @media (max-width: 675px) {
    max-height: 220px;
  }
`;

export const ListItem = styled.li`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  text-align: center;
  text-transform: uppercase;

  @media (max-width: 675px) {
    text-transform: lowercase;
  }
`;

export const Paragraph = styled.p`
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 8px;

  &.not-found {
    margin-top: 80px;
    border: none;
    font-size: 24px;
  }
`;
