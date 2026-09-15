export interface ServicePackage {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  themeColor: string;
  mode: 'dark' | 'light';
  sequenceUrl: string;
  frameCount: number;
  framePattern?: string; // fallback pattern like '/assets/sequences/default/frame_{index}.webp'
  price: string;
  estimatedTime: string;
  features: string[];
  recommendedFor?: string;
  badge?: string;
}

export interface DetailingProcessStep {
  step: string;
  title: string;
  description: string;
  highlight: string;
  icon: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  vehicle: string;
  package: string;
  rating: number;
  date: string;
  comment: string;
  avatarSeed: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
