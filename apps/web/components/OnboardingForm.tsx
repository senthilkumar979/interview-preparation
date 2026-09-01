"use client";

import { useState, type ReactNode } from "react";
import { experienceLevels, roles, technologies, type ExperienceLevel } from "@prepquest/content";
import { saveOnboarding } from "@/app/actions/onboarding";
import { OnboardingChoice } from "@/components/OnboardingChoice";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const STEP_COUNT = 3;

export const OnboardingForm = () => {
  const [step, setStep] = useState(0);
  const [roleSlug, setRoleSlug] = useState("");
  const [technologySlug, setTechnologySlug] = useState("");
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel | "">("");

  const techOptions = technologies.filter((tech) => tech.roleSlug === roleSlug);
  const canContinue =
    (step === 0 && Boolean(roleSlug)) ||
    (step === 1 && Boolean(technologySlug)) ||
    (step === 2 && Boolean(experienceLevel));

  const goNext = () => {
    if (step < STEP_COUNT - 1 && canContinue) setStep((current) => current + 1);
  };

  return (
    <form action={saveOnboarding} className="mx-auto grid w-full max-w-lg gap-8">
      <input type="hidden" name="roleSlug" value={roleSlug} />
      <input type="hidden" name="technologySlug" value={technologySlug} />
      <input type="hidden" name="experienceLevel" value={experienceLevel} />

      <div className="grid gap-3">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Question {step + 1} of {STEP_COUNT}
          </span>
          <span>{Math.round(((step + 1) / STEP_COUNT) * 100)}%</span>
        </div>
        <Progress value={((step + 1) / STEP_COUNT) * 100} />
      </div>

      {step === 0 ? (
        <Question title="What role are you preparing for?">
          {roles.map((role) => (
            <OnboardingChoice
              key={role.slug}
              selected={roleSlug === role.slug}
              onSelect={() => {
                setRoleSlug(role.slug);
                setTechnologySlug("");
              }}
              title={role.name}
              description={role.description}
            />
          ))}
        </Question>
      ) : null}

      {step === 1 ? (
        <Question title="Which UI framework are you interviewing for?">
          {techOptions.map((tech) => (
            <OnboardingChoice
              key={tech.slug}
              selected={technologySlug === tech.slug}
              onSelect={() => setTechnologySlug(tech.slug)}
              title={tech.name}
              description={tech.description}
            />
          ))}
        </Question>
      ) : null}

      {step === 2 ? (
        <Question title="What is your current experience level?">
          {experienceLevels.map((level) => (
            <OnboardingChoice
              key={level.slug}
              selected={experienceLevel === level.slug}
              onSelect={() => setExperienceLevel(level.slug)}
              title={level.name}
              description={level.description}
            />
          ))}
        </Question>
      ) : null}

      <div className="flex items-center justify-between gap-3">
        <Button type="button" variant="ghost" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
          Back
        </Button>
        {step < STEP_COUNT - 1 ? (
          <Button type="button" size="lg" disabled={!canContinue} onClick={goNext}>
            Continue
          </Button>
        ) : (
          <Button type="submit" size="lg" disabled={!canContinue}>
            Generate my roadmap
          </Button>
        )}
      </div>
    </form>
  );
};

const Question = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="grid gap-4">
    <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
    <div className="grid gap-3">{children}</div>
  </div>
);
