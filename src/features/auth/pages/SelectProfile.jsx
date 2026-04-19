import { useState } from "react";
import { motion } from "framer-motion";

const PROFILES = [
    {
        id: "client",
        title: "Cliente",
        desc: "Quero contratar serviços",
        features: [
            "Busca por profissionais",
            "Ver perfis e avaliações",
            "Contato via WhatsApp",
        ],
        icon: (selected) => (
            <svg width="28" height="28" fill="none" stroke={selected ? "white" : "#1A56DB"} strokeWidth="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
    },
    {
        id: "professional",
        title: "Negociante",
        desc: "Quero oferecer serviços",
        features: [
            "Perfil profissional",
            "Receba contatos diretos",
            "Gerencie sua área",
        ],
        icon: (selected) => (
            <svg width="28" height="28" fill="none" stroke={selected ? "white" : "#1A56DB"} strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
            </svg>
        ),
    },
];

function CheckIcon() {
    return (
        <svg width="10" height="10" fill="none" stroke="white" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}

export default function SelectProfile() {
    const [selected, setSelected] = useState(null);
    const selectedProfile = PROFILES.find((p) => p.id === selected);

    function handleConfirm() {
        if (!selected) return;
        console.log("Perfil selecionado:", selected);
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 font-[Plus Jakarta Sans]">

            {/* Header */}
            <div className="pt-14 pb-10 flex flex-col items-center bg-gradient-to-b from-[#1A56DB]/10 to-transparent">
                <div className="text-[28px] font-extrabold text-[#111827] tracking-tight">
                    Buy<span className="text-[#1A56DB]">Pesq</span>
                </div>
            </div>

            {/* Body */}
            <div className="flex-1 flex flex-col max-w-md sm:max-w-lg w-full mx-auto px-6 pt-12 pb-10">



                <p className="text-[14px] text-[#4B5563] text-center mb-12">
                    Escolha seu perfil para personalizarmos sua experiência
                </p>

                {/* Cards */}
                <div className="flex gap-4 mb-12">
                    {PROFILES.map((profile) => {
                        const isSelected = selected === profile.id;

                        return (
                            <motion.div
                                key={profile.id}
                                onClick={() => setSelected(profile.id)}
                                whileHover={{ y: -4 }}
                                whileTap={{ scale: 0.97 }}
                                className={`
                  flex-1 relative flex flex-col items-center gap-3 px-4 py-7 rounded-3xl cursor-pointer
                  transition-all
                  ${isSelected
                                        ? "border-2 border-[#1A56DB] bg-[#EFF6FF] shadow-[0_12px_32px_rgba(26,86,219,0.18)]"
                                        : "border-2 border-[#E5E7EB] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)]"}
                `}
                            >
                                {/* Check */}
                                <div className={`absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center ${isSelected ? "bg-[#1A56DB]" : "bg-[#E5E7EB]"}`}>
                                    {isSelected && <CheckIcon />}
                                </div>

                                {/* Icon */}
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${isSelected ? "bg-[#1A56DB]" : "bg-[#F3F4F6]"}`}>
                                    {profile.icon(isSelected)}
                                </div>

                                {/* Title */}
                                <div className={`text-[16px] font-bold ${isSelected ? "text-[#1A56DB]" : "text-[#111827]"}`}>
                                    {profile.title}
                                </div>

                                {/* Desc */}
                                <div className="text-[13px] text-[#4B5563] text-center">
                                    {profile.desc}
                                </div>

                                {/* Features */}
                                <div className={`w-full flex flex-col gap-1.5 mt-2 pt-3 border-t ${isSelected ? "border-[#BFDBFE]" : "border-[#E5E7EB]"}`}>
                                    {profile.features.map((f) => (
                                        <div key={f} className="flex items-center gap-2 text-[11px] text-[#4B5563]">
                                            <div className={`w-[6px] h-[6px] rounded-full ${isSelected ? "bg-[#1A56DB]" : "bg-[#9CA3AF]"}`} />
                                            {f}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Button */}
                <motion.button
                    onClick={handleConfirm}
                    disabled={!selected}
                    whileTap={{ scale: selected ? 0.97 : 1 }}
                    className={`
            w-full h-[52px] rounded-xl text-[16px] font-semibold transition-all
            ${selected
                            ? "bg-[#1A56DB] text-white shadow-md hover:shadow-lg"
                            : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"}
          `}
                >
                    {selected
                        ? `Continuar como ${selectedProfile?.title}`
                        : "Selecione um perfil"}
                </motion.button>

                {/* Hint */}
                <p className="text-[12px] text-[#9CA3AF] text-center mt-4">
                    Você pode alterar depois nas configurações
                </p>
            </div>
        </div>
    );
}