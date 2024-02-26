import ThemeSwitch from './themeSwitch';

export default function Navigation() {
  return (
    <nav className="font-sans flex">
      <ul className="flex justify-end gap-4 uppercase text-sm font-semibold text-zinc-500 dark:text-zinc-400">
        <li className="hover:text-zinc-700 dark:hover:text-zinc-200">Teams</li>
        <li className="hover:text-zinc-700 dark:hover:text-zinc-200">Roster</li>
        <li className="hover:text-zinc-700 dark:hover:text-zinc-200">Games</li>
      </ul>
      <ThemeSwitch />
    </nav>
  );
}
