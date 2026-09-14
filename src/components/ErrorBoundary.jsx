import React from 'react';
import { AlertTriangle, RefreshCw, Home, ShieldAlert } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("🔥 React Error Boundary caught an unhandled rendering error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-6 relative overflow-hidden font-sans">
          
          {/* Ambient Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[140px] pointer-events-none"></div>

          <div className="bg-slate-900/90 border border-rose-500/30 backdrop-blur-2xl rounded-3xl p-8 max-w-lg w-full shadow-2xl shadow-rose-950/40 text-center space-y-6 z-10">
            
            {/* Warning Icon Badge */}
            <div className="w-16 h-16 bg-rose-500/20 border border-rose-500/40 rounded-2xl flex items-center justify-center mx-auto text-rose-400">
              <AlertTriangle className="w-8 h-8 animate-bounce" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-black text-white tracking-tight">Something went wrong.</h1>
              <p className="text-xs text-slate-400 leading-relaxed">
                An unexpected rendering error occurred in NeedNear Ramnad application.
              </p>
            </div>

            {/* Error detail for technical debugging */}
            {this.state.error && (
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-left font-mono text-[11px] text-rose-300 max-h-40 overflow-y-auto space-y-1">
                <div className="flex items-center space-x-1.5 font-bold text-rose-400">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                  <span>Technical Diagnostics:</span>
                </div>
                <p className="break-words">{this.state.error.toString()}</p>
                {this.state.errorInfo && (
                  <pre className="text-[10px] text-slate-500 whitespace-pre-wrap mt-2">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={this.handleReset}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </button>

              <button
                onClick={this.handleGoHome}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs py-3 px-4 rounded-xl border border-slate-700 transition-all flex items-center justify-center space-x-2"
              >
                <Home className="w-4 h-4 text-slate-400" />
                <span>Go Home</span>
              </button>
            </div>

          </div>

          <footer className="mt-8 text-center text-xs text-slate-400 z-10">
            <p>© 2026 NeedNear Ramanathapuram Platform • Error Boundary Guard Active</p>
          </footer>

        </div>
      );
    }

    return this.props.children;
  }
}
