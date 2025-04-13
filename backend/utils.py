"""
Utility functions for the AI Research Assistant
"""

import os
import logging
from typing import Set
import mimetypes

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def allowed_file(filename: str, allowed_extensions: Set[str]) -> bool:
    """
    Check if a file has an allowed extension
    
    Args:
        filename: The filename to check
        allowed_extensions: Set of allowed file extensions
        
    Returns:
        True if the file extension is allowed, False otherwise
    """
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in allowed_extensions

def extract_text_from_file(file_path: str) -> str:
    """
    Extract text content from various file types
    
    Args:
        file_path: Path to the file
        
    Returns:
        Extracted text content as a string
    """
    try:
        # Get file extension
        _, ext = os.path.splitext(file_path)
        ext = ext.lower().lstrip('.')
        
        # Handle different file types
        if ext in ['txt']:
            # Simple text file
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                return f.read()
                
        elif ext in ['pdf']:
            # PDF file
            try:
                import PyPDF2
                with open(file_path, 'rb') as f:
                    reader = PyPDF2.PdfReader(f)
                    text = ""
                    for page in reader.pages:
                        text += page.extract_text() + "\n"
                    return text
            except ImportError:
                logger.warning("PyPDF2 not installed. Using fallback method for PDF.")
                # Fallback to textract if available
                try:
                    import textract
                    return textract.process(file_path).decode('utf-8')
                except ImportError:
                    return f"[PDF content extraction requires PyPDF2 or textract package]"
                
        elif ext in ['doc', 'docx']:
            # Word document
            try:
                import docx
                doc = docx.Document(file_path)
                return "\n".join([para.text for para in doc.paragraphs])
            except ImportError:
                logger.warning("python-docx not installed. Using fallback method for DOCX.")
                # Fallback to textract if available
                try:
                    import textract
                    return textract.process(file_path).decode('utf-8')
                except ImportError:
                    return f"[Word document content extraction requires python-docx or textract package]"
                
        elif ext in ['csv']:
            # CSV file
            try:
                import pandas as pd
                df = pd.read_csv(file_path)
                return df.to_string()
            except ImportError:
                logger.warning("pandas not installed. Using basic CSV parsing.")
                import csv
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    reader = csv.reader(f)
                    return "\n".join([",".join(row) for row in reader])
                
        elif ext in ['xls', 'xlsx']:
            # Excel file
            try:
                import pandas as pd
                df = pd.read_excel(file_path)
                return df.to_string()
            except ImportError:
                return f"[Excel content extraction requires pandas and openpyxl packages]"
                
        else:
            # Unsupported file type
            return f"[Unsupported file type: {ext}]"
            
    except Exception as e:
        logger.error(f"Error extracting text from file {file_path}: {str(e)}")
        return f"[Error extracting text: {str(e)}]"

def sanitize_filename(filename: str) -> str:
    """
    Sanitize a filename to make it safe for storage
    
    Args:
        filename: The filename to sanitize
        
    Returns:
        A sanitized filename
    """
    # Replace potentially dangerous characters
    for char in ['/', '\\', ':', '*', '?', '"', '<', '>', '|']:
        filename = filename.replace(char, '_')
    return filename

def get_mime_type(file_path: str) -> str:
    """
    Get the MIME type of a file
    
    Args:
        file_path: Path to the file
        
    Returns:
        MIME type as a string
    """
    mime_type, _ = mimetypes.guess_type(file_path)
    return mime_type or 'application/octet-stream'

def truncate_text(text: str, max_length: int = 1000) -> str:
    """
    Truncate text to a maximum length
    
    Args:
        text: The text to truncate
        max_length: Maximum length
        
    Returns:
        Truncated text
    """
    if len(text) <= max_length:
        return text
    return text[:max_length] + "..."
