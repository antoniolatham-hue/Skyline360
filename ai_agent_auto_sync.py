class AIAgent:
    def __init__(self, name, role, description, duties, collaborators):
        self.name = name
        self.role = role
        self.description = description
        self.duties = duties
        self.collaborators = collaborators
        self.active = False

    def activate(self):
        self.active = True
        print(f"✅ Activated: {self.name} | Role: {self.role}")
        print(f"   ➤ Duties: {', '.join(self.duties)}")
        print(f"   🤝 Collaborates with: {', '.join(self.collaborators)}\n")

    def get_status(self):
        return {
            "Agent": self.name,
            "Role": self.role,
            "Active": self.active,
            "Duties": self.duties,
            "Collaborators": self.collaborators
        }

# ================================
# Define Agent Roles & Job Duties
# ================================

agents = [
    AIAgent(
        "CoreHub Agent",
        "System Manager",
        "Oversees all agents and system operations",
        ["Monitor agents", "Start/stop agents", "Manage performance"],
        ["All agents"]
    ),
    AIAgent(
        "AutoSync Agent",
        "Sync Manager",
        "Handles automatic GitHub syncing for all apps",
        ["Detect file changes", "Auto-push to GitHub", "Log sync status"],
        ["Developer Agent", "Function Maker"]
    ),
    AIAgent(
        "Function Maker",
        "Function Builder",
        "Creates reusable backend logic and smart functions",
        ["Generate Python/JS functions", "Analyze app behavior", "Update functions"],
        ["Developer Agent", "Feature Tracker"]
    ),
    AIAgent(
        "Developer Agent",
        "App Engineer",
        "Builds core features, fixes bugs, and implements logic",
        ["Write modules", "Fix bugs", "Optimize code"],
        ["Function Maker", "UI/UX Agent"]
    ),
    AIAgent(
        "Feature Tracker",
        "Component Reuse Agent",
        "Finds and reuses existing features across apps",
        ["Scan existing apps", "Recommend reuse", "Flag duplicates"],
        ["All app-specific agents"]
    ),
    AIAgent(
        "UI/UX Agent",
        "Design Specialist",
        "Designs app screens and user experience flows",
        ["Create 3 layout options", "Design mobile-friendly views", "Improve UX"],
        ["Developer Agent", "Branding Agent"]
    ),
    AIAgent(
        "Branding Agent",
        "Visual Identity Creator",
        "Designs covers, icons, and logos for each app",
        ["Create app branding", "Export visuals", "Theme matching"],
        ["UI/UX Agent", "Marketing Agent"]
    ),
    AIAgent(
        "Marketing Agent",
        "Growth Strategist",
        "Builds launch campaigns and social media plans",
        ["Write ad copy", "Identify launch partners", "Generate email pitches"],
        ["Branding Agent", "Revenue Agent"]
    ),
    AIAgent(
        "Revenue Agent",
        "Monetization Planner",
        "Plans business model, pricing, and budgets",
        ["Suggest pricing", "Plan subscriptions", "Build cost forecast"],
        ["Marketing Agent", "System Manager"]
    ),
    AIAgent(
        "Security Agent",
        "Threat Detector",
        "Protects apps from hacks and logs suspicious activity",
        ["Monitor logs", "Patch vulnerabilities", "Alert on failed logins"],
        ["Developer Agent", "System Manager"]
    ),
    AIAgent(
        "Response Monitor",
        "Health Checker",
        "Watches for broken features or downtime",
        ["Track load speed", "Log API errors", "Auto-respond to issues"],
        ["Function Maker", "Developer Agent"]
    )
]

# ====================
# Run Auto-Sync Setup
# ====================

def sync_all_agents():
    print("🔁 Syncing all agents to roles and job duties...\n")
    for agent in agents:
        agent.activate()

    print("✅ All agents are active and synced.\n")

# ============
# Main Trigger
# ============

if __name__ == "__main__":
    sync_all_agents()
