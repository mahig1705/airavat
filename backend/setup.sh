#!/bin/bash

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create uploads directory
mkdir -p uploads

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "# Environment variables for AI Research Assistant" > .env
    echo "LLM_API_KEY=your_api_key_here" >> .env
    echo "LLM_MODEL=gpt-4" >> .env
    echo "USE_LOCAL_MODEL=false" >> .env
    echo "FLASK_APP=app.py" >> .env
    echo "FLASK_ENV=development" >> .env
    echo "Created .env file. Please update with your API keys."
fi

echo "Setup complete! Run './run.sh' to start the application."
