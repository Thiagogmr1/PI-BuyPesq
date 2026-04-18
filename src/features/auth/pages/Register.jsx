import { useState } from "react";
import { Link } from "react-router-dom";

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
        <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}

// ── Componente de campo reutilizável ────────────────────────────────
function Field({ label, error, children }) {
    return (
        <div className="mb-3.5">
            <label className="block text-[13px] font-semibold text-gray-600 mb-1.5">
                {label}
            </label>
            {children}
            {error && (
                <div className="text-xs text-red-600 font-medium mt-1">{error}</div>
            )}
        </div>
    );
}

// ── Input reutilizável ──────────────────────────────────────────────
function Input({ hasError, icon, ...props }) {
    const [focused, setFocused] = useState(false);
    return (
        <div className="relative flex items-center">
            <input
                className={[
                    "w-full h-12 rounded-lg border-[1.5px] pl-4 pr-11 text-[15px] text-gray-900 outline-none box-border transition-all duration-200 font-[inherit]",
                    hasError
                        ? "border-red-600 bg-gray-100"
                        : focused
                            ? "border-blue-700 bg-blue-50"
                            : "border-gray-200 bg-gray-100",
                ].join(" ")}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                {...props}
            />
            {icon && (
                <span className="absolute right-3.5 text-gray-400 flex items-center select-none pointer-events-none">
                    {icon}
                </span>
            )}
        </div>
    );
}

// ── Input de senha (com toggle visibilidade) ────────────────────────
function PasswordInput({ hasError, showPass, onToggle, ...props }) {
    const [focused, setFocused] = useState(false);
    return (
        <div className="relative flex items-center">
            <input
                type={showPass ? "text" : "password"}
                className={[
                    "w-full h-12 rounded-lg border-[1.5px] pl-4 pr-11 text-[15px] text-gray-900 outline-none box-border transition-all duration-200 font-[inherit]",
                    hasError
                        ? "border-red-600 bg-gray-100"
                        : focused
                            ? "border-blue-700 bg-blue-50"
                            : "border-gray-200 bg-gray-100",
                ].join(" ")}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                {...props}
            />
            <span
                className="absolute right-3.5 text-gray-400 flex items-center cursor-pointer"
                onClick={onToggle}
            >
                <EyeIcon visible={showPass} />
            </span>
        </div>
    );
}

// ── Select reutilizável ─────────────────────────────────────────────
function Select({ hasError, children, ...props }) {
    const [focused, setFocused] = useState(false);
    return (
        <div className="relative flex items-center">
            <select
                className={[
                    "w-full h-12 rounded-lg border-[1.5px] pl-4 pr-4 text-[15px] text-gray-900 outline-none box-border transition-all duration-200 font-[inherit] appearance-none cursor-pointer",
                    hasError
                        ? "border-red-600 bg-gray-100"
                        : focused
                            ? "border-blue-700 bg-blue-50"
                            : "border-gray-200 bg-gray-100",
                ].join(" ")}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                {...props}
            >
                {children}
            </select>
            <span className="absolute right-3.5 text-gray-400 flex items-center pointer-events-none">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </span>
        </div>
    );
}

// ── Etapa 1 — Dados básicos ─────────────────────────────────────────
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
        const digits = val.replace(/\D/g, "").slice(0, 11);
        if (digits.length <= 10)
            return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim();
        return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trim();
    }

    const clr = (name) => (e) => {
        onChange(name, e.target.value);
        setErrors((p) => ({ ...p, [name]: null }));
    };

    const userIcon = (
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
    );
    const emailIcon = (
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
        </svg>
    );
    const phoneIcon = (
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
    );

    return (
        <div className="flex-1 px-6 pt-8 pb-8 flex flex-col max-w-[480px] w-full mx-auto box-border">
            <div className="text-xl font-bold text-gray-900 mb-1">Crie sua conta</div>
            <div className="text-[13px] text-gray-600 mb-6">Preencha seus dados para começar</div>

            <Field label="Nome de usuário" error={errors.nome}>
                <Input
                    placeholder="seu_usuario"
                    value={data.nome}
                    onChange={clr("nome")}
                    hasError={!!errors.nome}
                    icon={userIcon}
                />
            </Field>

            <Field label="E-mail" error={errors.email}>
                <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={data.email}
                    onChange={clr("email")}
                    hasError={!!errors.email}
                    icon={emailIcon}
                />
            </Field>

            <Field label="Telefone" error={errors.telefone}>
                <Input
                    placeholder="(62) 99999-9999"
                    value={data.telefone}
                    onChange={(e) => {
                        onChange("telefone", maskTelefone(e.target.value));
                        setErrors((p) => ({ ...p, telefone: null }));
                    }}
                    hasError={!!errors.telefone}
                    icon={phoneIcon}
                />
            </Field>

            <Field label="Senha" error={errors.senha}>
                <PasswordInput
                    placeholder="Mínimo 6 caracteres"
                    value={data.senha}
                    onChange={clr("senha")}
                    hasError={!!errors.senha}
                    showPass={showPass}
                    onToggle={() => setShowPass((v) => !v)}
                />
            </Field>

            <Field label="Confirmar senha" error={errors.confirmar}>
                <PasswordInput
                    placeholder="Confirme a senha"
                    value={data.confirmar}
                    onChange={clr("confirmar")}
                    hasError={!!errors.confirmar}
                    showPass={showConfirm}
                    onToggle={() => setShowConfirm((v) => !v)}
                />
            </Field>

            <button
                className="w-full h-[50px] bg-blue-700 hover:bg-blue-800 text-white border-none rounded-lg text-base font-bold cursor-pointer font-[inherit] mt-2 transition-colors duration-200"
                onClick={handleNext}
            >
                Continuar
            </button>

            <div className="text-center mt-auto pt-4">
                <span className="text-sm text-gray-600">
                    Já tem uma conta?
                    <Link to="/login" className="text-blue-700 font-bold ml-1 cursor-pointer">
                        Entrar
                    </Link>
                </span>
            </div>
        </div>
    );
}

