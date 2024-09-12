'use client'
// components/Calculator.tsx
import React, { useState } from 'react';
import styles from './Calculator.module.css';

const Calculator = () => {
  const [currentInput, setCurrentInput] = useState<string>('0');
  const [previousInput, setPreviousInput] = useState<string>('');
  const [operation, setOperation] = useState<string>('');
  const [isResultDisplayed, setIsResultDisplayed] = useState<boolean>(false);

  const handleNumberClick = (value: string) => {
    if (currentInput === '0' || isResultDisplayed) {
      setCurrentInput(value);
      setIsResultDisplayed(false);
    } else {
      setCurrentInput(currentInput + value);
    }
  };

  const handleClear = () => {
    setCurrentInput('0');
    setPreviousInput('');
    setOperation('');
    setIsResultDisplayed(false);
  };

  const handleOperationClick = (op: string) => {
    if (currentInput !== '') {
      if (previousInput === '') {
        setPreviousInput(currentInput);
        setCurrentInput('0');
      }
      setOperation(op);
      setIsResultDisplayed(false);
    }
  };

  const calculate = () => {
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    let result = 0;
    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        result = current !== 0 ? prev / current : 'Error';
        break;
      default:
        return;
    }

    setCurrentInput(result.toString());
    setPreviousInput('');
    setOperation('');
    setIsResultDisplayed(true);
  };

  return (
    <div className={styles.calculator}>
      <div className={styles.display}>{currentInput}</div>
      <div className={styles.buttons}>
        <button onClick={handleClear} className={styles.buttonDark}>C</button>
        <button onClick={() => handleOperationClick('/')} className={styles.buttonOrange}>÷</button>
        <button onClick={() => handleOperationClick('*')} className={styles.buttonOrange}>×</button>
        <button onClick={() => handleOperationClick('-')} className={styles.buttonOrange}>−</button>
        <button onClick={() => handleNumberClick('7')} className={styles.button}>7</button>
        <button onClick={() => handleNumberClick('8')} className={styles.button}>8</button>
        <button onClick={() => handleNumberClick('9')} className={styles.button}>9</button>
        <button onClick={() => handleOperationClick('+')} className={styles.buttonOrange}>+</button>
        <button onClick={() => handleNumberClick('4')} className={styles.button}>4</button>
        <button onClick={() => handleNumberClick('5')} className={styles.button}>5</button>
        <button onClick={() => handleNumberClick('6')} className={styles.button}>6</button>
        <button onClick={calculate} className={styles.buttonOrange}>=</button>
        <button onClick={() => handleNumberClick('1')} className={styles.button}>1</button>
        <button onClick={() => handleNumberClick('2')} className={styles.button}>2</button>
        <button onClick={() => handleNumberClick('3')} className={styles.button}>3</button>

        <button onClick={() => handleNumberClick('.')} className={styles.buttonOrange}>.</button>

        <button onClick={() => handleNumberClick('0')} className={`${styles.button} ${styles.zeroButton}`}>0</button>

      </div>
    </div>
  );
};

export default Calculator;
