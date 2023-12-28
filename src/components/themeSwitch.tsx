import { useEffect, useState } from 'react';
import { MdToggleOn, MdToggleOff } from 'react-icons/md';
import { IoSunny } from 'react-icons/io5';
import { FaMoon } from 'react-icons/fa';
import { ThemeTypes } from '../utils/types';

export default function ThemeSwitch() {
  const [theme, setTheme] = useState<ThemeTypes>('light');

  useEffect(() => {
    let localTheme = window.localStorage.getItem('theme') as ThemeTypes | null;

    if (!localTheme) {
      localTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      window.localStorage.setItem('theme', localTheme);
    }

    if (localTheme === 'dark') document.documentElement.classList.add('dark');

    setTheme(localTheme);
  }, []);

  const handleThemeSwitch = () => {
    if (theme === 'light') {
      setTheme('dark');
      window.localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      window.localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button
      className="fixed top-[0.5rem] right-[1.7rem] text-5xl opacity-80 z-[51] transition-all"
      onClick={handleThemeSwitch}
    >
      {theme === 'light' ? (
        <>
          <MdToggleOn />
          <IoSunny className="text-[.7rem] relative left-[.6rem] bottom-[1.83rem] text-zinc-50 dark:text-zinc-800" />
        </>
      ) : (
        <>
          <MdToggleOff />
          <FaMoon className="text-[.5rem] relative left-[1.8rem] bottom-[1.75rem] text-gray-50 dark:text-zinc-900" />
        </>
      )}
    </button>
  );
}
