import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getTheme, updateTheme } from "../Services/client";

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({userId, children}) => {
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    const fetchTheme = async () => {
      
      try{
        const res = await getTheme(userId);
      const body = await res.json();
      const theme = body.theme;
      setTheme(theme)
      } catch (err) {
        console.error(err);
        setTheme(false);
      }
    };
    fetchTheme();

  }, [userId]);

  const toggleTheme = async () => {
    const newTheme = !theme;
    setTheme(newTheme);
    
    try {
      await updateTheme(userId, newTheme);
    } catch(error) {
      console.error(error);
      setTheme(newTheme);
    }
  };

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  userId: PropTypes.string
}