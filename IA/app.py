from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from vocation_analyzer import VocationAnalyzer

app = FastAPI(title="CulturaStory Vocational IA Service")
analyzer = VocationAnalyzer()

class StoryRequest(BaseModel):
    content: str
    student_name: str = "Alumno"

@app.get("/")
def read_root():
    return {"status": "online", "service": "Vocational IA Analyzer"}

@app.post("/analyze")
def analyze_vocation(request: StoryRequest):
    try:
        result = analyzer.analyze_story(request.content)
        return {
            "student_name": request.student_name,
            "prediction": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
