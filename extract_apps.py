import json

target_apps = [
    "Faceoff", "GitWand", "TeamBridge", "Brave Origin", "Dinky", 
    "Open Pencil", "Personal Computer", "WiiFin", "Notch Pilot", 
    "Tuta Drive", "Thunderbolt", "Vibe Island", "Nothing Warp", 
    "FluidCAD", "TermOnMac", "PureMac", "Bag", "Delineato", 
    "Astropad Workbench"
]

with open('new_apps_alternativeto.json', 'r') as f:
    data = json.load(f)

extracted = []
for app_name in target_apps:
    found = False
    for item in data:
        if item.get("Software Name", "").lower() == app_name.lower():
            extracted.append(item)
            found = True
            break
    if not found:
        print(f"App {app_name} not found!")

with open('extracted_apps.json', 'w') as f:
    json.dump(extracted, f, indent=2)
