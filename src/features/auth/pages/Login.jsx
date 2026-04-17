import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

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

            <div className="min-h-screen flex flex-col bg-white font-['Plus_Jakarta_Sans']">

                {/* Header */}
                <div className="bg-[#1A56DB] pt-[56px] pb-[40px] px-[24px] flex flex-col items-center rounded-b-[32px]">
                    <div className="text-[28px] font-extrabold text-white tracking-[-0.5px] mb-[6px]">
                        Buy<span className="text-[#BFDBFE]">Pesq</span>
                    </div>
                    <div className="text-[13px] text-[#BFDBFE]">
                        Conectando você aos melhores profissionais
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 px-[24px] pt-[36px] pb-[32px] flex flex-col max-w-[480px] w-full mx-auto">

                    <div className="text-[22px] font-bold text-[#111827] mb-[4px]">
                        Bem-vindo de volta 👋
                    </div>

                    <div className="text-[14px] text-[#4B5563] mb-[32px]">
                        Faça login para continuar
                    </div>

                    {/* Email */}
                    <div className="mb-[16px]">
                        <label className="text-[13px] font-semibold text-[#4B5563] mb-[6px] block">
                            E-mail
                        </label>

                        <div className="relative flex items-center">
                            <input
                                type="email"
                                placeholder="seu@email.com"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setErrors((p) => ({ ...p, email: null }));
                                }}
                                onFocus={() => setEmailFocused(true)}
                                onBlur={() => setEmailFocused(false)}
                                className={`
                                    w-full h-[48px] rounded-[8px] border-[1.5px]
                                    px-[16px] pr-[44px] text-[15px] outline-none transition
                                    ${errors.email ? "border-[#DC2626]" : emailFocused ? "border-[#1A56DB]" : "border-[#E5E7EB]"}
                                    ${emailFocused ? "bg-[#EFF6FF]" : "bg-[#F3F4F6]"}
                                `}
                            />

                            <span className="absolute right-[14px] text-[#9CA3AF] flex items-center">
                                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                            </span>
                        </div>

                        {errors.email && (
                            <div className="text-[12px] text-[#DC2626] mt-[4px] font-medium">
                                {errors.email}
                            </div>
                        )}
                    </div>

                    {/* Password */}
                    <div className="mb-[16px]">
                        <label className="text-[13px] font-semibold text-[#4B5563] mb-[6px] block">
                            Senha
                        </label>

                        <div className="relative flex items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Mínimo 6 caracteres"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setErrors((p) => ({ ...p, password: null }));
                                }}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
                                className={`
                                    w-full h-[48px] rounded-[8px] border-[1.5px]
                                    px-[16px] pr-[44px] text-[15px] outline-none transition
                                    ${errors.password ? "border-[#DC2626]" : passwordFocused ? "border-[#1A56DB]" : "border-[#E5E7EB]"}
                                    ${passwordFocused ? "bg-[#EFF6FF]" : "bg-[#F3F4F6]"}
                                `}
                            />

                            <span
                                className="absolute right-[14px] text-[#9CA3AF] cursor-pointer flex items-center"
                                onClick={() => setShowPassword((v) => !v)}
                            >
                                <EyeIcon visible={showPassword} />
                            </span>
                        </div>

                        {errors.password && (
                            <div className="text-[12px] text-[#DC2626] mt-[4px] font-medium">
                                {errors.password}
                            </div>
                        )}
                    </div>

                    {/* Forgot */}
                    <div className="text-right mt-[-8px] mb-[24px]">
                        <span className="text-[13px] text-[#1A56DB] font-semibold cursor-pointer">
                            Esqueci minha senha
                        </span>
                    </div>

                    {/* Button */}
                    <button
                        className={`
                            w-full h-[50px] rounded-[8px]
                            text-[16px] font-bold text-white transition
                            ${loading ? "bg-[#3B82F6] cursor-not-allowed" : "bg-[#1A56DB]"}
                        `}
                        style={{ transform: `scale(${btnScale})` }}
                        onClick={handleSubmit}
                        onMouseDown={() => setBtnScale(0.97)}
                        onMouseUp={() => setBtnScale(1)}
                        onMouseLeave={() => setBtnScale(1)}
                        disabled={loading}
                    >
                        {loading ? "Entrando..." : "Acessar"}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-[12px] my-[24px]">
                        <div className="flex-1 h-[1px] bg-[#E5E7EB]" />
                        <span className="text-[12px] text-[#9CA3AF] font-medium whitespace-nowrap">
                            ou continue com
                        </span>
                        <div className="flex-1 h-[1px] bg-[#E5E7EB]" />
                    </div>

                    {/* Social */}
                    <div className="flex gap-[12px] mb-[32px]">
                        <button className="flex-1 h-[48px] rounded-[8px] border-[1.5px] border-[#E5E7EB] bg-white flex items-center justify-center gap-[8px] text-[14px] font-semibold text-[#111827]">
                            <GoogleIcon />
                            Google
                        </button>

                        <button className="flex-1 h-[48px] rounded-[8px] border-[1.5px] border-[#E5E7EB] bg-white flex items-center justify-center gap-[8px] text-[14px] font-semibold text-[#111827]">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="#111827">
                                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.32.07 2.23.72 3 .77 1.14-.19 2.23-.86 3.44-.77 
                                1.47.12 2.58.7 3.3 1.79-3.04 1.87-2.32 5.66.47 6.73-.56 1.5-1.3 2.99-2.21 4.36zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                            </svg>
                            Apple
                        </button>
                    </div>

                    {/* Register */}
                    <div className="text-center mt-auto">
                        <span className="text-[14px] text-[#4B5563]">
                            Não tem uma conta?

                            <Link
                                to="/register"
                                className="text-[#1A56DB] font-bold ml-[4px] cursor-pointer"
                            >
                                Cadastre-se
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}