import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import autonImg from "../../../assets/Images/Auton.png";

const ESTADOS = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
    "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
    "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

// ── Ícones ──────────────────────────────────────────────────────────
function EyeIcon({ visible }) {
    return visible ? (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    ) : (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
            <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
            <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg width="11" height="11" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}

// ── Campo reutilizável ───────────────────────────────────────────────
function Field({ label, error, children }) {
    return (
        <div className="mb-3">
            <label className="block text-sm font-semibold text-gray-600 mb-1.5">{label}</label>
            {children}
            {error && <p className="text-xs text-red-500 mt-1 font-medium">{error}</p>}
        </div>
    );
}

// ── Estilos de input compartilhados ─────────────────────────────────
const inputClass = (hasError) =>
    `w-full h-11 px-4 rounded-lg border text-sm outline-none transition-all bg-gray-50 ${hasError
        ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
        : "border-gray-200 focus:border-[#1A56DB] focus:ring-2 focus:ring-[#1A56DB]/10 focus:bg-[#EFF6FF]"
    }`;

// ── Etapa 1 — Dados básicos ──────────────────────────────────────────
function StepDados({ data, onChange, onNext }) {
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [errors, setErrors] = useState({});

    function validate() {
        const e = {};
        if (!data.nome.trim()) e.nome = "Informe seu nome de usuário.";
        else if (data.nome.trim().length < 3) e.nome = "Mínimo de 3 caracteres.";
        if (!data.email) e.email = "Informe seu e-mail.";
        else if (!/\S+@\S+\.\S+/.test(data.email)) e.email = "E-mail inválido.";
        if (!data.telefone) e.telefone = "Informe seu telefone.";
        else if (data.telefone.replace(/\D/g, "").length < 10) e.telefone = "Telefone inválido.";
        if (!data.senha) e.senha = "Informe uma senha.";
        else if (data.senha.length < 6) e.senha = "Mínimo de 6 caracteres.";
        if (!data.confirmar) e.confirmar = "Confirme sua senha.";
        else if (data.senha !== data.confirmar) e.confirmar = "As senhas não coincidem.";
        return e;
    }

    function handleNext() {
        const e = validate();
        if (Object.keys(e).length > 0) { setErrors(e); return; }
        onNext();
    }

    function maskTelefone(val) {
        const d = val.replace(/\D/g, "").slice(0, 11);
        if (d.length <= 10) return d.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim();
        return d.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trim();
    }

    const clr = (name) => (e) => { onChange(name, e.target.value); setErrors(p => ({ ...p, [name]: null })); };

    return (
        <>
            <div className="mb-6">
                
                <p className="text-sm text-gray-500">Preencha seus dados para começar</p>
            </div>

            <Field label="Nome de usuário" error={errors.nome}>
                <input className={inputClass(!!errors.nome)} placeholder="seu_usuario"
                    value={data.nome} onChange={clr("nome")} />
            </Field>

            <Field label="E-mail" error={errors.email}>
                <input className={inputClass(!!errors.email)} type="email" placeholder="seu@email.com"
                    value={data.email} onChange={clr("email")} />
            </Field>

            <Field label="Telefone" error={errors.telefone}>
                <input className={inputClass(!!errors.telefone)} placeholder="(62) 99999-9999"
                    value={data.telefone}
                    onChange={(e) => { onChange("telefone", maskTelefone(e.target.value)); setErrors(p => ({ ...p, telefone: null })); }} />
            </Field>

            <Field label="Senha" error={errors.senha}>
                <div className="relative">
                    <input className={`${inputClass(!!errors.senha)} pr-11`}
                        type={showPass ? "text" : "password"} placeholder="Mínimo 6 caracteres"
                        value={data.senha} onChange={clr("senha")} />
                    <button type="button" onClick={() => setShowPass(v => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        <EyeIcon visible={showPass} />
                    </button>
                </div>
            </Field>

            <Field label="Confirmar senha" error={errors.confirmar}>
                <div className="relative">
                    <input className={`${inputClass(!!errors.confirmar)} pr-11`}
                        type={showConfirm ? "text" : "password"} placeholder="Repita a senha"
                        value={data.confirmar} onChange={clr("confirmar")} />
                    <button type="button" onClick={() => setShowConfirm(v => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        <EyeIcon visible={showConfirm} />
                    </button>
                </div>
            </Field>

            <button onClick={handleNext}
                className="w-full h-11 bg-[#1A56DB] hover:bg-[#1648c0] text-white rounded-lg text-sm font-bold transition-all active:scale-[0.98] mt-2">
                Continuar
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
                <br />
                Já tem conta?{" "}
                <Link to="/login" className="text-[#1A56DB] font-bold hover:underline">Entrar</Link>
            </p>
        </>
    );
}

// ── Etapa 2 — Localização ────────────────────────────────────────────
function StepLocalizacao({ data, onChange, onNext, onBack }) {
    const [errors, setErrors] = useState({});

    function validate() {
        const e = {};
        if (!data.estado) e.estado = "Selecione seu estado.";
        if (!data.municipio.trim()) e.municipio = "Informe seu município.";
        return e;
    }

    function handleNext() {
        const e = validate();
        if (Object.keys(e).length > 0) { setErrors(e); return; }
        onNext();
    }

    const clr = (name) => (e) => { onChange(name, e.target.value); setErrors(p => ({ ...p, [name]: null })); };

    return (
        <>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-black !text-black mb-1">Onde você está?</h2>
                <p className="text-sm text-gray-500">Usamos sua localização para mostrar profissionais da sua região</p>
            </div>

            <Field label="Estado" error={errors.estado}>
                <div className="relative">
                    <select className={`${inputClass(!!errors.estado)} appearance-none pr-10 cursor-pointer`}
                        value={data.estado} onChange={clr("estado")}>
                        <option value="">Selecione o estado</option>
                        {ESTADOS.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </span>
                </div>
            </Field>

            <Field label="Município" error={errors.municipio}>
                <input className={inputClass(!!errors.municipio)} placeholder="Nome da sua cidade"
                    value={data.municipio} onChange={clr("municipio")} />
            </Field>

            <button onClick={handleNext}
                className="w-full h-11 bg-[#1A56DB] hover:bg-[#1648c0] text-white rounded-lg text-sm font-bold transition-all active:scale-[0.98] mt-6">
                Continuar
            </button>
            <button onClick={onBack}
                className="w-full h-11 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-semibold transition-all mt-3">
                Voltar
            </button>
        </>
    );
}

// ── Etapa 3 — Termos ─────────────────────────────────────────────────
function StepTermos({ onNext, onBack, loading }) {
    const [aceitouTermos, setAceitouTermos] = useState(false);
    const [aceitouPriv, setAceitouPriv] = useState(false);
    const [error, setError] = useState("");

    function handleCriar() {
        if (!aceitouTermos || !aceitouPriv) { setError("Aceite os termos para continuar."); return; }
        setError("");
        onNext();
    }

    return (
        <>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Termos e Privacidade</h2>
                <p className="text-sm text-gray-500">Leia e aceite para criar sua conta</p>
            </div>

            {/* Caixa de termos */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-40 overflow-y-auto text-xs text-gray-600 leading-relaxed mb-4">
                <strong className="text-gray-800">Termos de Uso</strong>
                <p className="mt-2">Ao utilizar o BuyPesq, você concorda em usar a plataforma de forma responsável e de boa-fé. É proibido cadastrar informações falsas, usar o sistema para fins ilegais ou prejudicar outros usuários. O BuyPesq atua apenas como intermediador de contatos entre clientes e profissionais autônomos, não sendo responsável pela execução ou qualidade dos serviços contratados.</p>
                <strong className="text-gray-800 block mt-3">Política de Privacidade</strong>
                <p className="mt-2">Seus dados pessoais são coletados exclusivamente para funcionamento da plataforma e não são vendidos a terceiros. Você pode solicitar a exclusão dos seus dados a qualquer momento. Ao continuar, você consente com o tratamento dos seus dados conforme a LGPD.</p>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 mb-4">
                {[
                    { val: aceitouTermos, set: setAceitouTermos, label: <>Li e aceito os <strong>Termos de Uso</strong></> },
                    { val: aceitouPriv, set: setAceitouPriv, label: <>Li e aceito a <strong>Política de Privacidade</strong></> },
                ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 cursor-pointer"
                        onClick={() => { item.set(v => !v); setError(""); }}>
                        <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border-2 transition-all
                            ${item.val ? "bg-[#1A56DB] border-[#1A56DB]" : "bg-white border-gray-300"}`}>
                            {item.val && <CheckIcon />}
                        </div>
                        <span className="text-sm text-gray-600">{item.label}</span>
                    </div>
                ))}
            </div>

            {error && <p className="text-xs text-red-500 font-medium mb-3">{error}</p>}

            <button onClick={handleCriar} disabled={loading}
                className="w-full h-11 bg-[#1A56DB] hover:bg-[#1648c0] disabled:bg-[#3B82F6] text-white rounded-lg text-sm font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                {loading ? (
                    <>
                        <svg className="animate-spin" width="16" height="16" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                            <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                        </svg>
                        Criando conta...
                    </>
                ) : "Criar conta"}
            </button>
            <button onClick={onBack}
                className="w-full h-11 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-semibold transition-all mt-3">
                Voltar
            </button>
        </>
    );
}

// ── Tela de sucesso ──────────────────────────────────────────────────
function StepSucesso() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center text-center h-full py-8">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <svg width="40" height="40" fill="none" stroke="#16A34A" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Conta criada com sucesso!</h2>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                Bem-vindo ao BuyPesq. Agora escolha como quer usar a plataforma.
            </p>
            <button onClick={() => navigate("/select-profile")}
                className="w-full h-11 bg-[#1A56DB] hover:bg-[#1648c0] text-white rounded-lg text-sm font-bold transition-all active:scale-[0.98]">
                Continuar para o app
            </button>
        </div>
    );
}

// ── Componente principal ─────────────────────────────────────────────
const STEP_LABELS = ["Dados", "Localização", "Termos"];

export default function Register() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [dados, setDados] = useState({ nome: "", email: "", telefone: "", senha: "", confirmar: "" });
    const [localizacao, setLocalizacao] = useState({ estado: "", municipio: "" });

    function updateDados(key, val) { setDados(p => ({ ...p, [key]: val })); }
    function updateLoc(key, val) { setLocalizacao(p => ({ ...p, [key]: val })); }

    function handleFinish() {
        setLoading(true);
        setTimeout(() => { setLoading(false); setStep(4); }, 2000);
    }

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
                rel="stylesheet"
            />

            <div className="h-screen flex overflow-hidden font-['Plus_Jakarta_Sans']">

                {/* ── PAINEL ESQUERDO ── */}
                <div className="hidden lg:block w-[50%] relative overflow-hidden">

                    <img
                        src={autonImg}
                        alt="Profissional autônomo"
                        className="w-full h-full object-cover scale-105 object-[70%_50%]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    <div className="absolute top-8 left-8">
                        <span className="text-2xl font-extrabold text-white tracking-tight">
                            Buy<span className="text-blue-300">Pesq</span>
                        </span>
                    </div>

                    <div className="absolute bottom-10 left-8 right-8">
                        <p className="text-white text-2xl font-bold leading-snug mb-2">
                            Crie sua conta e comece agora
                        </p>
                        <p className="text-white/70 text-sm">
                            São apenas 3 passos rápidos para você começar a usar o BuyPesq.
                        </p>
                    </div>

                </div>

                {/* ── PAINEL DIREITO ── */}
                <div className="flex w-full lg:w-[50%] items-center justify-center bg-white px-6 py-10 overflow-y-auto">

                    <div className="w-full max-w-[400px]">

                        {/* Logo mobile */}
                        <div className="flex lg:hidden justify-center mb-6">
                            <span className="text-2xl font-extrabold text-gray-900">
                                Buy<span className="text-[#1A56DB]">Pesq</span>
                            </span>
                        </div>

                        {/* Barra de progresso */}
                        {step <= 3 && (
                            <div className="mb-6">
                                <div className="flex gap-1.5 mb-2">
                                    {[1, 2, 3].map(n => (
                                        <div
                                            key={n}
                                            className={`flex-1 h-1 rounded-full transition-all duration-300
                                        ${n <= step ? "bg-[#1A56DB]" : "bg-gray-200"}`}
                                        />
                                    ))}
                                </div>

                                <p className="text-xs text-gray-400 font-medium">
                                    Etapa {step} de 3 — {STEP_LABELS[step - 1]}
                                </p>
                            </div>
                        )}

                        {/* Etapas */}
                        {step === 1 && (
                            <StepDados
                                data={dados}
                                onChange={updateDados}
                                onNext={() => setStep(2)}
                            />
                        )}

                        {step === 2 && (
                            <StepLocalizacao
                                data={localizacao}
                                onChange={updateLoc}
                                onNext={() => setStep(3)}
                                onBack={() => setStep(1)}
                            />
                        )}

                        {step === 3 && (
                            <StepTermos
                                onNext={handleFinish}
                                onBack={() => setStep(2)}
                                loading={loading}
                            />
                        )}

                        {step === 4 && <StepSucesso />}

                    </div>

                </div>

            </div>
        </>
    );
}