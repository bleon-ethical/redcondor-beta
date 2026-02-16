import Message from "./Message";

interface ChatBoxProps {
  messages: { role: 'user' | 'assistant'; content: string }[];
  isLoading: boolean;
}

export default function ChatBox({ messages, isLoading }: ChatBoxProps) {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <div className="flex flex-col">
        {messages.map((m, i) => (
          <Message key={i} role={m.role as 'user' | 'assistant'} content={m.content} />
        ))}
        {isLoading && (
          <div className="p-6 flex items-center gap-2 text-red-600">
            <span className="h-2 w-2 rounded-full bg-red-600 animate-ping" />
            <span className="text-xs font-mono uppercase tracking-tighter">Procesando vectores de ataque...</span>
          </div>
        )}
      </div>
    </div>
  );
}