// ── Etapa 2 — Localização ───────────────────────────────────────────
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

    const clr = (name) => (e) => {
        onChange(name, e.target.value);
        setErrors((p) => ({ ...p, [name]: null }));
    };

    const locationIcon = (
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
        </svg>
    );

    return (
        <div className="flex-1 px-6 pt-8 pb-8 flex flex-col max-w-[480px] w-full mx-auto box-border">
            <div className="text-xl font-bold text-gray-900 mb-1">Onde você está?</div>
            <div className="text-[13px] text-gray-600 mb-6">
                Usamos sua localização para mostrar profissionais da sua região
            </div>

            <Field label="Estado" error={errors.estado}>
                <Select
                    value={data.estado}
                    onChange={clr("estado")}
                    hasError={!!errors.estado}
                >
                    <option value="">Selecione o estado</option>
                    {ESTADOS.map((uf) => (
                        <option key={uf} value={uf}>{uf}</option>
                    ))}
                </Select>
            </Field>

            <Field label="Município" error={errors.municipio}>
                <Input
                    placeholder="Nome da sua cidade"
                    value={data.municipio}
                    onChange={clr("municipio")}
                    hasError={!!errors.municipio}
                    icon={locationIcon}
                />
            </Field>

            <button
                className="w-full h-[50px] bg-blue-700 hover:bg-blue-800 text-white border-none rounded-lg text-base font-bold cursor-pointer font-[inherit] mt-2 transition-colors duration-200"
                onClick={handleNext}
            >
                Continuar
            </button>
            <button
                className="w-full h-[50px] bg-transparent text-blue-700 border-[1.5px] border-blue-700 rounded-lg text-[15px] font-semibold cursor-pointer font-[inherit] mt-2.5 hover:bg-blue-50 transition-colors duration-200"
                onClick={onBack}
            >
                Voltar
            </button>
        </div>
    );
}

