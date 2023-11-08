'use client'
import { useTheme } from 'next-themes'
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div>
        {theme === "dark" ? 
        <BsFillSunFill size={28} onClick={() => setTheme("light")} /> : <BsFillMoonFill size={28} onClick={() => setTheme("dark")} />}
    </div>
  )
}

export default ThemeToggle