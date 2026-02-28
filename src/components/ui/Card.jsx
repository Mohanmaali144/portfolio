import React from 'react';

const Card = ({ children, className = "" }) => (
    <div className={`bg-[#FFFFFF] rounded-[3rem] p-4 md:p-6 shadow-sm border border-zinc-50 ${className}`}>
        {children}
    </div>
);

const HeroCard = ({ children, className = "" }) => (
    <div className={`bg-[#EBEBEB] rounded-b-[4rem] md:rounded-b-[10rem] p-4 md:p-10 ${className}`}>
        {children}
    </div>
);

const FooterCard = ({ children, className = "" }) => (
    <div className={`bg-[#EBEBEB] rounded-t-[4rem] md:rounded-t-[10rem] p-4 md:p-10 ${className}`}>
        {children}
    </div>
);

export { Card, HeroCard, FooterCard }