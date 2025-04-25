
export interface Commit {
  id: string;
  behaviorDescription: string;
  evaluation: 'never' | 'sometimes' | 'always' | null;
}
