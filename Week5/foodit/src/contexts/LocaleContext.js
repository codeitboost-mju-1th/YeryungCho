import { useState, createContext, useContext } from 'react';

const LocaleContext = createContext();

export function LocaleProvider({ defaultValue="ko", children }) {
  const [locale, setLocale] = useState(defaultValue);
  
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
} 

export function useLocale() {
  const { locale } = useContext(LocaleContext);
  return locale;
}

export function useSetLocale() {
  const { setLocale } = useContext(LocaleContext);
  return setLocale;
}