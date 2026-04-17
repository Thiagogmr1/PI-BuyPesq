import { useState } from "react";

const colors = {
    primary700: "#1A56DB",
    primary500: "#3B82F6",
    primary200: "#BFDBFE",
    primary50: "#EFF6FF",
    success: "#16A34A",
    error: "#DC2626",
    gray900: "#111827",
    gray700: "#374151",
    gray600: "#4B5563",
    gray400: "#9CA3AF",
    gray200: "#E5E7EB",
    gray100: "#F3F4F6",
    white: "#FFFFFF",
};

const ESTADOS = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
    "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
    "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

// ── Estilos compartilhados ──────────────────────────────────────────
const s = {
    screen: {
        minHeight: "100vh",
        backgroundColor: colors.white,
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
    },
    header: {
        backgroundColor: colors.primary700,
        paddingTop: 48,
        paddingBottom: 32,
        paddingLeft: 24,
        paddingRight: 24,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
    },
    logo: {
        fontSize: 26,
        fontWeight: 800,
        color: colors.white,
        letterSpacing: "-0.5px",
        marginBottom: 16,
    },
    logoAccent: { color: colors.primary200 },
    // Barra de progresso
    progressRow: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        width: "100%",
        maxWidth: 260,
    },
    progressStep: (active, done) => ({
        flex: 1,
        height: 4,
        borderRadius: 99,
        backgroundColor: active || done ? colors.white : "rgba(255,255,255,0.3)",
        transition: "background-color 0.3s",
    }),
    progressLabel: {
        fontSize: 11,
        color: colors.primary200,
        marginTop: 8,
        textAlign: "center",
    },
    body: {
        flex: 1,
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 32,
        paddingBottom: 32,
        display: "flex",
        flexDirection: "column",
        maxWidth: 480,
        width: "100%",
        margin: "0 auto",
        boxSizing: "border-box",
    },
    stepTitle: {
        fontSize: 20,
        fontWeight: 700,
        color: colors.gray900,
        marginBottom: 4,
    },
    stepSubtitle: {
        fontSize: 13,
        color: colors.gray600,
        marginBottom: 24,
    },
    fieldGroup: { marginBottom: 14 },
    label: {
        fontSize: 13,
        fontWeight: 600,
        color: colors.gray600,
        marginBottom: 5,
        display: "block",
    },
    inputWrapper: {
        position: "relative",
        display: "flex",
        alignItems: "center",
    },
    input: (focused, hasError) => ({
        width: "100%",
        height: 48,
        borderRadius: 8,
        border: `1.5px solid ${hasError ? colors.error : focused ? colors.primary700 : colors.gray200}`,
        backgroundColor: focused ? colors.primary50 : colors.gray100,
        paddingLeft: 16,
        paddingRight: 44,
        fontSize: 15,
        color: colors.gray900,
        outline: "none",
        boxSizing: "border-box",
        transition: "border-color 0.2s, background-color 0.2s",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
    }),
    select: (focused, hasError) => ({
        width: "100%",
        height: 48,
        borderRadius: 8,
        border: `1.5px solid ${hasError ? colors.error : focused ? colors.primary700 : colors.gray200}`,
        backgroundColor: focused ? colors.primary50 : colors.gray100,
        paddingLeft: 16,
        paddingRight: 16,
        fontSize: 15,
        color: colors.gray900,
        outline: "none",
        boxSizing: "border-box",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        appearance: "none",
        cursor: "pointer",
    }),
    inputIcon: {
        position: "absolute",
        right: 14,
        color: colors.gray400,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        userSelect: "none",
    },
    errorMsg: {
        fontSize: 12,
        color: colors.error,
        marginTop: 4,
        fontWeight: 500,
    },
    btnPrimary: (disabled) => ({
        width: "100%",
        height: 50,
        backgroundColor: disabled ? colors.primary500 : colors.primary700,
        color: colors.white,
        border: "none",
        borderRadius: 8,
        fontSize: 16,
        fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        marginTop: 8,
        transition: "background-color 0.2s, transform 0.1s",
    }),
    btnOutline: {
        width: "100%",
        height: 50,
        backgroundColor: "transparent",
        color: colors.primary700,
        border: `1.5px solid ${colors.primary700}`,
        borderRadius: 8,
        fontSize: 15,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        marginTop: 10,
    },
    // Termos
    termsBox: {
        flex: 1,
        backgroundColor: colors.gray100,
        borderRadius: 12,
        padding: 16,
        overflowY: "auto",
        maxHeight: 220,
        fontSize: 13,
        color: colors.gray700,
        lineHeight: 1.6,
        marginBottom: 20,
    },
    checkRow: {
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        marginBottom: 16,
        cursor: "pointer",
    },
    checkbox: (checked) => ({
        width: 20,
        height: 20,
        borderRadius: 4,
        border: `2px solid ${checked ? colors.primary700 : colors.gray400}`,
        backgroundColor: checked ? colors.primary700 : colors.white,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        marginTop: 1,
        transition: "all 0.15s",
        cursor: "pointer",
    }),
    checkLabel: {
        fontSize: 13,
        color: colors.gray700,
        lineHeight: 1.5,
    },
    successScreen: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
        textAlign: "center",
    },
    successIcon: {
        width: 80,
        height: 80,
        borderRadius: "50%",
        backgroundColor: "#DCFCE7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 24,
    },
    successTitle: {
        fontSize: 22,
        fontWeight: 700,
        color: colors.gray900,
        marginBottom: 8,
    },
    successSubtitle: {
        fontSize: 14,
        color: colors.gray600,
        marginBottom: 40,
        lineHeight: 1.6,
    },
    loginRow: {
        textAlign: "center",
        marginTop: "auto",
        paddingTop: 16,
    },
    loginText: { fontSize: 14, color: colors.gray600 },
    loginLink: {
        color: colors.primary700,
        fontWeight: 700,
        cursor: "pointer",
        marginLeft: 4,
    },
};

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

