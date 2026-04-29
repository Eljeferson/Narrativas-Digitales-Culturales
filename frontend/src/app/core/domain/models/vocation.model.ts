export interface VocationPrediction {
  passion: string;
  description: string;
  score: number;
  suggested_careers: string[];
  category_id?: string;
  error?: string;
}

export interface VocationResponse {
  student_name: string;
  prediction: VocationPrediction;
}
