import { useState } from "react";

const categories = [
  { icon: "🧱", label: "Pedreiro" },
  { icon: "🧹", label: "Limpeza" },
  { icon: "🧵", label: "Costura" },
  { icon: "🔧", label: "Encanador" },
  { icon: "⚡", label: "Elétrica" },
  { icon: "🎨", label: "Pintor" },
];

const stores = [
  { icon: "📱", label: "Celulares", count: 32, open: true },
  { icon: "🍔", label: "Lanches", count: 18, open: true },
  { icon: "🛋️", label: "Decorações", count: 9, open: false },
  { icon: "👗", label: "Roupas", count: 41, open: true },
  { icon: "💊", label: "Farmácias", count: 14, open: true },
  { icon: "🐾", label: "Pet Shop", count: 7, open: false },
];

const recents = ["Motorista", "Assistência técnica", "Restaurante japonês"];

const navLinks = ["Início", "Lojas", "Serviços", "Promoções", "Pedidos", "Favoritos"];

const IconSearch = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconBell = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const IconChevronDown = () => (
  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const IconHistory = () => (
  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 .49-3" />
  </svg>
);

const IconHome = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const IconUser = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconChat = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export default function BuyPesqHome() {
  const [activeNav, setActiveNav] = useState("Início");
  const [activeMobile, setActiveMobile] = useState("home");
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col min-h-screen bg-blue-50/90 font-sans">

      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="text-xl font-extrabold text-blue-900 tracking-tight">
          Buy<span className="text-blue-600">Pesq</span>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 text-xs text-gray-500 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
            <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
            DDD 62 · Anápolis
            <IconChevronDown />
          </button>

          <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
            <IconBell />
          </button>

          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm cursor-pointer">
            U
          </div>
        </div>
      </header>

      {/* NAV DESKTOP */}
      <nav className="hidden sm:flex bg-white p border-b border-gray-200 px-6 gap-1 overflow-x-auto">
        {navLinks.map((item) => (
          <button
            key={item}
            onClick={() => setActiveNav(item)}
            className={`px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeNav === item
                ? "text-blue-600 border-blue-600"
                : "text-gray-400 border-transparent hover:text-gray-700"
            }`}
          >
            {item}
          </button>
        ))}
      </nav>

      {/* MAIN */}
      <main className="flex-1 px-4 sm:px-6 py-5 max-w-screen-xl mx-auto w-full">

        {/* SEARCH */}
        <div className="relative mb-6">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <IconSearch />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="O que deseja?"
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none bg-white text-sm transition-colors"
          />
        </div>

        {/* BANNER */}
        <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-5 mb-7 flex items-center justify-between">
          <div>
            <h2 className="text-white font-extrabold text-lg sm:text-xl mb-1">
              Encontre tudo perto de você
            </h2>
            <p className="text-blue-200 text-sm">Lojas, serviços e produtos na sua região</p>
            <button className="mt-3 bg-white text-blue-600 font-bold text-sm px-4 py-2 rounded-full hover:bg-blue-50 transition-colors">
              Explorar agora
            </button>
          </div>
          <span className="text-5xl hidden sm:block">🛍️</span>
        </div>

        {/* EM ALTA */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-extrabold text-gray-800">Em alta</h2>
            <button className="text-sm text-blue-600 font-semibold hover:underline">Ver tudo →</button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.label}
                className="bg-white border border-gray-200 rounded-2xl p-3 flex flex-col items-center gap-2 hover:border-blue-400 hover:shadow-sm hover:-translate-y-0.5 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">
                  {cat.icon}
                </div>
                <span className="text-xs font-bold text-gray-700 text-center">{cat.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* LOJAS E PRODUTOS */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-extrabold text-gray-800">Lojas e Produtos</h2>
            <button className="text-sm text-blue-600 font-semibold hover:underline">Ver tudo →</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {stores.map((store) => (
              <button
                key={store.label}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:-translate-y-0.5 hover:shadow-md transition-all text-left"
              >
                <div className="h-20 bg-blue-50 flex items-center justify-center text-4xl">
                  {store.icon}
                </div>
                <div className="p-3">
                  <div className="text-sm font-bold text-gray-800 mb-1.5">{store.label}</div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        store.open
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {store.open ? "Aberto" : "Fechado"}
                    </span>
                    <span className="text-xs text-gray-400">{store.count} lojas</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* BUSCAS RECENTES */}
        <section className="mb-8">
          <h2 className="text-base font-extrabold text-gray-800 mb-3">Buscas recentes</h2>
          <div className="flex flex-col gap-1">
            {recents.map((item) => (
              <button
                key={item}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white transition-colors text-sm text-gray-500 text-left"
              >
                <div className="w-7 h-7 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 flex-shrink-0">
                  <IconHistory />
                </div>
                {item}
              </button>
            ))}
          </div>
        </section>

      </main>

      {/* BOTTOM NAV — mobile */}
      <nav className="sm:hidden bg-white border-t border-gray-200 sticky bottom-0 z-50">
        <div className="flex justify-around py-2">
          {[
            { id: "home", label: "Início", Icon: IconHome },
            { id: "perfil", label: "Perfil", Icon: IconUser },
            { id: "chats", label: "Chats", Icon: IconChat },
          ].map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveMobile(id)}
              className={`flex flex-col items-center gap-1 px-5 py-1 text-xs font-semibold transition-colors ${
                activeMobile === id ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <Icon />
              {label}
            </button>
          ))}
        </div>
      </nav>

    </div>
  );
}
