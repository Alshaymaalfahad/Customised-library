import EmbedTopBar from "@/components/EmbedTopBar";

export default function EmbedLayout({ children }) {
  return (
    <div className="min-h-screen bg-paper">
      <EmbedTopBar />
      {children}
    </div>
  );
}
