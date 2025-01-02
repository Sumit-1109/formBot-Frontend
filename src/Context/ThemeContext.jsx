import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getTheme, updateTheme } from "../Services/client";

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    const fetchTheme = async () => {

      const token = localStorage.getItem("token");

      if(!token){
        setTheme(false);
        return;
      }
      
      try{
        const res = await getTheme(token);

        if (res.status === 200) {
          const body = await res.json();
          const theme = body.theme;
          setTheme(theme);
        } else {
          setTheme(false);
          console.log("Failed to fetch theme")
        }
      } catch (err) {
        console.error( "Error fetching theme",err);
        setTheme(false);
      }
    };
    fetchTheme();

  }, []);

  useEffect(() => {
    document.body.className = theme ? "dark" : "light";
  }, [theme]);

  const toggleTheme = async () => {
    const newTheme = !theme;
    setTheme(newTheme);

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("User not authenticated. Cannot update theme");
      return;
    }
    
    try {
      const res = await updateTheme(token, newTheme);

      if(res.status !== 200){
        console.log("Failed to update theme.")
        setTheme(!newTheme);
      }
    } catch(error) {
      console.error(error);
      setTheme(!newTheme);
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