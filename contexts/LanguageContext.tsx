import { Children, createContext, useContext, useState } from "react";

type languages = "french" | "english";
interface languageContextInterface {
  language: languages;
  setLanguage: (s: languages) => void;
}

export const languageContext = createContext<
  languageContextInterface | undefined
>(undefined);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  const [language, setLanguage] = useState<languages>("english");

  return (
    <languageContext.Provider value={{ language, setLanguage }}>
      {children}
    </languageContext.Provider>
  );
};
