import styled from 'styled-components';

export const ContainerGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  @media (max-width: 775px) {
    display: block;
  }
`;

export const Title = styled.h1`
  text-align: center;
  padding: 24px;
`;
