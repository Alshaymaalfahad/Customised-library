import QuizFlow from "@/components/QuizFlow";
import { EMBED_TOPBAR_HEIGHT } from "@/components/EmbedTopBar";

export default function EmbedQuizPage() {
  return <QuizFlow resultHref="/embed/result" offsetPx={EMBED_TOPBAR_HEIGHT} />;
}
