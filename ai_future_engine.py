import openai, os, json, time
from datetime import datetime

openai.api_key = os.getenv("OPENAI_API_KEY")

# 🔮 1. Real-Time Trend + Tech Watcher
def global_trend_scan():
    prompt = """
    You are a global AI trend engine. Scan current global data including:
    - New startup launches
    - Big tech patents
    - Futuristic product leaks
    - AI, biotech, AR/VR, energy apps

    Predict one app or product we should start building *immediately* to stay ahead.

    Respond as JSON:
    {
        "idea_title": "...",
        "description": "...",
        "urgency_level": "HIGH/MEDIUM/LOW",
        "why_now": "...",
        "related_tech": [...],
        "agents_to_assign": [...]
    }
    """
    response = openai.ChatCompletion.create(model="gpt-4", messages=[
        {"role": "system", "content": "You're a real-time global future app predictor."},
        {"role": "user", "content": prompt}
    ])
    return json.loads(response.choices[0].message.content)

# 🔁 2. Auto Sync to Ecosystem
def sync_output(data):
    label = data['idea_title']
    ts = datetime.now().strftime("%Y%m%d%H%M")
    fname = f"{label.replace(' ', '_')}_future_sync_{ts}.json"

    with open(fname, 'w') as f:
        json.dump(data, f, indent=2)

    sync_path = "/all_apps_sync_folder/"
    os.makedirs(sync_path, exist_ok=True)
    os.system(f"cp {fname} {sync_path}")
    print(f"✅ Synced: {label} across all systems.")

# 🚀 3. AI Notification + Agent Trigger
def alert_and_assign(data):
    print(f"\n🚨 NEW PROJECT: {data['idea_title']}")
    print(f"📌 Reason: {data['why_now']}")
    print(f"🧠 Agents to Assign: {', '.join(data['agents_to_assign'])}")


def run_future_engine():
    data = global_trend_scan()
    sync_output(data)
    alert_and_assign(data)


if __name__ == "__main__":
    run_future_engine()
