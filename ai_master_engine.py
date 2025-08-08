import json
import os
from typing import List, Dict, Any

class AIAgent:
    def __init__(self, name: str, role: str, description: str, tools: List[Dict[str, Any]] | None = None):
        self.name = name
        self.role = role
        self.description = description
        self.tasks: List[str] = []
        self.tools: List[Dict[str, Any]] = tools or []
        self.active = False
        self.log: List[str] = []

    def activate(self) -> None:
        self.active = True
        self.log.append(f"{self.name} activated.")
        print(f"\u2705 {self.name} activated \u2014 Role: {self.role}")

    def load_tasks(self, task_file: str = "gpt-actions.json") -> None:
        """Search for task files and load tasks for the agent's role."""
        found_files: List[str] = []
        for root, _, files in os.walk(os.getcwd()):
            if task_file in files:
                found_files.append(os.path.join(root, task_file))

        if not found_files:
            self.log.append("No gpt-actions.json found.")
            print(f"\u26a0\ufe0f No gpt-actions.json found for {self.name}")
            return

        tasks: List[Any] = []
        for path in found_files:
            with open(path) as f:
                data = json.load(f)
                role_tasks = data.get(self.role, [])
                tasks.extend(role_tasks)
                self.log.append(f"Loaded {len(role_tasks)} task(s) from {path}.")

        self.tasks = tasks
        self.log.append(f"Total tasks loaded: {len(self.tasks)}.")

    def assign_tools(self, all_tools: List[Dict[str, Any]]) -> None:
        # Automatically link all useful tools
        self.tools.extend(tool for tool in all_tools if self.role in tool.get("roles", []))
        self.log.append(f"Linked {len(self.tools)} tool(s).")

    def report(self) -> Dict[str, Any]:
        return {
            "Agent": self.name,
            "Role": self.role,
            "Active": self.active,
            "Tasks": self.tasks,
            "Tools Linked": [t["name"] for t in self.tools],
            "Logs": self.log,
        }

# \ud83d\udce6 Shared toolset (can be expanded or fetched externally)
shared_tools = [
    {"name": "GitHub Sync Tool", "roles": ["Sync Manager", "System Manager"]},
    {"name": "Function Generator", "roles": ["Function Builder", "App Engineer"]},
    {"name": "Bug Scanner", "roles": ["App Engineer", "Threat Detector"]},
    {"name": "BrandKit Designer", "roles": ["Visual Identity Creator", "Design Specialist"]},
    {"name": "Marketing Pitch Writer", "roles": ["Growth Strategist"]},
    {"name": "Revenue Planner Tool", "roles": ["Monetization Planner", "System Manager"]},
]

# 🧠 Define AI Agents
agents = [
    AIAgent("CoreHub Agent", "System Manager", "Controls and powers the AI ecosystem."),
    AIAgent("AutoSync Agent", "Sync Manager", "Syncs all apps to GitHub automatically."),
    AIAgent("Function Maker", "Function Builder", "Creates and upgrades smart functions."),
    AIAgent("Developer Agent", "App Engineer", "Builds, fixes, and improves app logic."),
    AIAgent("Feature Tracker", "Component Reuse Agent", "Detects reusable features."),
    AIAgent("UI/UX Agent", "Design Specialist", "Designs interface and layouts."),
    AIAgent("Branding Agent", "Visual Identity Creator", "Creates app branding."),
    AIAgent("Marketing Agent", "Growth Strategist", "Plans app marketing."),
    AIAgent("Revenue Agent", "Monetization Planner", "Designs pricing & revenue flows."),
    AIAgent("Security Agent", "Threat Detector", "Protects system from attacks."),
    AIAgent("Response Monitor", "Health Checker", "Monitors app/API performance."),
]

# \ud83d\udce4 Auto Activation + Task Load + Tool Assignment
def boot_agents() -> None:
    print("🧠 Initializing AI Master Engine...\n")
    for agent in agents:
        agent.activate()
        agent.load_tasks()
        agent.assign_tools(shared_tools)
        print(f"📋 {agent.name} loaded with {len(agent.tasks)} task(s)\n")

# \ud83d\udda5\ufe0f Display Status
def show_agent_logs() -> None:
    for agent in agents:
        status = agent.report()
        print(f"🗶 {status['Agent']} \u2014 Tasks: {len(status['Tasks'])} | Tools: {len(status['Tools Linked'])}")
        for log in status["Logs"]:
            print(f"   \u2022 {log}")
        print()

# \ud83d\ude80 Run Master Engine
if __name__ == "__main__":
    boot_agents()
    show_agent_logs()
