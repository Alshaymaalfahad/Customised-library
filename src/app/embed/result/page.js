import { redirect } from "next/navigation";
import { getProfile } from "@/lib/repo.js";
import { getReaderId } from "@/lib/reader.js";
import ResultCard from "@/components/ResultCard";

export default async function EmbedResultPage() {
  const readerId = await getReaderId();
  const profile = readerId ? getProfile(readerId) : null;
  if (!profile) redirect("/embed/quiz");

  return <ResultCard profile={profile} recsHref="/embed/recommendations" quizHref="/embed/quiz" />;
}
