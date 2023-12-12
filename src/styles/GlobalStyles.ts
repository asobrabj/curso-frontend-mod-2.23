import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: ${(props) => props.theme.color.background};
    color: ${(props) => props.theme.color.color};
    list-style: none;
  }

  .constainer {
    max-width: 100%;
  }
`
