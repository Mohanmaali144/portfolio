import React from 'react';

// Catches render/runtime errors in a subtree so one failing widget (e.g. the AI
// chat or the GitHub feed) doesn't white-screen the whole page. Renders an
// optional `fallback` (or nothing) instead of the crashed subtree.
export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // Keep a console trace for debugging; swap for a logging service if needed.
        console.error('ErrorBoundary caught an error:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback ?? null;
        }
        return this.props.children;
    }
}
