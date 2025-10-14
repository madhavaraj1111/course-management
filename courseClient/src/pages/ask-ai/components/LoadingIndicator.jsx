// pages/ask-ai/components/LoadingIndicator.jsx
import { Loader2 } from "lucide-react";

const LoadingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-white/20 text-white border border-white/30 rounded-lg p-4">
        <Loader2 className="animate-spin" size={20} />
      </div>
    </div>
  );
};

export default LoadingIndicator;