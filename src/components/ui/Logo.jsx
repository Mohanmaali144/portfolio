import React from 'react';

// Brand mark: a single continuous "monoline peaks" stroke (the MM motif).
// Uses `currentColor`, so its color + hover transitions are driven by the
// parent's text color — it adapts to light/dark automatically.
// Shares its geometry with /public/favicon.svg for a consistent brand mark.
export const Logo = ({ className = '' }) => (
    <svg
        viewBox="0 0 72 48"
        role="img"
        aria-label="MM"
        fill="none"
        className={className}
    >
        <path
            d="M6 42 L6 10 L21 30 L36 10 L51 30 L66 10 L66 42"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
        />
    </svg>
);
