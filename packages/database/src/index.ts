export interface ProfileRow {
  id: string;
  display_name: string | null;
  role_slug: string | null;
  technology_slug: string | null;
  experience_level: string | null;
  xp_total?: number;
  streak?: number;
  last_active_on?: string | null;
  leaderboard_opt_in?: boolean;
  badges?: string[];
  completed_activity_ids?: string[];
  daily_key?: string | null;
  weekly_key?: string | null;
  notify_practice?: boolean;
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

export interface XpTransactionRow {
  id: string;
  user_id: string;
  amount: number;
  reason: string;
  activity_id: string | null;
  created_at: string;
}

export const tables = {
  profiles: "profiles",
  userTopicProgress: "user_topic_progress",
  xpTransactions: "xp_transactions",
  leaderboardEntries: "leaderboard_entries",
} as const;
