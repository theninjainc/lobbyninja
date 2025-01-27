import React from "react";

const Order = ({ activeFilter, currentFilter, leftFilter}) => {
    // Verifica se o filtro atual (currentFilter) é o ativo
    console.log(leftFilter)
    const isActive = currentFilter.includes(activeFilter);
    const isLeftActive = leftFilter && isActive; // Se o filtro da esquerda está ativo
    const isRightActive = !leftFilter && isActive; // Se o filtro da direita está ativo

    return (
        <svg
            width="13"
            height="14"
            viewBox="0 0 13 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >

            {/* Linhas esquerda */}
            <path
                d="M3.5 13L1.25 10.75M3.5 13L5.75 10.75M3.5 13V2.5M3.5 5.5L1.25"
                stroke={isRightActive ? "url(#gradient)" : "white"} // Se o filtro da direita estiver ativo, aplica o gradiente
                strokeOpacity={isRightActive ? "1" : "0.41"} // Se o filtro da direita estiver ativo, opacidade 1
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Linha da direita */}
            <path
                d="M8.5 1L7.25 3.25M9.5 1L11.75 3.25M9.5 1V9M9.5 8.5L7.25"
                stroke={isLeftActive ? "url(#gradient)" : "white"} // Se o filtro da esquerda estiver ativo, aplica o gradiente
                strokeOpacity={isLeftActive ? "1" : "0.41"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Gradiente radial */}
            <defs>
                <radialGradient
                    id="gradient"
                    cx="0.5"
                    cy="0.5"
                    r="0.5"
                    fx="0.5"
                    fy="0.3"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="47%" stopColor="#FA6E49" />
                </radialGradient>
            </defs>
        </svg>
    );
};

export default Order;
