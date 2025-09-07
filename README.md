# Job Salary Dashboard — Granite (Replicate) Starter

This starter focuses on **one dataset** (Data Science Job Salaries from Kaggle) and generates
JSON files for your Next.js dashboard. It **uses IBM Granite via Replicate** in Colab to produce
AI insights (summaries & recommendations).

## What you get
- `notebooks/01_pipeline.ipynb` — Colab-ready notebook:
  - Install deps
  - Load & clean `ds_salaries.csv`
  - Aggregate (roles, countries, levels, yearly trend)
  - Call **ibm-granite/granite-3.3-8b-instruct** on **Replicate** via **LangChain**
  - Export JSON for web: `roles.json`, `countries.json`, `levels.json`, `trends.json`, `insights.json`
- `public/data/*.json` — placeholders (so you know expected shapes)

## How to use (Colab)
1. Open `notebooks/01_pipeline.ipynb` in **Google Colab**.
2. In Colab, set your **Replicate API token** at **Runtime → Variables** with key `api_token`.
3. Upload your Kaggle CSV as `ds_salaries.csv` when prompted.
4. Run all cells. Download the generated JSONs from `public/data/`.
5. Drop those JSONs into your Next.js app under `public/data/`.
