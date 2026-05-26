import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QuoteEditor } from './components/QuoteEditor';
import { defaultQuote, hyperneticsDefault } from './types/quote';
import { Layout, Rocket, Code, ArrowRight } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-black text-slate-900 tracking-tight">
            Cotizador <span className="text-primary">Multi-Marca</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            Selecciona la identidad corporativa para generar tu cotización profesional.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {/* Maketa Card */}
          <Link
            to="/maketa"
            className="group relative bg-white p-8 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 flex flex-col items-start text-left gap-6 transition-all hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-[#7db8c5] group-hover:scale-110 transition-transform">
              <Layout className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Maketa Studio</h2>
              <p className="text-slate-500 mt-2">Estilo corporativo, elegante y minimalista en tonos claros.</p>
            </div>
            <div className="mt-auto flex items-center gap-2 text-[#7db8c5] font-bold">
              Ir al cotizador <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Hypernetics Card */}
          <Link
            to="/hypernetics"
            className="group relative bg-[#0a0b10] p-8 rounded-3xl shadow-xl shadow-black/20 border border-slate-800 flex flex-col items-start text-left gap-6 transition-all hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-[#a7cf9e] group-hover:scale-110 transition-transform">
              <Code className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Hypernetics</h2>
              <p className="text-slate-400 mt-2">Diseño futurista, dark mode y tipografía técnica para software.</p>
            </div>
            <div className="mt-auto flex items-center gap-2 text-[#a7cf9e] font-bold">
              Ir al cotizador <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        <footer className="pt-12 text-slate-400 text-sm font-medium">
          Sistema Interno de Generación de Propuestas v1.0
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/maketa"
          element={<QuoteEditor brandKey="maketa" initialData={defaultQuote} />}
        />
        <Route
          path="/hypernetics"
          element={<QuoteEditor brandKey="hypernetics" initialData={hyperneticsDefault} isDarkMode={true} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
