import { ChangeEvent, useState } from 'react';
import Input from './Input';

function App() {
  const [value, setValue] = useState<string>('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const nextValue = e.target.value;
    setValue(nextValue);
  }

  return (
    <div>
      <Input value={value} onChange={handleChange} />
      <div>{value}</div>
    </div>
  );
}

export default App;