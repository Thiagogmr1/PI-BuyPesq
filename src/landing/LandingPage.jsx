// BuyPesq — Landing Page React + Tailwind CSS
// Requer: tailwindcss, @tailwindcss/forms (opcional)
// Fonte: adicione no index.html ou _document:
// <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NAV_LINKS = ["Como funciona", "Categorias", "Para profissionais", "Contato"];

const CATEGORIES = [
  { icon: "🔧", label: "Encanamento", count: "240+" },
  { icon: "⚡", label: "Elétrica", count: "310+" },
  { icon: "🎨", label: "Pintura", count: "180+" },
  { icon: "🧹", label: "Limpeza", count: "420+" },
  { icon: "🪚", label: "Marcenaria", count: "150+" },
  { icon: "📦", label: "Mudanças", count: "90+" },
  { icon: "❄️", label: "Ar-condicionado", count: "200+" },
  { icon: "🌿", label: "Jardinagem", count: "130+" },
];

const STEPS = [
  { n: "01", title: "Busque o serviço", desc: "Digite o que você precisa e sua cidade. O BuyPesq filtra profissionais disponíveis na região." },
  { n: "02", title: "Compare perfis", desc: "Veja avaliações, especialidades e preços. Escolha o profissional que mais combina com você." },
  { n: "03", title: "Entre em contato", desc: "Fale direto com o profissional via WhatsApp. Sem intermediários, sem taxas ocultas." },
];

const TESTIMONIALS = [
  { name: "Ana Carvalho", city: "Goiânia, GO", text: "Encontrei um eletricista excelente em menos de 10 minutos. Serviço impecável e preço justo!", stars: 5, initials: "AC" },
  { name: "Roberto Lima", city: "Anápolis, GO", text: "Como autônomo, minha agenda lotou no mês seguinte ao cadastro. Recomendo demais!", stars: 5, initials: "RL" },
  { name: "Fernanda Costa", city: "Goiânia, GO", text: "Plataforma simples e direta. Contratei pintor, marceneiro e faxineira tudo aqui.", stars: 5, initials: "FC" },
];

const Stars = ({ count }) => (
  <div className="flex gap-0.5 mb-3">
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} className="text-amber-400 text-sm">★</span>
    ))}
  </div>
);

