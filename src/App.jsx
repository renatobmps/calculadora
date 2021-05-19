import React, { useState } from "react";
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid black;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  max-width: 25em;
  border-radius: .5em;
  overflow: hidden;
`;

const Visor = styled.section`
  background: #064b06;
  display: flex;
  flex-direction: column;
  &>* {
    color: white;
    font-size: 2em;
    font-weight: 900;
    flex: 1;
    padding: .5em;
    /* width: 100%; */
    background: transparent;
    border: 0;
    word-wrap: break-word;
  }
`;

const Input = styled.input`
  /* min-width: 5rem;
  max-width: fit-content; */
  text-align: start;
`;

const Resultado = styled.input`
  /* min-width: fit-content; */
  text-align: end;
`;

const KeyboardContainer = styled.section`
  padding: .5em;
  display: flex;
`;

const Keyboard = styled.div`
  border: 1px solid white;
  display: grid;
  gap: 1.5em 1em;
  grid-template-columns: repeat(auto-fit, minmax(3.5em, 1fr));
  justify-content: center;
  justify-items: center;
  flex: ${props => props.flex || 1};
  padding: 1em;
`;

const Button = styled.button`
  background: gray;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: .5em;
  border-radius: .5em;
  color: white;
  font-weight: 900;
  border: 0;
  width: 100%;
  font-size: 1.5em;
  box-shadow: 0px 5px 5px -1px black;
  transform: translateY(-5px);
  transition: .3s;
  &:active{
    box-shadow: 0px 0px 5px -1px black;
    transform: translateY(0px);
    transition: .3s;
  }
`;

export default function Home() {
  const [conta, setConta] = useState(0);
  const [resultado, setResultado] = useState('');

  const zera = () => {
    setConta(0);
    setResultado('');
  }

  const add = (e) => {
    const atual = conta;
    let input;
    let resultado;

    if (atual === 0 || atual === '0') {
      if (
        e.target.textContent === '+' ||
        e.target.textContent === '-' ||
        e.target.textContent === '*' ||
        e.target.textContent === '/' ||
        e.target.textContent === '.'
      ) {
        input = `${conta}${e.target.textContent}`
      } else {
        input = e.target.textContent;
      }
    } else {
      input = `${conta}${e.target.textContent}`
    }
    if (
      e.target.textContent === '+' ||
      e.target.textContent === '-' ||
      e.target.textContent === '*' ||
      e.target.textContent === '/' ||
      e.target.textContent === '.'
    ) {
      if (
        input.slice(-2, -1) === '+' ||
        input.slice(-2, -1) === '-' ||
        input.slice(-2, -1) === '*' ||
        input.slice(-2, -1) === '/' ||
        input.slice(-2, -1) === '.'
      ) {
        input = `${conta.slice(0, -1)}${e.target.textContent}`;
      }
    }
    setConta(input);

    if (
      input.includes('+') ||
      input.includes('-') ||
      input.includes('*') ||
      input.includes('/')
    ) {
      if (
        input.slice(-1) === '+' ||
        input.slice(-1) === '-' ||
        input.slice(-1) === '*' ||
        input.slice(-1) === '/'
      ) {
        resultado = '';
      } else {
        // eslint-disable-next-line no-eval
        resultado = eval(input.toString())
      }
    }

    setResultado(resultado);
  }

  return (
    <>
      <h1>Calculadora</h1>
      <Container>
        <Visor>
          <Input
            type="text"
            readOnly={true}
            value={conta}
            // onInput={calcula}
            id="input"
          />
          <Resultado type="text" readOnly={true} value={resultado} />
        </Visor>
        <KeyboardContainer>
          <Keyboard flex="3">
            <Button onClick={add}>1</Button>
            <Button onClick={add}>2</Button>
            <Button onClick={add}>3</Button>
            <Button onClick={add}>4</Button>
            <Button onClick={add}>5</Button>
            <Button onClick={add}>6</Button>
            <Button onClick={add}>7</Button>
            <Button onClick={add}>8</Button>
            <Button onClick={add}>9</Button>
            <Button onClick={add}>0</Button>
            <Button onClick={add}>.</Button>
          </Keyboard>
          <Keyboard>
            <Button onClick={zera}>c</Button>
            <Button onClick={add}>+</Button>
            <Button onClick={add}>-</Button>
            <Button onClick={add}>*</Button>
            <Button onClick={add}>/</Button>
          </Keyboard>
        </KeyboardContainer>
      </Container>
    </>
  )
}