function BackIcon() {
    return (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6" />
        </svg>
    );
}

// ── Componente de campo reutilizável ────────────────────────────────
function Field({ label, error, children }) {
    return (
        <div style={s.fieldGroup}>
            <label style={s.label}>{label}</label>
            {children}
            {error && <div style={s.errorMsg}>{error}</div>}
        </div>
    );
}

// ── Etapa 1 — Dados básicos ─────────────────────────────────────────
function StepDados({ data, onChange, onNext }) {
    const [focused, setFocused] = useState({});
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

    const foc = (name) => ({ onFocus: () => setFocused(p => ({ ...p, [name]: true })), onBlur: () => setFocused(p => ({ ...p, [name]: false })) });
    const clr = (name) => (e) => { onChange(name, e.target.value); setErrors(p => ({ ...p, [name]: null })); };

    return (
        <div style={s.body}>
            <div style={s.stepTitle}>Crie sua conta</div>
            <div style={s.stepSubtitle}>Preencha seus dados para começar</div>

            <Field label="Nome de usuário" error={errors.nome}>
                <div style={s.inputWrapper}>
                    <input style={s.input(focused.nome, !!errors.nome)} placeholder="seu_usuario" value={data.nome}
                        onChange={clr("nome")} {...foc("nome")} />
                    <span style={s.inputIcon}>
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                        </svg>
                    </span>
                </div>
            </Field>

            <Field label="E-mail" error={errors.email}>
                <div style={s.inputWrapper}>
                    <input style={s.input(focused.email, !!errors.email)} type="email" placeholder="seu@email.com"
                        value={data.email} onChange={clr("email")} {...foc("email")} />
                    <span style={s.inputIcon}>
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                    </span>
                </div>
            </Field>

            <Field label="Telefone" error={errors.telefone}>
                <div style={s.inputWrapper}>
                    <input style={s.input(focused.telefone, !!errors.telefone)} placeholder="(62) 99999-9999"
                        value={data.telefone}
                        onChange={(e) => { onChange("telefone", maskTelefone(e.target.value)); setErrors(p => ({ ...p, telefone: null })); }}
                        {...foc("telefone")} />
                    <span style={s.inputIcon}>
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                        </svg>
                    </span>
                </div>
            </Field>

            <Field label="Senha" error={errors.senha}>
                <div style={s.inputWrapper}>
                    <input style={s.input(focused.senha, !!errors.senha)} type={showPass ? "text" : "password"}
                        placeholder="Mínimo 6 caracteres" value={data.senha} onChange={clr("senha")} {...foc("senha")} />
                    <span style={s.inputIcon} onClick={() => setShowPass(v => !v)}>
                        <EyeIcon visible={showPass} />
                    </span>
                </div>
            </Field>

            <Field label="Confirmar senha" error={errors.confirmar}>
                <div style={s.inputWrapper}>
                    <input style={s.input(focused.confirmar, !!errors.confirmar)} type={showConfirm ? "text" : "password"}
                        placeholder="Repita a senha" value={data.confirmar} onChange={clr("confirmar")} {...foc("confirmar")} />
                    <span style={s.inputIcon} onClick={() => setShowConfirm(v => !v)}>
                        <EyeIcon visible={showConfirm} />
                    </span>
                </div>
            </Field>

            <button style={s.btnPrimary(false)} onClick={handleNext}>Continuar</button>

            <div style={s.loginRow}>
                <span style={s.loginText}>
                    Já tem uma conta?
                    <span style={s.loginLink}>Entrar</span>
                </span>
            </div>
        </div>
    );
}

