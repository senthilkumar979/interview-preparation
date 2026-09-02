import type { Topic } from "../types";
import type { QuizChoice, QuizItem, QuizPackage, QuizTrack } from "./types";

function clip(text: string, max = 160): string {
  const value = text.replace(/\s+/g, " ").trim();
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1).trimEnd()}…`;
}

function lead(text: string): string {
  const value = text.replace(/\s+/g, " ").trim();
  const parts = value.match(/[^.!?]+[.!?]+/g);
  if (!parts || parts.length === 0) return value.slice(0, 420);
  return parts.slice(0, 2).join(" ").trim();
}

function explain(...parts: string[]): string {
  const unique: string[] = [];
  for (const part of parts) {
    const value = lead(part);
    if (value && !unique.includes(value)) unique.push(value);
  }
  return unique.join(" ");
}

function section(topic: Topic, key: string): string {
  return topic.sections.find((entry) => entry.key === key)?.body ?? "";
}

function hashPick(seed: string, length: number): number {
  let hash = 0;
  for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) | 0;
  return length === 0 ? 0 : Math.abs(hash) % length;
}

function others(topic: Topic, pool: Topic[]): Topic[] {
  const rest = pool.filter((entry) => entry.slug !== topic.slug);
  if (rest.length >= 2) {
    const a = rest[hashPick(`${topic.slug}:a`, rest.length)]!;
    const b = rest[hashPick(`${topic.slug}:b`, rest.length)]!;
    if (a.slug !== b.slug) return [a, b];
    return [a, rest.find((entry) => entry.slug !== a.slug) ?? a];
  }
  return rest;
}

function mcq(
  id: string,
  prompt: string,
  correct: string,
  wrong: [string, string],
  seed: string,
  extra?: { code: string; language: QuizItem["language"] },
  detail?: string,
): QuizItem {
  const raw: QuizChoice[] = [
    { id: "a", label: clip(correct), isCorrect: true },
    { id: "b", label: clip(wrong[0] || "Unrelated API trivia"), isCorrect: false },
    { id: "c", label: clip(wrong[1] || "A styling-only concern"), isCorrect: false },
  ];
  const order = [
    [0, 1, 2],
    [0, 2, 1],
    [1, 0, 2],
    [1, 2, 0],
    [2, 0, 1],
    [2, 1, 0],
  ][hashPick(seed, 6)]!;
  const letters = ["a", "b", "c"] as const;
  return {
    id,
    kind: extra ? "output" : "mcq",
    prompt,
    code: extra?.code,
    language: extra?.language,
    choices: order.map((index, i) => ({
      id: letters[i]!,
      label: raw[index]!.label,
      isCorrect: raw[index]!.isCorrect,
    })),
    explanation: explain(correct, detail ?? ""),
  };
}

function tf(id: string, statement: string, isTrue: boolean, explanation: string): QuizItem {
  return {
    id,
    kind: "tf",
    prompt: `True or false: ${clip(statement, 200)}`,
    choices: [
      { id: "t", label: "True", isCorrect: isTrue },
      { id: "f", label: "False", isCorrect: !isTrue },
    ],
    explanation: explain(explanation),
  };
}

export function quizPackageFromTopic(topic: Topic, pool: Topic[], track: QuizTrack): QuizPackage {
  const pair = others(topic, pool);
  const altA = pair[0];
  const altB = pair[1] ?? pair[0];
  const beats = topic.interviewAnswer?.beats ?? [];
  const line = topic.interviewAnswer?.oneLiner ?? topic.summary;
  const beat0 = beats[0] ?? topic.summary;
  const beat1 = beats[1] ?? line;
  const beat2 = beats[2] ?? (section(topic, "concept") || topic.summary);
  const why = section(topic, "why-it-matters") || topic.summary;
  const practices = section(topic, "best-practices") || beat0;
  const mistakes = section(topic, "common-mistakes") || "Treating this topic as memorization instead of a mechanism.";
  const example = topic.codeExample;
  const lang = example?.language;
  const codeLang = lang === "html" || lang === "css" || lang === "javascript" || lang === "typescript" ? lang : undefined;

  const concept = section(topic, "concept") || line;
  const questions: QuizItem[] = [
    mcq(`${topic.slug}-core`, `Which statement best matches ${topic.title}?`, line, [altA?.interviewAnswer?.oneLiner ?? altA?.summary ?? "", altB?.interviewAnswer?.oneLiner ?? altB?.summary ?? ""], `${topic.slug}-core`, undefined, why),
    tf(`${topic.slug}-b0`, beat0, true, explain(beat0, concept)),
    tf(`${topic.slug}-b1`, beat1, true, explain(beat1, why)),
    tf(`${topic.slug}-false`, `${topic.title} is only a visual trick and never shows up in interviews.`, false, explain(`${topic.title} is a real interview topic.`, topic.summary, why)),
    mcq(`${topic.slug}-beat`, `Which interview beat belongs to ${topic.title}?`, beat2, [altA?.interviewAnswer?.beats?.[0] ?? altA?.summary ?? "", altB?.interviewAnswer?.beats?.[0] ?? altB?.summary ?? ""], `${topic.slug}-beat`, undefined, why),
    mcq(`${topic.slug}-sum`, `What does the ${topic.title} lesson cover?`, topic.summary, [altA?.summary ?? "", altB?.summary ?? ""], `${topic.slug}-sum`, undefined, why),
    mcq(`${topic.slug}-why`, `Why does ${topic.title} matter in interviews?`, why, [altA ? section(altA, "why-it-matters") || altA.summary : "", altB ? section(altB, "why-it-matters") || altB.summary : ""], `${topic.slug}-why`, undefined, concept),
    mcq(`${topic.slug}-miss`, `Which is a common mistake around ${topic.title}?`, mistakes, [practices, altA ? section(altA, "common-mistakes") || altA.summary : ""], `${topic.slug}-miss`, undefined, practices),
    example && codeLang
      ? mcq(
          `${topic.slug}-code`,
          "What does this snippet illustrate?",
          topic.title,
          [altA?.title ?? "Unrelated API", altB?.title ?? "Unrelated layout"],
          `${topic.slug}-code`,
          {
            code: example.code.trim().split("\n").slice(0, 14).join("\n"),
            language: codeLang,
          },
          explain(line, why),
        )
      : mcq(
          `${topic.slug}-code`,
          `Which practice fits ${topic.title}?`,
          practices,
          [mistakes, altA ? section(altA, "best-practices") || altA.summary : ""],
          `${topic.slug}-prac`,
          undefined,
          why,
        ),
    mcq(`${topic.slug}-prac`, `Which best-practice note fits ${topic.title}?`, practices, [altA ? section(altA, "best-practices") || altA.summary : "", altB ? section(altB, "best-practices") || altB.summary : ""], `${topic.slug}-prac2`, undefined, why),
  ];

  return {
    slug: `quiz-${topic.slug}`,
    title: topic.title,
    summary: `Ten questions from the ${topic.title} lesson.`,
    difficulty: topic.levels[0] ?? "junior",
    track,
    topics: [topic.slug],
    questions,
  };
}
