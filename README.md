# SkyLink360
Aviation management platform with real-time flight tracking, passenger wellness features, and safety tools. Built with React, Express, TypeScript, and WebSocket.

## Pulse Agent
`pulse.py` provides simple 24/7 monitoring logic that polls Skyline360 APIs for a list of configured patients. It can be used in Codex apps by placing the file at your project root and executing it as a separate process.

### Usage
1. Install dependencies:
   ```bash
   pip install requests
   ```
2. Configure patient IDs and optional loop interval:
   ```bash
   export PULSE_PATIENTS="123,456"
   export PULSE_INTERVAL=60
   ```
3. Run the agent:
   ```bash
   python pulse.py
   ```
The script runs continuously and sends alerts through the `sendAlert` action when any patient's vitals contain a `critical` flag.
