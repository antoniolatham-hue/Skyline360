import os
import time
import requests

API_BASE = "https://skyline360.com/api"

# List of patient IDs to monitor
PATIENTS = os.getenv("PULSE_PATIENTS", "").split(",") if os.getenv("PULSE_PATIENTS") else []


def get_compliance_status(user_id: str) -> dict:
    """Fetch compliance status for a given user."""
    resp = requests.get(f"{API_BASE}/compliance", params={"user_id": user_id}, timeout=10)
    resp.raise_for_status()
    return resp.json()


def check_vitals(patient_id: str) -> dict:
    """Retrieve real-time vitals for a patient."""
    resp = requests.get(f"{API_BASE}/vitals", params={"patient_id": patient_id}, timeout=10)
    resp.raise_for_status()
    return resp.json()


def send_alert(patient_id: str, alert_type: str, notes: str = "") -> dict:
    """Send an alert to the ICU team for a critical condition."""
    payload = {"patient_id": patient_id, "alert_type": alert_type, "notes": notes}
    resp = requests.post(f"{API_BASE}/alerts", json=payload, timeout=10)
    resp.raise_for_status()
    return resp.json()


def monitor_patient(patient_id: str) -> None:
    """Check patient vitals and dispatch alerts if necessary."""
    vitals = check_vitals(patient_id)
    if vitals.get("critical"):
        send_alert(patient_id, "critical", "Vitals flagged critical by pulse agent")


def run_loop(interval: int = 60) -> None:
    """Run the monitoring loop continuously."""
    if not PATIENTS:
        raise ValueError("No patient IDs configured. Set PULSE_PATIENTS environment variable.")
    while True:
        for patient_id in PATIENTS:
            monitor_patient(patient_id)
        time.sleep(interval)


if __name__ == "__main__":
    interval = int(os.getenv("PULSE_INTERVAL", "60"))
    run_loop(interval)
