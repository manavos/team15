interface StatusMessageProps {
  type: "loading" | "error" | "empty";
  children: React.ReactNode;
}

export default function StatusMessage({ type, children }: StatusMessageProps) {
  return (
    <p role={type === "error" ? "alert" : "status"} className={`status-message status-message-${type}`}>
      {type === "loading" && <span className="spinner" aria-hidden="true" />}
      {children}
    </p>
  );
}
