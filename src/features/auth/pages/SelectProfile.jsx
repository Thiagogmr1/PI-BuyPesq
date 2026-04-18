import { useState } from "react";

const PROFILES = [
    {
        id: "client",
        title: "Cliente",
        desc: "Quero contratar serviços",
        features: ["Busca por profissionais", "Ver perfis e avaliações", "Contato via WhatsApp"],
        icon: (selected) => (
            <svg width="32" height="32" fill="none" stroke={selected ? "white" : "#1A56DB"} strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
    },
    {
        id: "professional",
        title: "Negociante",
        desc: "Quero oferecer serviços",
        features: ["Perfil profissional", "Receba contatos diretos", "Gerencie sua área"],
        icon: (selected) => (
            <svg width="32" height="32" fill="none" stroke={selected ? "white" : "#1A56DB"} strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                <line x1="12" y1="12" x2="12" y2="16" />
                <line x1="10" y1="14" x2="14" y2="14" />
            </svg>
        ),
    },
];

function CheckIcon() {
    return (
        <svg width="11" height="11" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}

export default function SelectProfile() {
    const [selected, setSelected] = useState(null);
    const [btnScale, setBtnScale] = useState(1);

    function handleConfirm() {
        if (!selected) return;
        console.log("Perfil selecionado:", selected);
    }

    return (
        <div className="min-h-screen flex flex-col bg-white font-[Plus Jakarta Sans]">
            {/* Header */}
            <div className="bg-[#1A56DB] pt-12 pb-8 px-6 flex flex-col items-center rounded-b-[32px]">
                <div className="text-[26px] font-extrabold text-white tracking-[-0.5px]">
                    Buy<span className="text-[#BFDBFE]">Pesq</span>
                </div>
            </div>

            {/* Body */}
            <div className="flex-1 flex flex-col max-w-[480px] w-full mx-auto px-6 pt-10 pb-8">
                <div className="text-[22px] font-bold text-[#111827] text-center mb-1">
                    Como você usará o app?
                </div>

                <div className="text-[14px] text-[#4B5563] text-center mb-10 leading-relaxed">
                    Escolha seu perfil para personalizarmos <br />
                    sua experiência no BuyPesq
                </div>

                {/* Cards */}
                <div className="flex gap-4 mb-10">
                    {PROFILES.map((profile) => {
                        const sel = selected === profile.id;

                        return (
                            <div
                                key={profile.id}
                                onClick={() => setSelected(profile.id)}
                                className={`
                                    flex-1 relative flex flex-col items-center gap-3 px-4 py-7 rounded-2xl cursor-pointer
                                    transition-all duration-200
                                    ${sel
                                        ? "border-2 border-[#1A56DB] bg-[#EFF6FF] -translate-y-1 shadow-[0_8px_24px_rgba(26,86,219,0.15)]"
                                        : "border-2 border-[#E5E7EB] bg-white shadow-sm"}
                                `}
                            >
                                {/* Check */}
                                <div
                                    className={`
                                        absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center
                                        ${sel ? "bg-[#1A56DB]" : "bg-[#E5E7EB]"}
                                    `}
                                >
                                    {sel && <CheckIcon />}
                                </div>

                                {/* Icon */}
                                <div
                                    className={`
                                        w-16 h-16 rounded-2xl flex items-center justify-center transition
                                        ${sel ? "bg-[#1A56DB]" : "bg-[#F3F4F6]"}
                                    `}
                                >
                                    {profile.icon(sel)}
                                </div>

                                {/* Title */}
                                <div
                                    className={`
                                        text-[15px] font-bold text-center
                                        ${sel ? "text-[#1A56DB]" : "text-[#111827]"}
                                    `}
                                >
                                    {profile.title}
                                </div>

                                {/* Desc */}
                                <div className="text-[12px] text-[#4B5563] text-center leading-snug">
                                    {profile.desc}
                                </div>

                                {/* Features */}
                                <div
                                    className={`
                                        w-full flex flex-col gap-1.5 mt-1 pt-3 border-t
                                        ${sel ? "border-[#BFDBFE]" : "border-[#E5E7EB]"}
                                    `}
                                >
                                    {profile.features.map((f) => (
                                        <div key={f} className="flex items-center gap-1.5 text-[11px] text-[#4B5563]">
                                            <div
                                                className={`
                                                    w-[6px] h-[6px] rounded-full
                                                    ${sel ? "bg-[#1A56DB]" : "bg-[#9CA3AF]"}
                                                `}
                                            />
                                            {f}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Button */}
                <button
                    onClick={handleConfirm}
                    disabled={!selected}
                    onMouseDown={() => selected && setBtnScale(0.97)}
                    onMouseUp={() => setBtnScale(1)}
                    onMouseLeave={() => setBtnScale(1)}
                    style={{ transform: `scale(${btnScale})` }}
                    className={`
                        w-full h-[50px] rounded-lg text-[16px] font-bold transition
                        ${selected
                            ? "bg-[#1A56DB] text-white cursor-pointer"
                            : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"}
                    `}
                >
                    {selected
                        ? `Continuar como ${PROFILES.find(p => p.id === selected)?.title}`
                        : "Selecione um perfil"}
                </button>

                {/* Hint */}
                <div className="text-[12px] text-[#9CA3AF] text-center mt-4 leading-relaxed">
                    Você pode alterar seu perfil depois nas configurações
                </div>
            </div>
        </div>
    );
}