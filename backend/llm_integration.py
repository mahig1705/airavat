import os
import json
from datetime import datetime, timedelta
import yfinance as yf
from eventregistry import EventRegistry, QueryArticles, RequestArticlesInfo
import time
import openai
from flask import Flask, request, jsonify

# Initialize Flask App
app = Flask(__name__)

# Ensure cache directory exists
os.makedirs("cache", exist_ok=True)

# EventRegistry API Key
API_KEY = "d1af7f37-93ff-425d-b21b-12721b16b036"
er = EventRegistry(apiKey=API_KEY)

# OpenAI API Key
openai.api_key = "api_key"

@app.route('/process_query', methods=['POST'])
def process_query():
    try:
        # Parse the incoming JSON data
        data = request.get_json()
        query = data.get('query', '')

        # Process the query (this is where your logic will go)
        if "company" in query.lower():
            response_data = {
                "type": "company",
                "name": "Apple"
            }
        elif "sector" in query.lower():
            response_data = {
                "type": "sector",
                "name": "Technology"
            }
        else:
            response_data = {
                "type": "unknown",
                "name": "Unknown Query"
            }

        return jsonify({"response": json.dumps(response_data)})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
class KPIFetcher:
    def __init__(self, ticker):
        self.ticker = ticker
        self.kpis = {}

    def fetch_yfinance_kpis(self):
        try:
            print(f"📈 Fetching KPIs for {self.ticker}")
            stock = yf.Ticker(self.ticker)
            info = stock.info

            kpis = {
                "Company": self.ticker,
                "Sector": info.get("sector", "N/A"),
                "Industry": info.get("industry", "N/A"),
                "Market Cap": info.get("marketCap", "N/A"),
                "Revenue": info.get("totalRevenue", "N/A"),
                "EBITDA": info.get("ebitda", "N/A"),
                "Net Profit": info.get("netIncomeToCommon", "N/A"),
                "Gross Margin": info.get("grossMargins", "N/A"),
                "Operating Margin": info.get("operatingMargins", "N/A"),
                "Profit Margin": info.get("profitMargins", "N/A"),
                "EPS": info.get("epsTrailingTwelveMonths", "N/A"),
                "P/E Ratio": info.get("trailingPE", "N/A"),
                "PEG Ratio": info.get("pegRatio", "N/A"),
                "Price-to-Book Ratio": info.get("priceToBook", "N/A"),
                "Dividend Yield": info.get("dividendYield", "N/A"),
                "Dividends Paid": info.get("dividendRate", "N/A"),
                "Return on Equity": info.get("returnOnEquity", "N/A"),
                "Return on Assets": info.get("returnOnAssets", "N/A"),
                "Debt-to-Equity Ratio": info.get("debtToEquity", "N/A"),
                "Free Cash Flow": info.get("freeCashflow", "N/A")
            }

            self.kpis = {key: value for key, value in kpis.items() if value != "N/A"}
            self.save_data(f"company-function-{self.ticker}")
        except Exception as e:
            print(f"❌ Error fetching for {self.ticker}: {str(e)}")

        return self.kpis

    def save_data(self, file_name):
        with open(f"cache/{file_name}.json", "w") as f:
            json.dump(self.kpis, f, indent=4)

def fetch_stock_data(ticker):
    end_date = datetime.today()
    start_date = end_date - timedelta(days=30)
    stock = yf.download(ticker, start=start_date.strftime("%Y-%m-%d"), end=end_date.strftime("%Y-%m-%d"))
    save_data(f"company-function-{ticker}", stock.to_dict())
    return stock

def detect_price_spikes(stock_df, threshold=5):
    spikes = []
    closes = stock_df["Close"].values
    dates = stock_df.index

    for i in range(1, len(closes)):
        prev = closes[i - 1]
        curr = closes[i]
        change = ((curr - prev) / prev) * 100
        if abs(change) >= threshold:
            spikes.append((dates[i].strftime("%Y-%m-%d"), round(float(change), 2)))
    return spikes

def save_data(file_name, data):
    with open(f"cache/{file_name}.json", "w") as f:
        json.dump(data, f, indent=4)

def fetch_news_for_date(company_name, date, days_window=2):
    date_start = (datetime.strptime(date, "%Y-%m-%d") - timedelta(days=days_window)).strftime("%Y-%m-%d")
    date_end = (datetime.strptime(date, "%Y-%m-%d") + timedelta(days=days_window)).strftime("%Y-%m-%d")

    q = QueryArticles(
        keywords=company_name,
        lang="eng",
        dateStart=date_start,
        dateEnd=date_end
    )

    q.setRequestedResult(RequestArticlesInfo(
        count=3,
        sortBy="date",
        sortByAsc=False
    ))

    res = er.execQuery(q)
    articles = res.get("articles", {}).get("results", [])
    save_data(f"company-function-{company_name}-news", articles)
    return articles

def analyze_stock_news(company_name, ticker):
    stock_df = fetch_stock_data(ticker)
    if stock_df.empty:
        return {"error": "Failed to fetch stock data"}

    spikes = detect_price_spikes(stock_df)
    if not spikes:
        return {"message": "No significant price spikes found."}

    result = {"spikes": []}
    for date, change in spikes:
        articles = fetch_news_for_date(company_name, date)
        result["spikes"].append({
            "date": date,
            "change": change,
            "articles": articles
        })

    save_data(f"company-function-{ticker}-analysis", result)
    return result

def generate_prompt(data, function_type):
    if function_type == "kpi":
        return f"Summarize the following KPIs of the company {data['Company']}:\n\n{json.dumps(data, indent=4)}"
    elif function_type == "stock":
        return f"Analyze the following stock movements and summarize the key findings:\n\n{json.dumps(data, indent=4)}"
    elif function_type == "news":
        return f"Summarize the following news articles related to the company based on stock movements:\n\n{json.dumps(data, indent=4)}"
    else:
        return "Generate a summary based on the raw data."

def get_llm_summary(prompt):
    try:
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=500
        )
        return response.choices[0].text.strip()
    except Exception as e:
        print(f"❌ Error generating LLM summary: {str(e)}")
        return None

def generate_final_report(query):
    query_type = query.get("type")
    name = query.get("name")

    if query_type == "company":
        print(f"📝 Generating research report for {name}")
        kpi_fetcher = KPIFetcher(name)
        kpis = kpi_fetcher.fetch_yfinance_kpis()
        kpi_prompt = generate_prompt(kpis, "kpi")
        kpi_summary = get_llm_summary(kpi_prompt)

        stock_report = analyze_stock_news(name, name)
        stock_prompt = generate_prompt(stock_report, "stock")
        stock_summary = get_llm_summary(stock_prompt)

        news_articles = fetch_news_for_date(name, datetime.today().strftime("%Y-%m-%d"))
        news_prompt = generate_prompt(news_articles, "news")
        news_summary = get_llm_summary(news_prompt)

        final_report = {
            "kpi_summary": kpi_summary,
            "stock_summary": stock_summary,
            "news_summary": news_summary
        }

        return final_report
    else:
        return {"error": "Invalid query type"}

# --- Flask API Routes ---

@app.route("/api/report", methods=["POST"])
def api_generate_report():
    data = request.get_json()
    if not data or "type" not in data or "name" not in data:
        return jsonify({"error": "Invalid input"}), 400
    result = generate_final_report(data)
    return jsonify(result)

@app.route("/")
def index():
    return "📊 Welcome to the Ai research  Backend API"

# --- Start Flask Server ---
if __name__ == "__main__":
    app.run(debug=True)
