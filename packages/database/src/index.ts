export interface ProfileRow {
  id: string;
  display_name: string | null;
  role_slug: string | null;
  technology_slug: string | null;
  experience_level: string | null;
  created_at: string;
  updated_at: string;
}

export interface TopicProgressRow {
  id: string;
  user_id: string;
  topic_slug: string;
  status: "not_started" | "in_progress" | "completed";
  completed_at: string | null;
  updated_at: string;
}

export const tables = {
  profiles: "profiles",
  userTopicProgress: "user_topic_progress",
} as const;
