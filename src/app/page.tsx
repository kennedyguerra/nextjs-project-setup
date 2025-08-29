"use client";

import AccessibilityControls from "@/components/AccessibilityControls";
import { useAccessibility } from "@/context/AccessibilityContext";

interface Meme {
  id: number;
  src: string;
  alt: string;
  title: string;
}

const memes: Meme[] = [
  {
    id: 1,
    src: "https://conteudo.imguol.com.br/3f/2020/11/17/kid-bengala-via-instagram-1605617856164_v2_900x506.jpg",
    alt: "Meme do Kid Bengala - imagem humorística viral das redes sociais",
    title: "Kid Bengala Meme"
  },
  {
    id: 2,
    src: "https://placehold.co/400x400?text=Meme+Engracado+2",
    alt: "Segundo meme da coleção - conteúdo humorístico com design moderno e divertido",
    title: "Meme Engraçado #2"
  },
  {
    id: 3,
    src: "https://placehold.co/400x400?text=Meme+Viral+3",
    alt: "Terceiro meme viral - imagem cômica popular nas redes sociais com estilo contemporâneo",
    title: "Meme Viral #3"
  }
];

export default function HomePage() {
  const { fontSize, theme } = useAccessibility();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    target.src = "https://placehold.co/400x400?text=Imagem+Nao+Encontrada";
    target.alt = "Imagem não encontrada - placeholder de erro";
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AccessibilityControls />
      
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            🎭 Galeria de Memes
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Bem-vindo à nossa galeria de memes! Use os controles de acessibilidade no canto superior direito 
            para ajustar o tamanho da fonte e trocar entre temas de cores.
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Fonte atual: <span className="font-semibold">{fontSize}</span></p>
            <p>Tema atual: <span className="font-semibold">
              {theme === 'light' ? 'Claro' : theme === 'dark' ? 'Escuro' : 'Alto Contraste'}
            </span></p>
          </div>
        </header>

        <section className="gallery-grid" role="main" aria-label="Galeria de memes">
          {memes.map((meme) => (
            <article 
              key={meme.id} 
              className="gallery-item bg-card"
              role="img"
              aria-labelledby={`meme-title-${meme.id}`}
            >
              <div className="p-4">
                <h2 
                  id={`meme-title-${meme.id}`}
                  className="text-lg font-semibold mb-3 text-card-foreground"
                >
                  {meme.title}
                </h2>
                <div className="relative">
                  <img
                    src={meme.src}
                    alt={meme.alt}
                    onError={handleImageError}
                    className="w-full h-auto rounded-md border border-border"
                    loading="lazy"
                  />
                </div>
              </div>
            </article>
          ))}
        </section>

        <footer className="mt-12 text-center text-muted-foreground">
          <p className="text-sm">
            Esta galeria foi desenvolvida com foco em acessibilidade. 
            Use os controles para personalizar sua experiência de visualização.
          </p>
          <div className="mt-4 space-y-2 text-xs">
            <p>✨ Funcionalidades de Acessibilidade:</p>
            <ul className="list-none space-y-1">
              <li>🔤 Ajuste de tamanho da fonte (Pequena, Média, Grande, Extra Grande)</li>
              <li>🎨 Temas de cores (Claro, Escuro, Alto Contraste)</li>
              <li>📱 Design responsivo para todos os dispositivos</li>
              <li>♿ Navegação por teclado e leitores de tela</li>
            </ul>
          </div>
        </footer>
      </div>
    </main>
  );
}
