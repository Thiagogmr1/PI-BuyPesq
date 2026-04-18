import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import autonImg from "../../../assets/Images/Auton.png";

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

// ── Input base (igual login) ───────────────────────────────────────
function Input({ error, ...props }) {
    return (
        <input
            {...props}
            className={`w-full h-11 px-4 rounded-lg border text-sm outline-none transition-all bg-gray-50
                ${error
                    ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-gray-200 focus:border-[#1A56DB] focus:ring-2 focus:ring-[#1A56DB]/10 focus:bg-[#EFF6FF]"
                }`}
        />
    );
}

// ── Password ───────────────────────────────────────────────────────
function PasswordInput({ value, onChange, visible, onToggle, error, placeholder }) {
    return (
        <div className="relative">
            <input
                type={visible ? "text" : "password"}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full h-11 px-4 pr-11 rounded-lg border text-sm outline-none transition-all bg-gray-50
                    ${error
                        ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-gray-200 focus:border-[#1A56DB] focus:ring-2 focus:ring-[#1A56DB]/10 focus:bg-[#EFF6FF]"
                    }`}
            />
            <button
                type="button"
                onClick={onToggle}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
                <EyeIcon visible={visible} />
            </button>
        </div>
    );
}

// ── Página ─────────────────────────────────────────────────────────
export default function RegisterForm() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        nome: "",
        email: "",
        telefone: "",
        senha: "",
        confirmar: ""
    });

    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    function onChange(key, value) {
        setData((p) => ({ ...p, [key]: value }));
    }

    function validate() {
        const e = {};
        if (!data.nome) e.nome = "Informe seu nome.";
        if (!data.email) e.email = "Informe seu e-mail.";
        if (!data.senha) e.senha = "Informe sua senha.";
        if (data.senha !== data.confirmar) e.confirmar = "Senhas não conferem.";
        return e;
    }

    function handleSubmit() {
        const e = validate();
        if (Object.keys(e).length) return setErrors(e);

        setErrors({});
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            navigate("/select-profile");
        }, 1500);
    }

    return (
        <div className="w-full max-w-[400px]">

            <div className="mb-6 text-center">
                <h1 className="text-xl font-bold text-gray-900">
                    Criar conta
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                    Preencha seus dados para começar
                </p>
            </div>

            <div className="mb-3">
                <Input
                    placeholder="Nome de usuário"
                    value={data.nome}
                    onChange={(e) => onChange("nome", e.target.value)}
                    error={errors.nome}
                />
            </div>

            <div className="mb-3">
                <Input
                    placeholder="E-mail"
                    value={data.email}
                    onChange={(e) => onChange("email", e.target.value)}
                    error={errors.email}
                />
            </div>

            <div className="mb-3">
                <Input
                    placeholder="Telefone"
                    value={data.telefone}
                    onChange={(e) => onChange("telefone", e.target.value)}
                />
            </div>

            <div className="mb-3">
                <PasswordInput
                    value={data.senha}
                    onChange={(e) => onChange("senha", e.target.value)}
                    visible={showPass}
                    onToggle={() => setShowPass(v => !v)}
                    placeholder="Senha"
                    error={errors.senha}
                />
            </div>

            <div className="mb-5">
                <PasswordInput
                    value={data.confirmar}
                    onChange={(e) => onChange("confirmar", e.target.value)}
                    visible={showConfirm}
                    onToggle={() => setShowConfirm(v => !v)}
                    placeholder="Confirmar senha"
                    error={errors.confirmar}
                />
            </div>

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full h-11 bg-[#1A56DB] hover:bg-[#1648c0] text-white rounded-lg text-sm font-bold transition"
            >
                {loading ? "Criando..." : "Criar conta"}
            </button>

            <p className="text-center text-sm text-gray-500 mt-6">
                Já tem conta?{" "}
                <Link to="/login" className="text-[#1A56DB] font-bold">
                    Entrar
                </Link>
            </p>
        </div>
    );
}