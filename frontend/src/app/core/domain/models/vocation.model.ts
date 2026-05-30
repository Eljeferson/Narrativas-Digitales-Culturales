export interface SuggestedCareers {
  professional: string[];
  technical: string[];
  others: string[];
}

export interface VocationMatch {
  category_id: string;
  passion: string;
  score: number;
  matched_terms: string[];
}

export interface VocationPrediction {
  passion: string;
  description: string;
  score: number;
  accuracy: number;
  precision: number;
  confidence_margin?: number;
  model_version?: string;
  explanation?: string;
  matched_terms?: string[];
  top_matches?: VocationMatch[];
  suggested_careers: string[] | SuggestedCareers;
  category_id?: string;
  error?: string;
}

export interface VocationResponse {
  student_name: string;
  prediction: VocationPrediction;
}
