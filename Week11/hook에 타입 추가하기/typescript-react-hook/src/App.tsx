import { useEffect, useRef, useState } from 'react';

function App() {
  const [scores, setScores] = useState<number[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if(buttonRef.current) buttonRef.current.focus();
  }, []);

  function handleClick() {
    const num = Math.floor(Math.random() * 10);
    setScores([...scores, num]);
  }

  return (
    <div>
      <div>{scores}</div>
      <button onClick={handleClick} ref={buttonRef}>랜덤 숫자</button>
    </div>
  );
}

export default App;