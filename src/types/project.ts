export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  live_link?: string | null;
  github_link?: string | null;
  tech_stack: string[];
  key_features: string[];
  star_situation?: string | null;
  star_task?: string | null;
  star_action?: string | null;
  star_result?: string | null;
  created_at: string;
}
