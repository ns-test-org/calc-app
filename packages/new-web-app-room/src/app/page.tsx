'use client';

import { useState } from 'react';
import AnimatedGrid from './components/AnimatedGrid';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <AnimatedGrid />
      <div className="bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-cyan-500/30 p-8 w-full max-w-sm relative z-10 border-2 border-cyan-400/40 ring-1 ring-cyan-300/20">
        <h1 className="text-3xl font-bold text-center text-cyan-100 mb-6 tracking-wide drop-shadow-lg">Calculator</h1>
        
        {/* Display */}
        <div className="bg-black/90 backdrop-blur-sm rounded-xl p-6 mb-6 shadow-inner shadow-cyan-500/30 border-2 border-cyan-300/50">
          <div className="text-right text-cyan-100 text-4xl font-mono overflow-hidden font-bold tracking-wider drop-shadow-md">
            {display}
          </div>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <button
            onClick={clear}
            className="col-span-2 bg-red-600/90 hover:bg-red-500 text-white font-bold py-4 px-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-red-500/50 border border-red-400/30 backdrop-blur-sm"
          >
            Clear
          </button>
          <button
            onClick={() => inputOperation('÷')}
            className="bg-orange-600/90 hover:bg-orange-500 text-white font-bold py-4 px-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/50 border border-orange-400/30 backdrop-blur-sm"
          >
            ÷
          </button>
          <button
            onClick={() => inputOperation('×')}
            className="bg-orange-600/90 hover:bg-orange-500 text-white font-bold py-4 px-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/50 border border-orange-400/30 backdrop-blur-sm"
          >
            ×
          </button>

          {/* Row 2 */}
          <button
            onClick={() => inputNumber('7')}
            className="bg-gray-700/90 hover:bg-gray-600 text-cyan-100 font-bold py-4 px-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/30 border border-gray-600/50 backdrop-blur-sm"
          >
            7
          </button>
          <button
            onClick={() => inputNumber('8')}
            className="bg-gray-700/90 hover:bg-gray-600 text-cyan-100 font-bold py-4 px-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/30 border border-gray-600/50 backdrop-blur-sm"
          >
            8
          </button>
          <button
            onClick={() => inputNumber('9')}
            className="bg-gray-700/90 hover:bg-gray-600 text-cyan-100 font-bold py-4 px-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/30 border border-gray-600/50 backdrop-blur-sm"
          >
            9
          </button>
          <button
            onClick={() => inputOperation('-')}
            className="bg-orange-600/90 hover:bg-orange-500 text-white font-bold py-4 px-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/50 border border-orange-400/30 backdrop-blur-sm"
          >
            -
          </button>

          {/* Row 3 */}
          <button
            onClick={() => inputNumber('4')}
            className="bg-gray-700/90 hover:bg-gray-600 text-cyan-100 font-bold py-4 px-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/30 border border-gray-600/50 backdrop-blur-sm"
          >
            4
          </button>
          <button
            onClick={() => inputNumber('5')}
            className="bg-gray-700/90 hover:bg-gray-600 text-cyan-100 font-bold py-4 px-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/30 border border-gray-600/50 backdrop-blur-sm"
          >
            5
          </button>
          <button
            onClick={() => inputNumber('6')}
            className="bg-gray-700/90 hover:bg-gray-600 text-cyan-100 font-bold py-4 px-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/30 border border-gray-600/50 backdrop-blur-sm"
          >
            6
          </button>
          <button
            onClick={() => inputOperation('+')}
            className="bg-orange-600/90 hover:bg-orange-500 text-white font-bold py-4 px-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/50 border border-orange-400/30 backdrop-blur-sm"
          >
            +
          </button>

          {/* Row 4 */}
          <button
            onClick={() => inputNumber('1')}
            className="bg-gray-700/90 hover:bg-gray-600 text-cyan-100 font-bold py-4 px-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/30 border border-gray-600/50 backdrop-blur-sm"
          >
            1
          </button>
          <button
            onClick={() => inputNumber('2')}
            className="bg-gray-700/90 hover:bg-gray-600 text-cyan-100 font-bold py-4 px-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/30 border border-gray-600/50 backdrop-blur-sm"
          >
            2
          </button>
          <button
            onClick={() => inputNumber('3')}
            className="bg-gray-700/90 hover:bg-gray-600 text-cyan-100 font-bold py-4 px-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/30 border border-gray-600/50 backdrop-blur-sm"
          >
            3
          </button>
          <button
            onClick={performCalculation}
            className="row-span-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 px-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/50 border border-purple-400/40 backdrop-blur-sm transform hover:scale-105"
          >
            =
          </button>

          {/* Row 5 */}
          <button
            onClick={() => inputNumber('0')}
            className="col-span-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 px-4 rounded-lg transition-all duration-200 hover:shadow-md"
          >
            0
          </button>
          <button
            onClick={inputDecimal}
            className="bg-gray-700/90 hover:bg-gray-600 text-cyan-100 font-bold py-4 px-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/30 border border-gray-600/50 backdrop-blur-sm"
          >
            .
          </button>
        </div>
      </div>
    </div>
  );
}



















