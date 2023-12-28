export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center text-zinc-500 text-sans mb-2 mt-auto pt-16">
      <small>
        &copy;{new Date().getFullYear()} Kevin Silva.{' '}
        <span className="text-xs">
          Built width React & TypeScript, Tailwind CSS, and Framer Motion.
        </span>
      </small>
    </footer>
  );
}
