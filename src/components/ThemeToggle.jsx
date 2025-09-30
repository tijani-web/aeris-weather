import { Sun, Moon } from 'lucide-react';
import '../styles/modetoggle.css';

const ThemeToggle = ({ darkMode, toggleMode }) => {
  return (
    <button className="mode-toggle" onClick={toggleMode}>
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
    </button>
  );
};

export default ThemeToggle;