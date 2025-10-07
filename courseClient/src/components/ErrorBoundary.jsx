import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center bg-black justify-center p-4 sm:p-6 lg:p-8">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg p-6 sm:p-8 max-w-2xl w-full hover:bg-white/15 transition-all">
            <div className="text-center">
              {/* Error Icon */}
              <div className="mb-6 flex justify-center">
                <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-full p-4">
                  <svg
                    className="h-12 w-12 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </div>

              {/* Error Title */}
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Oops! Something went wrong
              </h1>

              {/* Error Message */}
              <p className="text-white/70 mb-6 text-sm sm:text-base">
                We're sorry, but something unexpected happened. The error has
                been logged and we'll look into it.
              </p>

              {/* Error Details (Development Only) */}
              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="mb-6 text-left bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 overflow-auto max-h-64">
                  <summary className="text-white/90 font-semibold cursor-pointer mb-2 hover:text-white transition-colors">
                    Error Details (Development Only)
                  </summary>
                  <div className="text-red-300 text-sm font-mono mt-3">
                    <p className="mb-2 text-red-400 font-semibold">
                      {this.state.error.toString()}
                    </p>
                    <pre className="text-xs overflow-auto text-white/60 bg-black/20 p-3 rounded border border-white/10">
                      {this.state.errorInfo?.componentStack}
                    </pre>
                  </div>
                </details>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button
                  onClick={this.handleReset}
                  className="px-6 py-3 bg-blue-600/80 hover:bg-blue-600 backdrop-blur-sm text-white font-semibold rounded-lg transition-all border border-blue-500/30 shadow-lg hover:shadow-blue-500/50"
                >
                  Go to Home
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/20 transition-all shadow-lg"
                >
                  Reload Page
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
