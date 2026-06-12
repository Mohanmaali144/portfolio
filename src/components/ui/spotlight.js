// Shared pointer-tracking handler for the `.spotlight-card` effect.
// Writes the cursor position (relative to the card) into CSS vars that
// the `.spotlight-card::before` radial gradient reads.
export const onSpotlightMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
};
