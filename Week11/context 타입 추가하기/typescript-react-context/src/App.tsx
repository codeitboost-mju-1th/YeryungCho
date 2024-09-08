import Nav from './Nav';
import Setting from './Setting';
import { ThemeProvider } from './ThemeContext';



function App() {
    
    type Theme = 'purple' | 'green';

    interface ThemeContextValue {
        theme: Theme;
        setTheme: (theme: Theme) => void;
    }

    const ThemeContext = createContext<ThemeContextValue>({
        theme: 'purple',
        setTheme: () => {},
    })
  return (
    <ThemeProvider>
      <Nav />
      <Setting />
    </ThemeProvider>
  );
}

export default App;
