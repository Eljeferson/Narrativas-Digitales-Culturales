export interface SuggestedCareers {
  professional: string[];
  technical: string[];
  others: string[];
}

export interface VocationPrediction {
  passion: string;
  description: string;
  score: number;
  accuracy: number;
  precision: number;
  suggested_careers: string[] | SuggestedCareers;
  category_id?: string;
  error?: string;
}

export interface VocationResponse {
  student_name: string;
  prediction: VocationPrediction;
}
