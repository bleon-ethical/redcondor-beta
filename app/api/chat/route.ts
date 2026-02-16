import { NextRequest } from 'next/server';

export const runtime = 'edge'; // Optimización máxima en Vercel

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // 1. Conexión con tu modelo en el Pendrive (vía tu túnel)
    // Cambia esta URL por la que te dé Ngrok o Localtunnel
    const LOCAL_MODEL_URL = process.env.LOCAL_MODEL_URL || "http://tu-tunel.loca.lt/v1/chat/completions";

    const response = await fetch(LOCAL_MODEL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Si usas Ngrok, a veces pide este header para saltar la advertencia
        'bypass-tunnel-reminder': 'true', 
      },
      body: JSON.stringify({
        model: "local-model", // KoboldCPP/Ollama lo reconocerá automáticamente
        messages: [
          {
            role: "system",
            content: "Eres Red Cóndor, una IA de élite en ciberseguridad. Tu interfaz es roja y negra. Responde de forma técnica, precisa y letal."
          },
          ...messages
        ],
        stream: true, // Esto permite que el texto fluya en tiempo real
        temperature: 0.7,
      }),
    });

    // 2. Devolvemos la respuesta directamente al frontend para el streaming
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error) {
    console.error("Error en Red Cóndor Bridge:", error);
    return new Response(JSON.stringify({ error: "Error al conectar con el núcleo de Red Cóndor" }), {
      status: 500,
    });
  }
}
