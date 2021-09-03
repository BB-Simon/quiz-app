import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    html {
        height: 100%;
    }
    body {
        display: flex;
        justify-content: center;
    }
    * {
        box-sizing: border-box;
        font-family: Helvetica, Arial, sans-serif;
    }
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > p {
    color: blue;
  }
  .score {
    color: #fc3;
    font-size: 2rem;
    margin: 0;
  }
`;
