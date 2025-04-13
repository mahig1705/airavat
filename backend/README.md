# AI Research Assistant Backend

This is the Flask backend for the AI Research Assistant application. It provides API endpoints for chat, document processing, and report generation.

## Features

- Chat API with LLM integration
- Document upload and processing
- Report generation
- Support for multiple file formats (PDF, DOC, DOCX, TXT, CSV, XLS, XLSX)

## Setup

### Prerequisites

- Python 3.8+
- Virtual environment (recommended)

### Installation

1. Clone the repository
2. Run the setup script:

\`\`\`bash
chmod +x setup.sh
./setup.sh
\`\`\`

3. Update the `.env` file with your API keys and configuration

### Running the Application

\`\`\`bash
chmod +x run.sh
./run.sh
\`\`\`

The server will start on http://localhost:5000

## API Endpoints

### Chat API

\`\`\`
POST /api/chat
\`\`\`

Request body:
\`\`\`json
{
  "message": "Your query here",
  "user_id": "optional_user_id"
}
\`\`\`

### File Upload API

\`\`\`
POST /api/upload
\`\`\`

Form data:
- `files`: One or more files to upload
- `user_id`: Optional user ID

### Document List API

\`\`\`
GET /api/documents?user_id=optional_user_id
\`\`\`

### Report API

\`\`\`
GET /api/reports/<report_id>
\`\`\`

## Docker Support

Build the Docker image:

\`\`\`bash
docker build -t ai-research-assistant .
\`\`\`

Run the container:

\`\`\`bash
docker run -p 5000:5000 -e LLM_API_KEY=your_api_key_here ai-research-assistant
\`\`\`

## Environment Variables

- `LLM_API_KEY`: API key for the LLM service
- `LLM_MODEL`: Model name to use (default: gpt-4)
- `USE_LOCAL_MODEL`: Set to "true" to use a local model instead of API
- `FLASK_APP`: Flask application entry point
- `FLASK_ENV`: Flask environment (development/production)
