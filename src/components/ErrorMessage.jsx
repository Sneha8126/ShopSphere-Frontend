import { AlertTriangle, RefreshCw } from "lucide-react";

// Consistent inline error display used across pages for API/network failures.
const ErrorMessage = ({ message = "Something went wrong.", onRetry }) => (
  <div className="error-message">
    <AlertTriangle size={18} />
    <span>{message}</span>
    {onRetry && (
      <button className="btn btn-outline btn-sm" onClick={onRetry}>
        <RefreshCw size={14} /> Retry
      </button>
    )}
  </div>
);

export default ErrorMessage;