export default function BuyPesqLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="font-['DM_Sans',sans-serif] bg-slate-50 text-slate-800 overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <span className="font-['Syne',sans-serif] font-800 text-2xl text-blue-700 tracking-tight">
            Buy<span className="text-blue-400">Pesq</span>
          </span>

          {/* Desktop links */}
          <ul className="hidden md:flex gap-8">
            {NAV_LINKS.map((l) => (
              <li key={l}>
                <a href="#" className="text-slate-600 hover:text-blue-700 text-sm font-medium transition-colors">{l}</a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex gap-3">
            <Link to="/login">
            <button className="text-blue-700 border border-blue-700 rounded-full px-5 py-2 text-sm font-medium hover:bg-blue-50 transition-colors">
              Entrar
            </button>
          </Link>

            <Link to="/register">
              <button className="bg-blue-700 text-white rounded-full px-5 py-2 text-sm font-medium hover:bg-blue-800 transition-colors shadow-md shadow-blue-200">
                Cadastrar
              </button>
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <div className={`w-5 h-0.5 bg-current mb-1 transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <div className={`w-5 h-0.5 bg-current mb-1 transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <div className={`w-5 h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-5 pb-5">
            {NAV_LINKS.map((l) => (
              <a key={l} href="#" className="block py-3 text-slate-600 border-b border-slate-50 text-sm">{l}</a>
            ))}
            <div className="flex gap-3 mt-4">
              <button className="flex-1 text-blue-700 border border-blue-700 rounded-full py-2.5 text-sm font-medium">Entrar</button>
              <Link to="/register">
                <button className="flex-1 bg-blue-700 text-white rounded-full py-2.5 text-sm font-medium">Cadastrar</button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />
        <div className="absolute top-20 right-[-100px] w-96 h-96 rounded-full bg-blue-400 opacity-20 blur-3xl" />
        <div className="absolute bottom-0 left-[-80px] w-72 h-72 rounded-full bg-blue-300 opacity-20 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur border border-white/20 text-white text-xs font-medium rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              +1.200 profissionais cadastrados
            </span>

            <h1 className="font-['Syne',sans-serif] text-4xl md:text-6xl font-extrabold text-white leading-[1.1] mb-6">
              Encontre o<br />
              profissional <span className="text-blue-200">certo</span><br />
              perto de você
            </h1>

            <p className="text-blue-100 text-lg leading-relaxed mb-10 max-w-md">
              O BuyPesq conecta você a trabalhadores autônomos verificados da sua região. Rápido, simples e sem intermediários.
            </p>

            {/* Search bar */}
            <div className="bg-white rounded-2xl p-2 flex gap-2 shadow-2xl shadow-blue-900/40 max-w-lg">
              <input
                type="text"
                placeholder="Qual serviço você precisa?"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="flex-1 px-4 py-3 text-slate-700 placeholder-slate-400 text-sm outline-none bg-transparent"
              />

              <Link to="/login">
                <button className="bg-blue-700 hover:bg-blue-800 text-white rounded-xl px-6 py-3 text-sm font-semibold transition-colors whitespace-nowrap">
                  Buscar
                </button>
              </Link>
            </div>

            <p className="text-blue-200 text-xs mt-3">
              Popular: <span className="text-white cursor-pointer hover:underline">Eletricista</span> · <span className="text-white cursor-pointer hover:underline">Encanador</span> · <span className="text-white cursor-pointer hover:underline">Pedreiro</span>
            </p>
          </div>

          {/* Right — Card mockup */}
          <div className="hidden md:flex justify-center">
            <div className="relative">
              {/* Main card */}
              <div className="bg-white rounded-3xl p-6 w-72 shadow-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-xl">🔧</div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">Carlos Mendes</p>
                    <p className="text-slate-500 text-xs">Encanador · Goiânia</p>
                  </div>
                  <span className="ml-auto bg-emerald-50 text-emerald-700 text-xs font-medium px-2.5 py-1 rounded-full">Disponível</span>
                </div>
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <span key={i} className="text-amber-400 text-sm">★</span>)}
                  <span className="text-slate-500 text-xs ml-1">(48)</span>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed mb-5">Especialista em hidráulica residencial e comercial. +8 anos de experiência.</p>
                <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2">
                  <span>💬</span> Chamar no WhatsApp
                </button>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-6 bg-blue-700 text-white rounded-2xl px-4 py-2.5 shadow-xl text-xs font-medium">
                ⭐ 4.9 / 5.0
              </div>
              <div className="absolute -bottom-4 -left-6 bg-white rounded-2xl px-4 py-2.5 shadow-xl text-xs font-medium text-slate-700">
                📍 12 profissionais perto de você
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-blue-700 py-6">
        <div className="max-w-5xl mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { val: "1.200+", label: "Profissionais" },
            { val: "8.500+", label: "Serviços realizados" },
            { val: "4.9★", label: "Avaliação média" },
            { val: "30min", label: "Resposta média" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-['Syne',sans-serif] text-2xl font-bold text-white">{s.val}</p>
              <p className="text-blue-200 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-5">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Como funciona</p>
          <h2 className="font-['Syne',sans-serif] text-3xl md:text-4xl font-bold text-slate-800 mb-16 max-w-md">
            Simples como deve ser
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {STEPS.map((step) => (
              <div key={step.n} className="group">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-5 group-hover:bg-blue-700 transition-colors">
                  <span className="font-['Syne',sans-serif] text-blue-700 group-hover:text-white font-bold text-lg transition-colors">{step.n}</span>
                </div>
                <h3 className="font-['Syne',sans-serif] font-bold text-slate-800 text-lg mb-3">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIAS ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-5">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Categorias</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <h2 className="font-['Syne',sans-serif] text-3xl md:text-4xl font-bold text-slate-800">
              O que você precisa <br className="hidden md:block" />hoje?
            </h2>
            <a href="#" className="text-blue-700 text-sm font-medium hover:underline whitespace-nowrap">Ver todas as categorias →</a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                className="group bg-white hover:bg-blue-700 border border-slate-100 hover:border-blue-700 rounded-2xl p-5 text-left transition-all duration-200 shadow-sm hover:shadow-xl hover:shadow-blue-200 hover:-translate-y-1"
              >
                <span className="text-3xl mb-3 block">{cat.icon}</span>
                <p className="font-['Syne',sans-serif] font-semibold text-slate-700 group-hover:text-white text-sm transition-colors">{cat.label}</p>
                <p className="text-slate-400 group-hover:text-blue-200 text-xs mt-1 transition-colors">{cat.count} profissionais</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARA PROFISSIONAIS ── */}
      <section className="py-24 bg-gradient-to-br from-slate-800 to-slate-900 text-white overflow-hidden relative">
        <div className="absolute right-0 top-0 w-96 h-full bg-blue-700 opacity-10 blur-3xl" />
        <div className="max-w-5xl mx-auto px-5 grid md:grid-cols-2 gap-16 items-center relative">
          <div>
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">Para profissionais</p>
            <h2 className="font-['Syne',sans-serif] text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Sua agenda cheia, <br />sem pagar comissão
            </h2>
            <p className="text-slate-300 leading-relaxed mb-8 text-sm">
              Cadastre seu perfil, defina sua área de atuação e receba contatos diretos de clientes da sua região. O BuyPesq só conecta — a negociação é sua.
            </p>

            <ul className="space-y-3 mb-10">
              {[
                "Perfil profissional completo e verificado",
                "Visibilidade para clientes na sua cidade",
                "Contato direto via WhatsApp, sem taxas",
                "Dashboard com métricas do seu perfil",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-300 text-sm">
                  <span className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            
          <Link to="/register">
            <button className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8 py-4 font-semibold transition-colors shadow-lg shadow-blue-900/40">
              Quero me cadastrar como profissional
            </button>
          </Link>
          </div>

          {/* Mockup profissional */}
          <div className="hidden md:block">
            <div className="bg-slate-700/60 backdrop-blur border border-slate-600/40 rounded-3xl p-6">
              <p className="text-slate-400 text-xs mb-4 font-medium">Seu painel no BuyPesq</p>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { label: "Visualizações", val: "1.248", icon: "👁" },
                  { label: "Contatos", val: "87", icon: "📱" },
                  { label: "Avaliações", val: "4.9★", icon: "⭐" },
                  { label: "Serviços", val: "62", icon: "✅" },
                ].map((m) => (
                  <div key={m.label} className="bg-slate-600/50 rounded-xl p-3">
                    <span className="text-lg">{m.icon}</span>
                    <p className="font-['Syne',sans-serif] font-bold text-white text-xl mt-1">{m.val}</p>
                    <p className="text-slate-400 text-xs">{m.label}</p>
                  </div>
                ))}
              </div>
              <div className="bg-slate-600/50 rounded-xl p-4">
                <p className="text-slate-400 text-xs mb-2">Últimos contatos recebidos</p>
                {["Hoje, 14h32 — João S.", "Hoje, 11h08 — Maria R.", "Ontem — Pedro L."].map((c) => (
                  <div key={c} className="flex items-center gap-2 py-2 border-b border-slate-500/30 last:border-0">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-slate-300 text-xs">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTOS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-5">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Depoimentos</p>
          <h2 className="font-['Syne',sans-serif] text-3xl md:text-4xl font-bold text-slate-800 mb-12">
            Quem já usou, aprovou
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <Stars count={t.stars} />
                <p className="text-slate-700 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs font-bold">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-slate-800 text-sm font-semibold">{t.name}</p>
                    <p className="text-slate-400 text-xs">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-24 bg-gradient-to-br from-blue-700 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="relative max-w-2xl mx-auto px-5 text-center">
          <h2 className="font-['Syne',sans-serif] text-3xl md:text-5xl font-extrabold mb-5 leading-tight">
            Pronto para resolver?
          </h2>
          <p className="text-blue-200 mb-10 text-lg">
            Busque agora e encontre o profissional ideal na sua região em minutos.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-white text-blue-800 hover:bg-blue-50 rounded-full px-8 py-4 font-bold transition-colors shadow-xl text-sm">
              Buscar profissional
            </button>
            <button className="border-2 border-white/50 text-white hover:bg-white/10 rounded-full px-8 py-4 font-semibold transition-colors text-sm">
              Sou profissional autônomo
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-5xl mx-auto px-5">
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
            <div>
              <span className="font-['Syne',sans-serif] text-2xl font-bold text-white">
                Buy<span className="text-blue-400">Pesq</span>
              </span>
              <p className="text-sm mt-2 max-w-xs leading-relaxed">
                Conectando pessoas a trabalhadores autônomos de forma simples e direta.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              {[
                { title: "Plataforma", links: ["Como funciona", "Categorias", "Profissionais", "Blog"] },
                { title: "Empresa", links: ["Sobre nós", "Carreiras", "Imprensa", "Contato"] },
                { title: "Legal", links: ["Privacidade", "Termos de uso", "Cookies"] },
              ].map((col) => (
                <div key={col.title}>
                  <p className="text-white text-sm font-semibold mb-3">{col.title}</p>
                  {col.links.map((l) => (
                    <a key={l} href="#" className="block text-xs py-1 hover:text-white transition-colors">{l}</a>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 text-xs text-center">
            © 2026 BuyPesq. Todos os direitos reservados. · UniEVANGÉLICA — Projeto Integrador
          </div>
        </div>
      </footer>

    </div>
  );
}