// ── Etapa 2 — Localização ───────────────────────────────────────────
function StepLocalizacao({ data, onChange, onNext, onBack }) {
    const [focused, setFocused] = useState({});
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

    const foc = (name) => ({ onFocus: () => setFocused(p => ({ ...p, [name]: true })), onBlur: () => setFocused(p => ({ ...p, [name]: false })) });
    const clr = (name) => (e) => { onChange(name, e.target.value); setErrors(p => ({ ...p, [name]: null })); };

    return (
        <div style={s.body}>
            <div style={s.stepTitle}>Onde você está?</div>
            <div style={s.stepSubtitle}>Usamos sua localização para mostrar profissionais da sua região</div>

            <Field label="Estado" error={errors.estado}>
                <div style={s.inputWrapper}>
                    <select style={s.select(focused.estado, !!errors.estado)} value={data.estado}
                        onChange={clr("estado")} {...foc("estado")}>
                        <option value="">Selecione o estado</option>
                        {ESTADOS.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                    </select>
                    <span style={{ ...s.inputIcon, pointerEvents: "none" }}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </span>
                </div>
            </Field>

            <Field label="Município" error={errors.municipio}>
                <div style={s.inputWrapper}>
                    <input style={s.input(focused.municipio, !!errors.municipio)} placeholder="Nome da sua cidade"
                        value={data.municipio} onChange={clr("municipio")} {...foc("municipio")} />
                    <span style={s.inputIcon}>
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                        </svg>
                    </span>
                </div>
            </Field>

            <button style={s.btnPrimary(false)} onClick={handleNext}>Continuar</button>
            <button style={s.btnOutline} onClick={onBack}>Voltar</button>
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

    return (
        <div style={s.body}>
            <div style={s.stepTitle}>Termos e Privacidade</div>
            <div style={s.stepSubtitle}>Leia e aceite para criar sua conta</div>

            <div style={s.termsBox}>
                <strong>Termos de Uso</strong>
                <p style={{ marginTop: 8 }}>
                    Ao utilizar o BuyPesq, você concorda em usar a plataforma de forma responsável e de boa-fé.
                    É proibido cadastrar informações falsas, usar o sistema para fins ilegais ou prejudicar outros usuários.
                    O BuyPesq atua apenas como intermediador de contatos entre clientes e profissionais autônomos,
                    não sendo responsável pela execução ou qualidade dos serviços contratados.
                </p>
                <p style={{ marginTop: 12 }}>
                    <strong>Política de Privacidade</strong>
                </p>
                <p style={{ marginTop: 8 }}>
                    Seus dados pessoais (nome, e-mail, telefone e localização) são coletados exclusivamente para
                    funcionamento da plataforma e não são vendidos a terceiros. Utilizamos cookies para melhorar
                    sua experiência. Você pode solicitar a exclusão dos seus dados a qualquer momento pelo suporte.
                    Ao continuar, você consente com o tratamento dos seus dados conforme a LGPD.
                </p>
            </div>

            <div style={s.checkRow} onClick={() => { setAceitouTermos(v => !v); setError(""); }}>
                <div style={s.checkbox(aceitouTermos)}>
                    {aceitouTermos && <CheckIcon />}
                </div>
                <span style={s.checkLabel}>
                    Li e aceito os <strong>Termos de Uso</strong> do BuyPesq
                </span>
            </div>

            <div style={s.checkRow} onClick={() => { setAceitouPriv(v => !v); setError(""); }}>
                <div style={s.checkbox(aceitouPriv)}>
                    {aceitouPriv && <CheckIcon />}
                </div>
                <span style={s.checkLabel}>
                    Li e aceito a <strong>Política de Privacidade</strong>
                </span>
            </div>

            {error && <div style={{ ...s.errorMsg, marginBottom: 8 }}>{error}</div>}

            <button style={s.btnPrimary(loading)} onClick={handleCriar} disabled={loading}>
                {loading ? "Criando conta..." : "Criar conta"}
            </button>
            <button style={s.btnOutline} onClick={onBack}>Voltar</button>
        </div>
    );
}

// ── Tela de sucesso ─────────────────────────────────────────────────
function StepSucesso() {
    return (
        <div style={s.successScreen}>
            <div style={s.successIcon}>
                <svg width="40" height="40" fill="none" stroke="#16A34A" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            </div>
            <div style={s.successTitle}>Conta criada com sucesso!</div>
            <div style={s.successSubtitle}>
                Bem-vindo ao BuyPesq. Agora você pode buscar profissionais ou cadastrar seus serviços.
            </div>
            <button style={s.btnPrimary(false)}>Continuar para o app</button>
        </div>
    );
}

// ── Componente principal ────────────────────────────────────────────
const STEP_LABELS = ["Dados", "Localização", "Termos"];

export default function Register() {
    const [step, setStep] = useState(1); // 1, 2, 3, 4 (sucesso)
    const [loading, setLoading] = useState(false);

    const [dados, setDados] = useState({ nome: "", email: "", telefone: "", senha: "", confirmar: "" });
    const [localizacao, setLocalizacao] = useState({ estado: "", municipio: "" });

    function updateDados(key, val) { setDados(p => ({ ...p, [key]: val })); }
    function updateLoc(key, val) { setLocalizacao(p => ({ ...p, [key]: val })); }

    function handleFinish() {
        setLoading(true);
        setTimeout(() => { setLoading(false); setStep(4); }, 2000);
    }

    const showProgress = step <= 3;

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            <div style={s.screen}>
                {/* Header */}
                <div style={s.header}>
                    <div style={s.logo}>Buy<span style={s.logoAccent}>Pesq</span></div>

                    {showProgress && (
                        <>
                            <div style={s.progressRow}>
                                {[1, 2, 3].map(n => (
                                    <div key={n} style={s.progressStep(n === step, n < step)} />
                                ))}
                            </div>
                            <div style={s.progressLabel}>
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
                    <StepLocalizacao data={localizacao} onChange={updateLoc} onNext={() => setStep(3)} onBack={() => setStep(1)} />
                )}
                {step === 3 && (
                    <StepTermos onNext={handleFinish} onBack={() => setStep(2)} loading={loading} />
                )}
                {step === 4 && <StepSucesso />}
            </div>
        </>
    );
}