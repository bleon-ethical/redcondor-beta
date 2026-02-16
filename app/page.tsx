"use client";
import { useState, useRef, useEffect } from 'react';

export default function RedCondorChat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Esperando instrucciones de auditoría...' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'ERROR DE CONEXIÓN: Verifica el núcleo en el pendrive.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex h-screen flex-col bg-black text-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-red-900/50 bg-zinc-950 p-4 shadow-[0_0_15px_rgba(230,0,0,0.1)]">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-red-600 rounded-full flex items-center justify-center font-bold text-black shadow-[0_0_10px_#ff0000]">RC</div>
          <h1 className="text-xl font-bold tracking-tighter text-red-600">RED CÓNDOR <span className="text-xs text-white/50 font-normal">BETA 1.0</span></h1>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              m.role === 'user' 
              ? 'bg-zinc-800 border-b-2 border-red-600' 
              : 'bg-zinc-900 border-l-4 border-red-600 shadow-[0_0_10px_rgba(230,0,0,0.05)]'
            }`}>
              <p className="text-sm leading-relaxed">{m.content}</p>
            </div>
          </div>
        ))}
        {isLoading && <div className="text-red-600 animate-pulse text-xs">ANALIZANDO...</div>}
        <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      <footer className="p-4 bg-zinc-950 border-t border-red-900/30">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex gap-2">
          <input
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-red-600 transition-all"
            placeholder="Introduce comando o código para analizar..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(230,0,0,0.2)]"
          >
            ENVIAR
          </button>
        </form>
        <p className="text-[10px] text-center mt-2 text-zinc-600 italic">
          Red Cóndor puede cometer errores. Verifica siempre las auditorías críticas.
        </p>
      </footer>
    </main>
  );
}