// ── Etapa 3 — Termos ────────────────────────────────────────────────
function StepTermos({ onNext, onBack, loading }) {
    const [aceitouTermos, setAceitouTermos] = useState(false);
    const [aceitouPriv, setAceitouPriv] = useState(false);
    const [error, setError] = useState("");

    function handleCriar() {
        if (!aceitouTermos || !aceitouPriv) {
            setError("Você precisa aceitar os termos para continuar.");
            return;
        }
        setError("");
        onNext();
    }

    function Checkbox({ checked, onToggle, children }) {
        return (
            <div
                className="flex items-start gap-2.5 mb-4 cursor-pointer"
                onClick={onToggle}
            >
                <div
                    className={[
                        "w-5 h-5 rounded flex-shrink-0 mt-[1px] flex items-center justify-center transition-all duration-150 cursor-pointer",
                        checked
                            ? "bg-blue-700 border-2 border-blue-700"
                            : "bg-white border-2 border-gray-400",
                    ].join(" ")}
                >
                    {checked && <CheckIcon />}
                </div>
                <span className="text-[13px] text-gray-700 leading-relaxed">{children}</span>
            </div>
        );
    }

    return (
        <div className="flex-1 px-6 pt-8 pb-8 flex flex-col max-w-[480px] w-full mx-auto box-border">
            <div className="text-xl font-bold text-gray-900 mb-1">Termos e Privacidade</div>
            <div className="text-[13px] text-gray-600 mb-6">Leia e aceite para criar sua conta</div>

            <div className="flex-1 bg-gray-100 rounded-xl p-4 overflow-y-auto max-h-[220px] text-[13px] text-gray-700 leading-relaxed mb-5">
                <strong>Termos de Uso</strong>
                <p className="mt-2">
                    Ao utilizar o BuyPesq, você concorda em usar a plataforma de forma responsável e de boa-fé.
                    É proibido cadastrar informações falsas, usar o sistema para fins ilegais ou prejudicar outros usuários.
                    O BuyPesq atua apenas como intermediador de contatos entre clientes e profissionais autônomos,
                    não sendo responsável pela execução ou qualidade dos serviços contratados.
                </p>
                <p className="mt-3">
                    <strong>Política de Privacidade</strong>
                </p>
                <p className="mt-2">
                    Seus dados pessoais (nome, e-mail, telefone e localização) são coletados exclusivamente para
                    funcionamento da plataforma e não são vendidos a terceiros. Utilizamos cookies para melhorar
                    sua experiência. Você pode solicitar a exclusão dos seus dados a qualquer momento pelo suporte.
                    Ao continuar, você consente com o tratamento dos seus dados conforme a LGPD.
                </p>
            </div>

            <Checkbox
                checked={aceitouTermos}
                onToggle={() => { setAceitouTermos((v) => !v); setError(""); }}
            >
                Li e aceito os <strong>Termos de Uso</strong> do BuyPesq
            </Checkbox>

            <Checkbox
                checked={aceitouPriv}
                onToggle={() => { setAceitouPriv((v) => !v); setError(""); }}
            >
                Li e aceito a <strong>Política de Privacidade</strong>
            </Checkbox>

            {error && (
                <div className="text-xs text-red-600 font-medium mb-2">{error}</div>
            )}

            <button
                className={[
                    "w-full h-[50px] text-white border-none rounded-lg text-base font-bold font-[inherit] mt-2 transition-colors duration-200",
                    loading ? "bg-blue-500 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800 cursor-pointer",
                ].join(" ")}
                onClick={handleCriar}
                disabled={loading}
            >
                {loading ? "Criando conta..." : "Criar conta"}
            </button>
            <button
                className="w-full h-[50px] bg-transparent text-blue-700 border-[1.5px] border-blue-700 rounded-lg text-[15px] font-semibold cursor-pointer font-[inherit] mt-2.5 hover:bg-blue-50 transition-colors duration-200"
                onClick={onBack}
            >
                Voltar
            </button>
        </div>
    );
}

// ── Tela de sucesso ─────────────────────────────────────────────────
function StepSucesso() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <svg width="40" height="40" fill="none" stroke="#16A34A" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            </div>
            <div className="text-[22px] font-bold text-gray-900 mb-2">Conta criada com sucesso!</div>
            <div className="text-sm text-gray-600 mb-10 leading-relaxed">
                Bem-vindo ao BuyPesq. Agora você pode buscar profissionais ou cadastrar seus serviços.
            </div>
            <button className="w-full h-[50px] bg-blue-700 hover:bg-blue-800 text-white border-none rounded-lg text-base font-bold cursor-pointer font-[inherit] transition-colors duration-200">
                Continuar para o app
            </button>
        </div>
    );
}

// ── Componente principal ────────────────────────────────────────────
const STEP_LABELS = ["Dados", "Localização", "Termos"];

export default function Register() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const [dados, setDados] = useState({ nome: "", email: "", telefone: "", senha: "", confirmar: "" });
    const [localizacao, setLocalizacao] = useState({ estado: "", municipio: "" });

    function updateDados(key, val) { setDados((p) => ({ ...p, [key]: val })); }
    function updateLoc(key, val) { setLocalizacao((p) => ({ ...p, [key]: val })); }

    function handleFinish() {
        setLoading(true);
        setTimeout(() => { setLoading(false); setStep(4); }, 2000);
    }

    const showProgress = step <= 3;

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
                rel="stylesheet"
            />
            <div className="min-h-screen bg-white flex flex-col font-[Plus_Jakarta_Sans,sans-serif]">
                {/* Header */}
                <div className="bg-[#1A56DB] pt-[30px] pb-[40px] px-[24px] flex flex-col items-center rounded-b-[32px]">
                    <div className="text-[26px] font-extrabold text-white tracking-tight mb-4">
                        Buy<span className="text-blue-200">Pesq</span>
                    </div>

                    {showProgress && (
                        <>
                            <div className="flex items-center gap-1.5 w-full max-w-[260px]">
                                {[1, 2, 3].map((n) => (
                                    <div
                                        key={n}
                                        className={[
                                            "flex-1 h-1 rounded-full transition-colors duration-300",
                                            n === step || n < step ? "bg-white" : "bg-white/30",
                                        ].join(" ")}
                                    />
                                ))}
                            </div>
                            <div className="text-[11px] text-blue-200 mt-2 text-center">
                                Etapa {step} de 3 — {STEP_LABELS[step - 1]}
                            </div>
                        </>
                    )}
                </div>

                {/* Etapas */}
                {step === 1 && (
                    <StepDados data={dados} onChange={updateDados} onNext={() => setStep(2)} />
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
                    <StepTermos onNext={handleFinish} onBack={() => setStep(2)} loading={loading} />
                )}
                {step === 4 && <StepSucesso />}
            </div>
        </>
    );
}