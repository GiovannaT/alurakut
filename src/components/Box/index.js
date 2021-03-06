import styled from 'styled-components';

const Box = styled.div`
  background: #1C1417;
  border-radius: 8px;
  padding: 16px;
  /* CSS Pré-Pronto */
  margin-bottom: 10px;
  .boxLink {
    font-size: 14px;
    color: #ffffff;
    text-decoration: none;
    font-weight: 700;
  }
  .title {
    font-size: 32px;
    font-family: sans-serif;
    font-weight: 400;
    margin-bottom: 20px;
    color: var(--backgroundTertiary);
    
  }
  .subTitle {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 10px;
    color: var(--backgroundTertiary);

  }
  .smallTitle {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    color: var(--backgroundTertiary);
    margin-bottom: 20px;
    
  }
  hr {
    margin-top: 12px;
    margin-bottom: 8px;
    border-color: transparent;
    border-bottom-color: #ECF2FA;
  }
  input {
    width: 100%;
    background-color: #333333;
    color: #F4F4F4;
    border: 0;
    padding: 14px 16px;
    margin-bottom: 14px;
    border-radius: 10000px;
    ::placeholder {
      color: #ffffff;
      opacity: 1;
    }
  }
  button {
    border: 0;
    padding: 8px 12px;
    color: #FFFFFF;
    border-radius: 10000px;
    background-color: #BB1853;
  }
`; 

export default Box
