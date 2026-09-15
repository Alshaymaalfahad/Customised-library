import { redirect } from "next/navigation";
import { getProfile } from "@/lib/repo.js";
import { getReaderId } from "@/lib/reader.js";
import ResultCard from "@/components/ResultCard";

export default async function ResultPage() {
  const readerId = await getReaderId();
  const profile = readerId ? getProfile(readerId) : null;
  if (!profile) redirect("/quiz");

  return <ResultCard profile={profile} recsHref="/recommendations" quizHref="/quiz" />;
}
