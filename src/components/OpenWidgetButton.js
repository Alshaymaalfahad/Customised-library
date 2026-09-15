"use client";

export default function OpenWidgetButton({ children, className }) {
  const open = () => window.dispatchEvent(new Event("maktaba:open-widget"));
  return (
    <button onClick={open} className={className}>
      {children}
    </button>
  );
}
