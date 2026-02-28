import React from 'react';

export const Button = ({ children, variant = "dark", className = "", onClick }) => {
    const variants = {
        dark: "bg-black text-white hover:bg-zinc-800",
        light: "bg-white text-black border border-zinc-200 hover:bg-zinc-50",
        ghost: "bg-transparent text-black hover:bg-black/5"
    };

    return (
        <button
            onClick={onClick}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
};
