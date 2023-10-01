import React, { useState, useCallback } from 'react';
import Button from './components/UI/Button/Button';
import DemoOutput from './components/Demo/DemoOutput';
import './App.css';

function App() {
  const [showParagraph, setShowParagraph] = useState(false);
  const [allowToggle, setAllowToggle] = useState(false);
  
  console.log('App.js file running');
  
  const toggleParagraphHandler = useCallback(() => {
    if(allowToggle){
      setShowParagraph(prevState => !prevState);
    }
    
  },[allowToggle]);

  const allowToggleHandler = () =>{
    setAllowToggle(true);
  }
  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={showParagraph} />
      <Button label={"Allow Toggle"} onClick={allowToggleHandler}>Allow Toggling!</Button>
      <Button label={"Toggle Paragaph"} onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
    </div>
  );
}

export default App;
