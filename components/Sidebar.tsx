import { Terminal, Plus, ExternalLink } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 flex-col bg-black border-r border-red-900/20">
      <div className="p-4">
        <button className="flex w-full items-center gap-2 rounded-md border border-red-900/50 p-3 text-sm text-red-500 hover:bg-red-950/20 transition-all">
          <Plus size={16} />
          Nueva Auditoría
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pt-0">
        <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-4">Historial de Sesión</div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 p-2 text-xs text-zinc-400 hover:text-white cursor-pointer bg-zinc-900/50 rounded border-l border-red-600">
            <Terminal size={14} />
            Análisis de Vulnerabilidades...
          </div>
        </div>
      </div>
  );
}
