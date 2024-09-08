import { useSetTheme } from './ThemeContext'

export default function Setting() {
  const setTheme = useSetTheme();

  return (
    <div>
      <button onClick={() => setTheme('purple')}>퍼플 테마</button>
      <button onClick={() => setTheme('green')}>그린 테마</button>
    </div>
  )
}