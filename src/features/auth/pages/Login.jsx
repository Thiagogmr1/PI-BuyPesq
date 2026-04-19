import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import autonImg from "../../../assets/Images/Auton.png";

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
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
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
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        setErrors({});
        setLoading(true);
        setTimeout(() => { setLoading(false); navigate("/select-profile"); }, 2000);
    }

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

            <div className="h-screen flex font-['Plus_Jakarta_Sans'] overflow-hidden">

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
                            Conecte-se aos melhores profissionais da sua região
                        </p>
                        <p className="text-white/70 text-sm">
                            Mais de 1.200 autônomos verificados esperando por você.
                        </p>
                    </div>

                </div>

                {/* ── PAINEL DIREITO ── */}
                <div className="w-full lg:w-[50%] flex items-center justify-center bg-[#F8FAFC] lg:bg-gray-50 px-8">

                    <div className="w-full max-w-[400px]">

                        {/* Logo mobile */}
                        <div className="flex lg:hidden justify-center mb-8">
                            <span className="text-2xl font-extrabold text-gray-900">
                                Buy<span className="text-[#1A56DB]">Pesq</span>
                            </span>
                        </div>

                        {/* resto do seu formulário (não mexi nele) */}
                        {/* Cabeçalho */}
                        <header className="mb-10 text-center">

                            <p className="mt-2 text-base text-gray-900">
                                Acesse sua conta no <span className="font-medium text-blue-600">BuyPesq</span>
                            </p>
                        </header>

                        {/* Campo e-mail */}
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-600 mb-1.5">
                                E-mail
                            </label>
                            <input
                                type="email"
                                placeholder="seu@email.com"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setErrors(p => ({ ...p, email: null })); }}
                                className={`w-full h-11 px-4 rounded-lg border text-sm outline-none transition-all bg-gray-50
                                    ${errors.email
                                        ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                                        : "border-gray-200 focus:border-[#1A56DB] focus:ring-2 focus:ring-[#1A56DB]/10 focus:bg-[#EFF6FF]"
                                    }`}
                            />
                            {errors.email && (
                                <p className="text-xs text-red-500 mt-1 font-medium">{errors.email}</p>
                            )}
                        </div>

                        {/* Campo senha */}
                        <div className="mb-2">
                            <label className="block text-sm font-semibold text-gray-600 mb-1.5">
                                Senha
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Mínimo 6 caracteres"
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setErrors(p => ({ ...p, password: null })); }}
                                    className={`w-full h-11 px-4 pr-11 rounded-lg border text-sm outline-none transition-all bg-gray-50
                                        ${errors.password
                                            ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                                            : "border-gray-200 focus:border-[#1A56DB] focus:ring-2 focus:ring-[#1A56DB]/10 focus:bg-[#EFF6FF]"
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(v => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <EyeIcon visible={showPassword} />
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-xs text-red-500 mt-1 font-medium">{errors.password}</p>
                            )}
                        </div>

                        {/* Esqueci a senha */}
                        <div className="flex justify-end mb-6">
                            <span className="text-xs text-[#1A56DB] font-semibold cursor-pointer hover:underline">
                                Esqueceu a senha?
                            </span>
                        </div>

                        {/* Botão principal */}
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full h-11 bg-[#1A56DB] hover:bg-[#1648c0] disabled:bg-[#3B82F6] text-white rounded-lg text-sm font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin" width="16" height="16" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                                        <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                                    </svg>
                                    Entrando...
                                </>
                            ) : "Entrar"}
                        </button>

                        {/* Divisor */}
                        <div className="flex items-center gap-3 my-5">
                            <div className="flex-1 h-px bg-gray-200" />
                            <span className="text-xs text-gray-400 font-medium">ou continue com</span>
                            <div className="flex-1 h-px bg-gray-200" />
                        </div>

                        {/* Google */}
                        <button className="w-full h-11 border border-gray-200 bg-white hover:bg-gray-50 rounded-lg flex items-center justify-center 
                        gap-2 text-sm font-semibold mb-8 text-gray-700 transition-all active:scale-[0.98]">
                            <GoogleIcon />
                            Entrar com Google
                        </button>

                        {/* Link cadastro */}
                        <p className="text-center text-sm text-gray-500 mt-6">
                            Não tem conta?{" "}
                            <Link to="/register" className="text-[#1A56DB] font-bold hover:underline">
                                Cadastre-se grátis
                            </Link>
                        </p>

                    </div>
                </div>

            </div>
        </>
    );
}