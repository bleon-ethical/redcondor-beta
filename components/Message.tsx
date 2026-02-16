import { ShieldAlert, User } from "lucide-react"; // Necesitas: npm install lucide-react

interface MessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export default function Message({ role, content }: MessageProps) {
  const isUser = role === 'user';
  
  return (
    <div className={`flex w-full gap-4 p-4 ${isUser ? 'bg-transparent' : 'bg-zinc-900/50 border-y border-red-900/10'}`}>
      <div className={`flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border ${
        isUser ? 'border-zinc-700 bg-zinc-800' : 'border-red-600 bg-red-950/30'
      }`}>
        {isUser ? <User size={18} /> : <ShieldAlert size={18} className="text-red-600" />}
      </div>
      <div className="flex-1 space-y-2 overflow-hidden">
        <p className="font-bold text-xs uppercase tracking-widest text-zinc-500">
          {isUser ? 'Operador' : 'Red Cóndor Core'}
        </p>
        <div className="text-sm leading-relaxed text-zinc-200 whitespace-pre-wrap">
          {content}
        </div>
      </div>
    </div>
  );
}
