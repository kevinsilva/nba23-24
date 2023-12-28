import { MdError } from 'react-icons/md';

export default function ErrorMsg({ text }: { text: string }) {
  return (
    <div className="text-red-700 flex items-center justify-center">
      <MdError />
      {text}
    </div>
  );
}
