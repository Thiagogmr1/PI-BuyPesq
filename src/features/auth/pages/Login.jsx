import { useState } from "react";

const colors = {
    primary700: "#1A56DB",
    primary500: "#3B82F6",
    primary200: "#BFDBFE",
    primary50: "#EFF6FF",
    success: "#16A34A",
    error: "#DC2626",
    gray900: "#111827",
    gray600: "#4B5563",
    gray400: "#9CA3AF",
    gray200: "#E5E7EB",
    gray100: "#F3F4F6",
    white: "#FFFFFF",
};

const styles = {
    screen: {
        minHeight: "100vh",
        backgroundColor: colors.white,
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        // maxWidth e margin removidos — a tela ocupa 100% da largura
    },
    header: {
        backgroundColor: colors.primary700,
        paddingTop: 56,
        paddingBottom: 40,
        paddingLeft: 24,
        paddingRight: 24,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
    },
    logo: {
        fontSize: 28,
        fontWeight: 800,
        color: colors.white,
        letterSpacing: "-0.5px",
        marginBottom: 6,
    },
    logoAccent: {
        color: colors.primary200,
    },
    tagline: {
        fontSize: 13,
        color: colors.primary200,
        fontWeight: 400,
    },
    body: {
        flex: 1,
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 36,
        paddingBottom: 32,
        display: "flex",
        flexDirection: "column",
        maxWidth: 480,      // só o formulário é limitado, não a tela
        width: "100%",
        margin: "0 auto",   // centraliza o formulário no desktop
        boxSizing: "border-box",
    },
    title: {
        fontSize: 22,
        fontWeight: 700,
        color: colors.gray900,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: colors.gray600,
        marginBottom: 32,
        fontWeight: 400,
    },
    fieldGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 13,
        fontWeight: 600,
        color: colors.gray600,
        marginBottom: 6,
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
    inputIcon: {
        position: "absolute",
        right: 14,
        color: colors.gray400,
        cursor: "pointer",
        fontSize: 18,
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
    forgotPassword: {
        textAlign: "right",
        marginTop: -8,
        marginBottom: 24,
    },
    forgotLink: {
        fontSize: 13,
        color: colors.primary700,
        fontWeight: 600,
        textDecoration: "none",
        cursor: "pointer",
    },
    btnPrimary: (loading) => ({
        width: "100%",
        height: 50,
        backgroundColor: loading ? colors.primary500 : colors.primary700,
        color: colors.white,
        border: "none",
        borderRadius: 8,
        fontSize: 16,
        fontWeight: 700,
        cursor: loading ? "not-allowed" : "pointer",
        transition: "background-color 0.2s, transform 0.1s",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        letterSpacing: "0.2px",
    }),
    divider: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginTop: 24,
        marginBottom: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: colors.gray200,
    },
    dividerText: {
        fontSize: 12,
        color: colors.gray400,
        fontWeight: 500,
        whiteSpace: "nowrap",
    },
    socialRow: {
        display: "flex",
        gap: 12,
        marginBottom: 32,
    },
    btnSocial: {
        flex: 1,
        height: 48,
        borderRadius: 8,
        border: `1.5px solid ${colors.gray200}`,
        backgroundColor: colors.white,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        fontSize: 14,
        fontWeight: 600,
        color: colors.gray900,
        cursor: "pointer",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
    },
    registerRow: {
        textAlign: "center",
        marginTop: "auto",
    },
    registerText: {
        fontSize: 14,
        color: colors.gray600,
    },
    registerLink: {
        color: colors.primary700,
        fontWeight: 700,
        cursor: "pointer",
        textDecoration: "none",
        marginLeft: 4,
    },
};

function EyeIcon({ visible }) {
    return visible ? (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    ) : (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
            <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
            <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
    );
}

function GoogleIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
    );
}

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [btnScale, setBtnScale] = useState(1);

    function validate() {
        const errs = {};
        if (!email) errs.email = "Informe seu e-mail.";
        else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "E-mail inválido.";
        if (!password) errs.password = "Informe sua senha.";
        else if (password.length < 6) errs.password = "Mínimo de 6 caracteres.";
        return errs;
    }

    function handleSubmit() {
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        setErrors({});
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
    }

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
                rel="stylesheet"
            />
            <div style={styles.screen}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.logo}>
                        Buy<span style={styles.logoAccent}>Pesq</span>
                    </div>
                    <div style={styles.tagline}>Conectando você aos melhores profissionais</div>
                </div>

                {/* Body — formulário centralizado com maxWidth */}
                <div style={styles.body}>
                    <div style={styles.title}>Bem-vindo de volta 👋</div>
                    <div style={styles.subtitle}>Faça login para continuar</div>

                    {/* Campo e-mail */}
                    <div style={styles.fieldGroup}>
                        <label style={styles.label}>E-mail</label>
                        <div style={styles.inputWrapper}>
                            <input
                                type="email"
                                placeholder="seu@email.com"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: null })); }}
                                onFocus={() => setEmailFocused(true)}
                                onBlur={() => setEmailFocused(false)}
                                style={styles.input(emailFocused, !!errors.email)}
                            />
                            <span style={styles.inputIcon}>
                                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                            </span>
                        </div>
                        {errors.email && <div style={styles.errorMsg}>{errors.email}</div>}
                    </div>

                    {/* Campo senha */}
                    <div style={styles.fieldGroup}>
                        <label style={styles.label}>Senha</label>
                        <div style={styles.inputWrapper}>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Mínimo 6 caracteres"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: null })); }}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
                                style={styles.input(passwordFocused, !!errors.password)}
                            />
                            <span style={styles.inputIcon} onClick={() => setShowPassword((v) => !v)}>
                                <EyeIcon visible={showPassword} />
                            </span>
                        </div>
                        {errors.password && <div style={styles.errorMsg}>{errors.password}</div>}
                    </div>

                    {/* Esqueci a senha */}
                    <div style={styles.forgotPassword}>
                        <span style={styles.forgotLink}>Esqueci minha senha</span>
                    </div>

                    {/* Botão entrar */}
                    <button
                        style={{ ...styles.btnPrimary(loading), transform: `scale(${btnScale})` }}
                        onClick={handleSubmit}
                        onMouseDown={() => setBtnScale(0.97)}
                        onMouseUp={() => setBtnScale(1)}
                        onMouseLeave={() => setBtnScale(1)}
                        disabled={loading}
                    >
                        {loading ? "Entrando..." : "Acessar"}
                    </button>

                    {/* Divisor */}
                    <div style={styles.divider}>
                        <div style={styles.dividerLine} />
                        <span style={styles.dividerText}>ou continue com</span>
                        <div style={styles.dividerLine} />
                    </div>

                    {/* Social */}
                    <div style={styles.socialRow}>
                        <button style={styles.btnSocial}>
                            <GoogleIcon />
                            Google
                        </button>
                        <button style={styles.btnSocial}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="#111827">
                                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.32.07 2.23.72 3 .77 1.14-.19 2.23-.86 3.44-.77 1.47.12 2.58.7 3.3 1.79-3.04 1.87-2.32 5.66.47 6.73-.56 1.5-1.3 2.99-2.21 4.36zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                            </svg>
                            Apple
                        </button>
                    </div>

                    {/* Cadastro */}
                    <div style={styles.registerRow}>
                        <span style={styles.registerText}>
                            Não tem uma conta?
                            <span style={styles.registerLink}>Cadastre-se</span>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}