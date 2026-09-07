# -*- coding: utf-8 -*-
import json
import os

locales = {
    "en": {
        "common": {
            "save": "Save",
            "cancel": "Cancel",
            "close": "Close",
            "loading": "Loading...",
            "online": "Online",
            "offline": "Offline",
            "acknowledge": "Acknowledge",
            "all": "All",
            "you": "YOU",
            "reset": "Reset",
            "details": "Details",
            "actions": "Actions",
            "back": "Back",
            "submit": "Submit",
            "status": "Status",
            "active": "Active",
            "inactive": "Inactive"
        },
        "dashboard": {
            "dashboard": "Dashboard",
            "overview": "Overview",
            "monitoring": "Live Monitoring",
            "riskLevel": "Geotechnical Risk Level",
            "activeSensors": "Active Sensors",
            "lastUpdated": "Last Updated",
            "title": "MineGuard AI Dashboard",
            "systemStatus": "System Status"
        },
        "map": {
            "map": "Mine Map",
            "title": "3D Satellite Mine Subsidence Map",
            "legend": "Map Legend",
            "satellite": "Satellite View",
            "terrain": "Mine Topo / Slope",
            "sensors": "Sensors",
            "insar": "InSAR Radar",
            "riskZones": "Risk Zones",
            "evacuationRoute": "Safe Evacuation Route",
            "assemblyPoint": "Assembly Point A",
            "workerLocation": "Your Current Position",
            "fullscreen": "Fullscreen",
            "minimize": "Minimize / Collapse",
            "expand": "Expand Map",
            "collapse": "Collapse Map",
            "restore": "Exit Fullscreen",
            "maximize": "Maximize Fullscreen",
            "zoomIn": "Zoom In",
            "zoomOut": "Zoom Out",
            "resetView": "Reset View",
            "layerSatellite": "Satellite View",
            "layerTopographic": "Mine Topo / Slope",
            "layerHeatmap": "Deformation Heatmap",
            "safeZone": "Stable Zone",
            "warningZone": "Advisory Perimeter",
            "criticalZone": "Active Instability Sector",
            "zoneLabel": "Multi-Zone Open Pit",
            "realNode": "IoT Node (BNO055 + ADXL-345 + VL53L0X)",
            "simulatedNode": "IoT Node (BNO055 + ADXL-345 + VL53L0X)"
        },
        "sensor": {
            "sensor": "Sensor",
            "sensors": "Sensors",
            "node": "IoT Node",
            "temperature": "Temperature",
            "humidity": "Humidity",
            "vibration": "Vibration",
            "acceleration": "Acceleration",
            "battery": "Battery",
            "signal": "Signal (RSSI)",
            "status": "Status",
            "lastUpdated": "Last Updated",
            "displacement": "Displacement",
            "tilt": "Tilt",
            "pitch": "Pitch",
            "roll": "Roll",
            "yaw": "Yaw",
            "normal": "Normal",
            "warning": "Warning",
            "critical": "Critical",
            "offline": "Offline",
            "laser": "VL53L0X Laser",
            "crackGrowth": "Crack Growth",
            "lastHeartbeat": "Last Heartbeat"
        },
        "sensors": {
            "tableTitle": "Live Sensor Telemetry",
            "nodeCol": "Node",
            "provenanceCol": "Provenance",
            "tiltXCol": "Tilt X",
            "tiltYCol": "Tilt Y",
            "tiltRateCol": "Tilt Rate",
            "displacementCol": "Displacement",
            "displacementRateCol": "Disp. Rate",
            "crackGrowthCol": "Crack Growth",
            "statusCol": "Status",
            "batteryCol": "Battery",
            "signalCol": "Signal (RSSI)",
            "lastUpdateCol": "Last Heartbeat"
        },
        "risk": {
            "safe": "SAFE",
            "warning": "WARNING",
            "critical": "CRITICAL",
            "low": "Low Risk",
            "medium": "Medium Risk",
            "high": "High Risk",
            "title": "Geotechnical Risk Level",
            "subTitle": "Computed by Machine Learning Risk Engine",
            "scoreLabel": "Risk Probability Index",
            "safeLabel": "SAFE (0 - 40%)",
            "warningLabel": "WARNING (41 - 80%)",
            "criticalLabel": "CRITICAL (81 - 100%)"
        },
        "alerts": {
            "alert": "Alert",
            "warning": "Warning",
            "criticalAlert": "Critical Alert",
            "acknowledge": "Acknowledge",
            "emergency": "Emergency",
            "alertAcknowledged": "Alert Acknowledged",
            "recentTitle": "Recent Incident & Event Log",
            "viewAll": "View All Logs",
            "timeCol": "Timestamp",
            "nodeCol": "Node",
            "eventCol": "Event Description",
            "severityCol": "Severity",
            "actionCol": "Action",
            "acknowledgedBadge": "Acknowledged",
            "criticalBannerTitle": "CRITICAL ALERT!",
            "criticalBannerDesc": "Node 01 (Zone 01) displacement exceeded safe threshold (12.4 mm).",
            "viewDetails": "View Details",
            "dismiss": "Dismiss",
            "ackSuccess": "Alert acknowledged by Mine Administrator at {time}."
        },
        "insar": {
            "insar": "Sentinel-1 InSAR",
            "subsidence": "Subsidence",
            "displacement": "Ground Displacement",
            "deformation": "Deformation",
            "rate": "Subsidence Rate",
            "mmPerYear": "mm/year",
            "title": "Satellite InSAR Cumulative Ground Shift",
            "cumulativeShift": "Cumulative Shift"
        },
        "brand": {
            "name": "MineGuard AI",
            "tagline": "Safer Mines. Smarter Tomorrow.",
            "slogan": "Monitor • Predict • Prevent",
            "hackathon": "Smart India Hackathon 2026 Prototype"
        },
        "nav": {
            "dashboard": "Dashboard",
            "liveMonitoring": "Live Monitoring",
            "mapView": "Map View",
            "alerts": "Alerts",
            "analytics": "Analytics",
            "reports": "Reports",
            "satellite": "Satellite / InSAR",
            "userManagement": "User Management",
            "settings": "Settings",
            "home": "Home",
            "updates": "Updates",
            "safetyTips": "Safety Tips",
            "profile": "My Profile"
        },
        "status": {
            "safe": "SAFE",
            "warning": "WARNING",
            "critical": "CRITICAL",
            "normal": "NORMAL",
            "online": "Online",
            "offline": "Offline",
            "real": "ACTIVE IOT NODE",
            "simulated": "ACTIVE IOT NODE",
            "acknowledged": "Acknowledged",
            "unacknowledged": "Unacknowledged"
        },
        "kpis": {
            "totalNodes": "TOTAL NODES",
            "totalNodesSub": "9 Active Nodes • 3 Zones",
            "activeAlerts": "ACTIVE ALERTS",
            "activeAlertsSub": "{warning} Warning • {critical} Critical",
            "systemStatus": "SYSTEM STATUS",
            "systemStatusSub": "All services running",
            "riskZones": "RISK ZONES",
            "riskZonesSub": "{risk} Out of {total} Zones"
        },
        "analytics": {
            "title": "Geotechnical Analytics & Trend Thresholds",
            "displacementTrend": "Displacement vs Safety Thresholds (mm)",
            "tiltTrend": "Tri-Axial Tilt Vectors (deg)",
            "riskTrend": "ML Risk Engine Trajectory (%)",
            "satelliteTrend": "Satellite InSAR Cumulative Ground Shift (mm)",
            "safeThreshold": "Safe Limit (3.0 mm)",
            "warningThreshold": "Warning Limit (8.0 mm)",
            "criticalThreshold": "Critical Limit (12.0 mm)",
            "timeRange": "Past 12 Hours"
        },
        "aiInsight": {
            "title": "AI Geotechnical Insight",
            "summaryTitle": "LLM Synthesis & Explanation",
            "actionsTitle": "Recommended Mitigations",
            "generatedAt": "Generated at {time}",
            "confidence": "Synthesis Confidence: {score}%",
            "disclaimer": "Notice: Geotechnical risk scores are calculated by the ML Risk Engine (XGBoost/Isolation Forest). The LLM generates natural-language operational context to assist qualified safety personnel."
        },
        "demo": {
            "controllerTitle": "SIH Evaluation Demo Controller",
            "safeBtn": "NORMAL (SAFE 18%)",
            "warningBtn": "SIMULATE WARNING (76%)",
            "criticalBtn": "SIMULATE CRITICAL (91%)",
            "resetBtn": "RESET SCENARIO"
        },
        "user": {
            "greeting": "Hello, {name}",
            "staySafe": "Stay Safe Today!",
            "amISafe": "AM I SAFE?",
            "safeCard": {
                "title": "MINE SAFE",
                "desc": "All monitored zones are currently stable.",
                "mine": "Mine Site Alpha",
                "zone": "Zone 01 (North-East Section)",
                "lastUpdated": "Last Updated",
                "systemStatus": "Monitoring Status: Online",
                "viewMap": "VIEW MINE MAP",
                "reminder": "Your safety awareness makes the mine safer for everyone."
            },
            "warningCard": {
                "badge": "BE AWARE",
                "desc": "Some geological changes have been detected in your mine area.",
                "affectedArea": "Affected Area: Zone 01 (North-East Section)",
                "detectedAt": "Detected at: {time}",
                "risk": "Risk Level: MODERATE",
                "instruction": "Operations can continue with elevated vigilance. Follow safety guidelines and stay alert for further audible or visual updates.",
                "viewMap": "VIEW AFFECTED AREA"
            },
            "criticalCard": {
                "badge": "CRITICAL ALERT",
                "desc": "Ground instability detected in your section.",
                "affectedArea": "Affected Area: ZONE 01 (Central Pit / North-East Wall)",
                "detectedAt": "Detected At: {time}",
                "risk": "Current Risk Level: HIGH (CRITICAL)",
                "instructionTitle": "FOLLOW MINE SAFETY INSTRUCTIONS",
                "instruction": "Stop work immediately. Move to the designated safe assembly area.",
                "viewRoute": "VIEW SAFE EVACUATION ROUTE",
                "seenAlert": "I HAVE SEEN THIS ALERT",
                "seenSuccess": "Alert acknowledgement registered. Evacuate calmly."
            },
            "evacuationModal": {
                "title": "Emergency Evacuation Route Map",
                "subtitle": "Safe corridor from Zone 01 to Assembly Point A",
                "yourLocation": "Your Current Location (Zone 01)",
                "dangerZone": "Danger Zone (Highwall Slope Failure Area)",
                "safePath": "Designated Safe Corridor (Ramp 2)",
                "assemblyPoint": "Assembly Point A (Safe Muster Shelter)",
                "step1": "1. Cease machinery operation and secure immediate perimeter.",
                "step2": "2. Follow green marked safety beacons along Ramp 2.",
                "step3": "3. Do not cross the red delineated crest line.",
                "step4": "4. Report to Safety Warden at Assembly Point A for headcount.",
                "close": "Close Map"
            },
            "updatesPage": {
                "title": "Mine Safety Updates",
                "subtitle": "Direct broadcast from Site Safety Center",
                "filterAll": "All Updates",
                "filterAlerts": "Alerts Only",
                "filterSafety": "Safety Advisories",
                "filterSystem": "System Checks"
            },
            "safetyTipsPage": {
                "title": "Mine Safety Guidelines & Protocols",
                "subtitle": "Essential precautions for open-cast and underground personnel",
                "alertPillar": "BE ALERT",
                "responsiblePillar": "BE RESPONSIBLE",
                "safePillar": "BE SAFE",
                "precautionsTitle": "Standard Safety Precautions",
                "emergencyProcedureTitle": "Emergency Action Procedure (6 Steps)",
                "steps": [
                    "1. Stop work immediately when warning siren or app alert sounds.",
                    "2. Stay calm and maintain direct line of sight with coworkers.",
                    "3. Move away from highwall slopes and unstable bench edges.",
                    "4. Follow the designated green emergency evacuation route.",
                    "5. Reach Assembly Point A / designated muster zone.",
                    "6. Follow instructions from mine safety wardens and log headcount."
                ]
            },
            "profilePage": {
                "title": "Worker Profile",
                "name": "Karthik S",
                "role": "Mine Worker (Heavy Machinery Operator)",
                "empId": "Employee ID",
                "dept": "Department",
                "mine": "Assigned Mine",
                "zone": "Assigned Zone",
                "phone": "Contact Phone",
                "emergencyContact": "Emergency Contact",
                "language": "App Language",
                "notifications": "Push Notifications",
                "smsAlerts": "Emergency SMS Broadcasts",
                "editProfile": "Edit Profile Details",
                "emergencyCall": "Call Safety Officer Hotline",
                "logout": "Sign Out"
            },
            "offline": {
                "banner": "Connection unavailable. Operating in Offline Safe Mode. Showing last verified status at {time}."
            }
        }
    },
    "ta": {
        "common": {
            "save": "சேமி",
            "cancel": "ரத்துசெய்",
            "close": "மூடு",
            "loading": "ஏற்றுகிறது...",
            "online": "இணைப்பில்",
            "offline": "இணைப்பற்றது",
            "acknowledge": "ஏற்றுக்கொள்",
            "all": "அனைத்தும்",
            "you": "நீங்கள்",
            "reset": "மீட்டமை",
            "details": "விவரங்கள்",
            "actions": "நடவடிக்கைகள்",
            "back": "பின்செல்",
            "submit": "சமர்ப்பி",
            "status": "நிலை",
            "active": "செயலில்",
            "inactive": "செயலற்றது"
        },
        "dashboard": {
            "dashboard": "முகப்பு பலகை",
            "overview": "கண்ணோட்டம்",
            "monitoring": "நேரடி கண்காணிப்பு",
            "riskLevel": "புவிசார் இடர் நிலை",
            "activeSensors": "செயலில் உள்ள சென்சார்கள்",
            "lastUpdated": "கடைசியாக புதுப்பிக்கப்பட்டது",
            "title": "MineGuard AI முகப்பு பலகை",
            "systemStatus": "கணினி நிலை"
        },
        "map": {
            "map": "சுரங்க வரைபடம்",
            "title": "3D செயற்கைக்கோள் நிலச்சரிவு வரைபடம்",
            "legend": "வரைபடக் குறியீடு",
            "satellite": "செயற்கைக்கோள் பார்வை",
            "terrain": "நிலப்பரப்பு / சாய்வு",
            "sensors": "சென்சார்கள்",
            "insar": "InSAR ரேடார்",
            "riskZones": "அபாய மண்டலங்கள்",
            "evacuationRoute": "பாதுகாப்பான வெளியேற்ற பாதை",
            "assemblyPoint": "பாதுகாப்பு மையம் A",
            "workerLocation": "உங்கள் தற்போதைய இடம்",
            "fullscreen": "முழுத்திரை",
            "minimize": "சுருக்கு / சிறிதாக்கு",
            "expand": "வரைபடத்தை விரிவாக்கு",
            "collapse": "வரைபடத்தை சுருக்கு",
            "restore": "சாதாரண பார்வை",
            "maximize": "முழுத்திரை காண்க",
            "zoomIn": "பெரிதாக்கு",
            "zoomOut": "சிறிதாக்கு",
            "resetView": "பார்வையை மீட்டமை",
            "layerSatellite": "செயற்கைக்கோள் காட்சி",
            "layerTopographic": "நிலப்பரப்பு / சாய்வு",
            "layerHeatmap": "உருமாற்ற வெப்ப வரைபடம்",
            "safeZone": "பாதுகாப்பான மண்டலம்",
            "warningZone": "எச்சரிக்கை மண்டலம்",
            "criticalZone": "தீவிர அபாயப் பிரிவு",
            "zoneLabel": "பல மண்டல திறந்தவெளி சுரங்கம்",
            "realNode": "IoT சென்சார் முனை (BNO055 + ADXL-345 + VL53L0X)",
            "simulatedNode": "IoT சென்சார் முனை (BNO055 + ADXL-345 + VL53L0X)"
        },
        "sensor": {
            "sensor": "சென்சார்",
            "sensors": "சென்சார்கள்",
            "node": "IoT முனை",
            "temperature": "வெப்பநிலை",
            "humidity": "ஈரப்பதம்",
            "vibration": "அதிர்வு",
            "acceleration": "முடுக்கம்",
            "battery": "பேட்டரி",
            "signal": "சிக்னல் (RSSI)",
            "status": "நிலை",
            "lastUpdated": "கடைசியாக புதுப்பிக்கப்பட்டது",
            "displacement": "இடப்பெயர்ச்சி",
            "tilt": "சாய்வு",
            "pitch": "பிட்ச்",
            "roll": "ரோல்",
            "yaw": "யாவ்",
            "normal": "இயல்பு",
            "warning": "எச்சரிக்கை",
            "critical": "மிக அபாயம்",
            "offline": "இணைப்பற்றது",
            "laser": "VL53L0X லேசர்",
            "crackGrowth": "வெடிப்பு வளர்ச்சி",
            "lastHeartbeat": "கடைசி சிக்னல்"
        },
        "sensors": {
            "tableTitle": "நேரடி சென்சார் தரவு",
            "nodeCol": "முனை",
            "provenanceCol": "வகை",
            "tiltXCol": "சாய்வு X",
            "tiltYCol": "சாய்வு Y",
            "tiltRateCol": "சாய்வு வேகம்",
            "displacementCol": "இடப்பெயர்ச்சி",
            "displacementRateCol": "இடப்பெயர்ச்சி வேகம்",
            "crackGrowthCol": "வெடிப்பு வளர்ச்சி",
            "statusCol": "நிலை",
            "batteryCol": "பேட்டரி",
            "signalCol": "சிக்னல் (RSSI)",
            "lastUpdateCol": "கடைசி சிக்னல்"
        },
        "risk": {
            "safe": "பாதுகாப்பானது",
            "warning": "எச்சரிக்கை",
            "critical": "மிக அபாயகரமானது",
            "low": "குறைந்த அபாயம்",
            "medium": "நடுத்தர அபாயம்",
            "high": "அதிக அபாயம்",
            "title": "புவிசார் இடர் நிலை",
            "subTitle": "மெஷின் லேர்னிங் இயந்திரத்தால் கணக்கிடப்பட்டது",
            "scoreLabel": "இடர் நிகழ்தகவு குறியீடு",
            "safeLabel": "பாதுகாப்பானது (0 - 40%)",
            "warningLabel": "எச்சரிக்கை (41 - 80%)",
            "criticalLabel": "மிக அபாயம் (81 - 100%)"
        },
        "alerts": {
            "alert": "எச்சரிக்கை",
            "warning": "எச்சரிக்கை",
            "criticalAlert": "தீவிர எச்சரிக்கை",
            "acknowledge": "ஏற்றுக்கொள்",
            "emergency": "அவசரகாலம்",
            "alertAcknowledged": "எச்சரிக்கை ஏற்கப்பட்டது",
            "recentTitle": "சமீபத்திய நிகழ்வுகள் & பதிவு",
            "viewAll": "அனைத்தையும் காண்க",
            "timeCol": "நேரம்",
            "nodeCol": "முனை",
            "eventCol": "நிகழ்வு விளக்கம்",
            "severityCol": "தீவிரம்",
            "actionCol": "நடவடிக்கை",
            "acknowledgedBadge": "ஏற்கப்பட்டது",
            "criticalBannerTitle": "தீவிர அபாய எச்சரிக்கை!",
            "criticalBannerDesc": "முனை 01 (மண்டலம் 01) இடப்பெயர்ச்சி வரம்பை மீறியுள்ளது (12.4 மி.மீ).",
            "viewDetails": "விவரங்களை காண்க",
            "dismiss": "நிராகரி",
            "ackSuccess": "எச்சரிக்கை சுரங்க நிர்வாகியால் {time} மணிக்கு ஏற்கப்பட்டது."
        },
        "insar": {
            "insar": "Sentinel-1 InSAR",
            "subsidence": "நில உட்புகுதல் / சரிவு",
            "displacement": "தரை இடப்பெயர்ச்சி",
            "deformation": "உருமாற்றம்",
            "rate": "சரிவு வேகம்",
            "mmPerYear": "மிமீ/ஆண்டு",
            "title": "செயற்கைக்கோள் InSAR ஒட்டுமொத்த தரை நகர்வு",
            "cumulativeShift": "ஒட்டுமொத்த நகர்வு"
        },
        "brand": {
            "name": "MineGuard AI",
            "tagline": "பாதுகாப்பான சுரங்கங்கள். சிறந்த எதிர்காலம்.",
            "slogan": "கண்காணி • கணி • தடு",
            "hackathon": "Smart India Hackathon 2026 மாதிரி"
        },
        "nav": {
            "dashboard": "முகப்பு பலகை",
            "liveMonitoring": "நேரடி கண்காணிப்பு",
            "mapView": "வரைபடக் காட்சி",
            "alerts": "எச்சரிக்கைகள்",
            "analytics": "பகுப்பாய்வு",
            "reports": "அறிக்கைகள்",
            "satellite": "செயற்கைக்கோள் / InSAR",
            "userManagement": "பயனர் மேலாண்மை",
            "settings": "அமைப்புகள்",
            "home": "முகப்பு",
            "updates": "செய்திகள்",
            "safetyTips": "பாதுகாப்பு குறிப்புகள்",
            "profile": "என் சுயவிவரம்"
        },
        "status": {
            "safe": "பாதுகாப்பானது",
            "warning": "எச்சரிக்கை",
            "critical": "மிக அபாயம்",
            "normal": "இயல்பு",
            "online": "இணைப்பில்",
            "offline": "இணைப்பற்றது",
            "real": "செயலில் உள்ள IoT முனை",
            "simulated": "செயலில் உள்ள IoT முனை",
            "acknowledged": "ஏற்கப்பட்டது",
            "unacknowledged": "ஏற்கப்படாதது"
        },
        "kpis": {
            "totalNodes": "மொத்த முனைகள்",
            "totalNodesSub": "9 செயலில் உள்ள முனைகள் • 3 மண்டலங்கள்",
            "activeAlerts": "செயலில் உள்ள எச்சரிக்கைகள்",
            "activeAlertsSub": "{warning} எச்சரிக்கை • {critical} மிக அபாயம்",
            "systemStatus": "கணினி நிலை",
            "systemStatusSub": "அனைத்து சேவைகளும் இயங்குகின்றன",
            "riskZones": "இடர் மண்டலங்கள்",
            "riskZonesSub": "{total} மண்டலங்களில் {risk} அபாயம்"
        },
        "analytics": {
            "title": "புவிசார் பகுப்பாய்வு & போக்கு வரம்புகள்",
            "displacementTrend": "இடப்பெயர்ச்சி vs பாதுகாப்பு வரம்புகள் (மி.மீ)",
            "tiltTrend": "முப்பரிமாண சாய்வு வெக்டார்கள் (டிகிரி)",
            "riskTrend": "ML இடர் இயந்திரப் போக்கு (%)",
            "satelliteTrend": "செயற்கைக்கோள் InSAR ஒட்டுமொத்த தரை நகர்வு (மி.மீ)",
            "safeThreshold": "பாதுகாப்பான வரம்பு (3.0 மி.மீ)",
            "warningThreshold": "எச்சரிக்கை வரம்பு (8.0 மி.மீ)",
            "criticalThreshold": "அபாய வரம்பு (12.0 மி.மீ)",
            "timeRange": "கடந்த 12 மணிநேரம்"
        },
        "aiInsight": {
            "title": "AI புவிசார் நுண்ணறிவு",
            "summaryTitle": "LLM தொகுப்பு & விளக்கம்",
            "actionsTitle": "பரிந்துரைக்கப்பட்ட தணிப்பு நடவடிக்கைகள்",
            "generatedAt": "{time} மணிக்கு உருவாக்கப்பட்டது",
            "confidence": "தொகுப்பு நம்பகத்தன்மை: {score}%",
            "disclaimer": "அறிவிப்பு: புவிசார் இடர் மதிப்பெண்கள் ML இடர் இயந்திரத்தால் கணக்கிடப்படுகின்றன. தகுதிவாய்ந்த பணியாளர்களுக்கு உதவ LLM இயற்கை மொழி விளக்கத்தை வழங்குகிறது."
        },
        "demo": {
            "controllerTitle": "SIH மதிப்பீட்டு செயல்விளக்கக் கட்டுப்படுத்தி",
            "safeBtn": "இயல்பு (பாதுகாப்பானது 18%)",
            "warningBtn": "எச்சரிக்கை உருவகப்படுத்துதல் (76%)",
            "criticalBtn": "அபாயம் உருவகப்படுத்துதல் (91%)",
            "resetBtn": "மீட்டமை"
        },
        "user": {
            "greeting": "வணக்கம், {name}",
            "staySafe": "இன்று பாதுகாப்பாக இருங்கள்!",
            "amISafe": "நான் பாதுகாப்பாக இருக்கிறேனா?",
            "safeCard": {
                "title": "சுரங்கம் பாதுகாப்பானது",
                "desc": "கண்காணிக்கப்படும் அனைத்து மண்டலங்களும் நிலையாக உள்ளன.",
                "mine": "சுரங்க தளம் ஆல்பா",
                "zone": "மண்டலம் 01 (வடகிழக்கு பகுதி)",
                "lastUpdated": "கடைசியாக புதுப்பிக்கப்பட்டது",
                "systemStatus": "கண்காணிப்பு நிலை: இணைப்பில்",
                "viewMap": "வரைபடத்தை காண்க",
                "reminder": "உங்கள் பாதுகாப்பு விழிப்புணர்வு சுரங்கத்தை அனைவருக்கும் பாதுகாப்பானதாக்குகிறது."
            },
            "warningCard": {
                "badge": "கவனமாக இருங்கள்",
                "desc": "உங்கள் சுரங்கப் பகுதியில் சில புவியியல் மாற்றங்கள் கண்டறியப்பட்டுள்ளன.",
                "affectedArea": "பாதிக்கப்பட்ட பகுதி: மண்டலம் 01 (வடகிழக்கு பகுதி)",
                "detectedAt": "கண்டறியப்பட்ட நேரம்: {time}",
                "risk": "இடர் நிலை: மிதமானது",
                "instruction": "அதிக விழிப்புணர்வுடன் பணிகளைத் தொடரலாம். பாதுகாப்பு வழிகாட்டுதல்களைப் பின்பற்றி விழிப்புடன் இருங்கள்.",
                "viewMap": "பாதிக்கப்பட்ட பகுதியைக் காண்க"
            },
            "criticalCard": {
                "badge": "தீவிர எச்சரிக்கை",
                "desc": "உங்கள் பகுதியில் தரை உறுதியற்ற தன்மை கண்டறியப்பட்டுள்ளது.",
                "affectedArea": "பாதிக்கப்பட்ட பகுதி: மண்டலம் 01 (மத்திய குவாரி / வடகிழக்கு சுவர்)",
                "detectedAt": "கண்டறியப்பட்ட நேரம்: {time}",
                "risk": "தற்போதைய இடர் நிலை: அதிகம் (தீவிர அபாயம்)",
                "instructionTitle": "சுரங்கப் பாதுகாப்பு வழிமுறைகளைப் பின்பற்றவும்",
                "instruction": "உடனடியாக வேலையை நிறுத்துங்கள். நியமிக்கப்பட்ட பாதுகாப்பான கூடும் இடத்திற்குச் செல்லுங்கள்.",
                "viewRoute": "பாதுகாப்பான வெளியேற்றப் பாதையைக் காண்க",
                "seenAlert": "இந்த எச்சரிக்கையை நான் பார்த்துவிட்டேன்",
                "seenSuccess": "எச்சரிக்கை ஏற்பு பதிவு செய்யப்பட்டது. அமைதியாக வெளியேறுங்கள்."
            },
            "evacuationModal": {
                "title": "அவசர வெளியேற்ற பாதை வரைபடம்",
                "subtitle": "மண்டலம் 01 முதல் கூடும் இடம் A வரையிலான பாதுகாப்பான பாதை",
                "yourLocation": "உங்கள் தற்போதைய இடம் (மண்டலம் 01)",
                "dangerZone": "அபாய மண்டலம் (சுவர் சரிவு பகுதி)",
                "safePath": "நியமிக்கப்பட்ட பாதுகாப்பான பாதை (சரிவு 2)",
                "assemblyPoint": "கூடும் இடம் A (பாதுகாப்பு கூடம்)",
                "step1": "1. இயந்திர செயல்பாட்டை நிறுத்திவிட்டு சுற்றளவைப் பாதுகாக்கவும்.",
                "step2": "2. சரிவு 2 வழியே பச்சை நிற பாதுகாப்பு வழிகாட்டிகளைப் பின்தொடரவும்.",
                "step3": "3. சிவப்பு நிற எல்லைக் கோட்டைத் தாண்ட வேண்டாம்.",
                "step4": "4. கூடும் இடம் A-ல் உள்ள பாதுகாப்பு அதிகாரியிடம் வருகையைப் பதிவு செய்யவும்.",
                "close": "வரைபடத்தை மூடு"
            },
            "updatesPage": {
                "title": "சுரங்க பாதுகாப்பு புதுப்பிப்புகள்",
                "subtitle": "தள பாதுகாப்பு மையத்திலிருந்து நேரடி ஒளிபரப்பு",
                "filterAll": "அனைத்து புதுப்பிப்புகளும்",
                "filterAlerts": "எச்சரிக்கைகள் மட்டும்",
                "filterSafety": "பாதுகாப்பு ஆலோசனைகள்",
                "filterSystem": "கணினி சோதனைகள்"
            },
            "safetyTipsPage": {
                "title": "சுரங்க பாதுகாப்பு வழிகாட்டுதல்கள் & நெறிமுறைகள்",
                "subtitle": "திறந்தவெளி மற்றும் நிலத்தடி பணியாளர்களுக்கான அத்தியாவசிய முன்னெச்சரிக்கைகள்",
                "alertPillar": "விழிப்புடன் இருங்கள்",
                "responsiblePillar": "பொறுப்புடன் இருங்கள்",
                "safePillar": "பாதுகாப்பாக இருங்கள்",
                "precautionsTitle": "நிலையான பாதுகாப்பு முன்னெச்சரிக்கைகள்",
                "emergencyProcedureTitle": "அவசரக்கால நடவடிக்கை செயல்முறை (6 படிகள்)",
                "steps": [
                    "1. எச்சரிக்கை சைரன் அல்லது ஆப் எச்சரிக்கை ஒலித்தவுடன் உடனடியாக வேலையை நிறுத்துங்கள்.",
                    "2. அமைதியாக இருங்கள் மற்றும் சக பணியாளர்களுடன் தொடர்பில் இருங்கள்.",
                    "3. உயரமான சுவர்கள் மற்றும் நிலையற்ற விளிம்புகளிலிருந்து விலகிச் செல்லுங்கள்.",
                    "4. பச்சை நிற அவசர வெளியேற்றப் பாதையைப் பின்தொடரவும்.",
                    "5. கூடும் இடம் A / நியமிக்கப்பட்ட பாதுகாப்பு மையத்தை அடையுங்கள்.",
                    "6. பாதுகாப்பு அதிகாரிகளின் அறிவுறுத்தல்களைப் பின்பற்றி வருகையைப் பதிவு செய்யுங்கள்."
                ]
            },
            "profilePage": {
                "title": "பணியாளர் சுயவிவரம்",
                "name": "கார்த்திக் எஸ்",
                "role": "சுரங்கத் தொழிலாளி (கனரக இயந்திர ஆபரேட்டர்)",
                "empId": "பணியாளர் எண்",
                "dept": "துறை",
                "mine": "ஒதுக்கப்பட்ட சுரங்கம்",
                "zone": "ஒதுக்கப்பட்ட மண்டலம்",
                "phone": "தொலைபேசி எண்",
                "emergencyContact": "அவசர தொடர்பு",
                "language": "பயன்பாட்டு மொழி",
                "notifications": "புஷ் அறிவிப்புகள்",
                "smsAlerts": "அவசர SMS அறிவிப்புகள்",
                "editProfile": "சுயவிவரத்தைத் திருத்து",
                "emergencyCall": "பாதுகாப்பு அதிகாரியை அழைக்கவும்",
                "logout": "வெளியேறு"
            },
            "offline": {
                "banner": "இணைய இணைப்பு இல்லை. ஆஃப்லைன் பாதுகாப்பான பயன்முறையில் இயங்குகிறது. {time} நேரத்தின் தரவு காட்டப்படுகிறது."
            }
        }
    },
    "hi": {
        "common": {
            "save": "सहेजें",
            "cancel": "रद्द करें",
            "close": "बंद करें",
            "loading": "लोड हो रहा है...",
            "online": "ऑनलाइन",
            "offline": "ऑफ़लाइन",
            "acknowledge": "स्वीकार करें",
            "all": "सभी",
            "you": "आप",
            "reset": "रीसेट",
            "details": "विवरण",
            "actions": "कार्रवाई",
            "back": "पीछे जाएं",
            "submit": "जमा करें",
            "status": "स्थिति",
            "active": "सक्रिय",
            "inactive": "निष्क्रिय"
        },
        "dashboard": {
            "dashboard": "डैशबोर्ड",
            "overview": "अवलोकन",
            "monitoring": "लाइव निगरानी",
            "riskLevel": "भू-तकनीकी जोखिम स्तर",
            "activeSensors": "सक्रिय सेंसर",
            "lastUpdated": "अंतिम अद्यतन",
            "title": "MineGuard AI डैशबोर्ड",
            "systemStatus": "सिस्टम स्थिति"
        },
        "map": {
            "map": "खदान मानचित्र",
            "title": "3D उपग्रह खदान धंसाव मानचित्र",
            "legend": "मानचित्र संकेत",
            "satellite": "उपग्रह दृश्य",
            "terrain": "खदान स्थलाकृति / ढलान",
            "sensors": "सेंसर",
            "insar": "InSAR रडार",
            "riskZones": "जोखिम क्षेत्र",
            "evacuationRoute": "सुरक्षित निकासी मार्ग",
            "assemblyPoint": "सुरक्षित एकत्रण स्थल A",
            "workerLocation": "आपकी वर्तमान स्थिति",
            "fullscreen": "पूर्ण स्क्रीन",
            "minimize": "छोटा करें / संक्षिप्त करें",
            "expand": "मानचित्र विस्तृत करें",
            "collapse": "मानचित्र संक्षिप्त करें",
            "restore": "सामान्य दृश्य",
            "maximize": "पूर्ण स्क्रीन देखें",
            "zoomIn": "बड़ा करें",
            "zoomOut": "छोटा करें",
            "resetView": "दृश्य रीसेट करें",
            "layerSatellite": "उपग्रह दृश्य",
            "layerTopographic": "खदान स्थलाकृति / ढलान",
            "layerHeatmap": "विरूपण हीटमैप",
            "safeZone": "स्थिर क्षेत्र",
            "warningZone": "चेतावनी परिधि",
            "criticalZone": "सक्रिय अस्थिरता क्षेत्र",
            "zoneLabel": "मल्टी-ज़ोन ओपन पिट",
            "realNode": "IoT नोड (BNO055 + ADXL-345 + VL53L0X)",
            "simulatedNode": "IoT नोड (BNO055 + ADXL-345 + VL53L0X)"
        },
        "sensor": {
            "sensor": "सेंसर",
            "sensors": "सेंसर",
            "node": "IoT नोड",
            "temperature": "तापमान",
            "humidity": "आर्द्रता",
            "vibration": "कंपन",
            "acceleration": "त्वरण",
            "battery": "बैटरी",
            "signal": "सिग्नल (RSSI)",
            "status": "स्थिति",
            "lastUpdated": "अंतिम अद्यतन",
            "displacement": "विस्थापन",
            "tilt": "झुकाव",
            "pitch": "पिच",
            "roll": "रोल",
            "yaw": "यॉ",
            "normal": "सामान्य",
            "warning": "चेतावनी",
            "critical": "गंभीर",
            "offline": "ऑफ़लाइन",
            "laser": "VL53L0X लेज़र",
            "crackGrowth": "दरार वृद्धि",
            "lastHeartbeat": "अंतिम सिग्नल"
        },
        "sensors": {
            "tableTitle": "लाइव सेंसर टेलीमेट्री",
            "nodeCol": "नोड",
            "provenanceCol": "प्रकार",
            "tiltXCol": "झुकाव X",
            "tiltYCol": "झुकाव Y",
            "tiltRateCol": "झुकाव दर",
            "displacementCol": "विस्थापन",
            "displacementRateCol": "विस्थापन दर",
            "crackGrowthCol": "दरार वृद्धि",
            "statusCol": "स्थिति",
            "batteryCol": "बैटरी",
            "signalCol": "सिग्नल (RSSI)",
            "lastUpdateCol": "अंतिम सिग्नल"
        },
        "risk": {
            "safe": "सुरक्षित",
            "warning": "चेतावनी",
            "critical": "गंभीर",
            "low": "कम जोखिम",
            "medium": "मध्यम जोखिम",
            "high": "उच्च जोखिम",
            "title": "भू-तकनीकी जोखिम स्तर",
            "subTitle": "मशीन लर्निंग रिस्क इंजन द्वारा गणना की गई",
            "scoreLabel": "जोखिम संभावना सूचकांक",
            "safeLabel": "सुरक्षित (0 - 40%)",
            "warningLabel": "चेतावनी (41 - 80%)",
            "criticalLabel": "गंभीर (81 - 100%)"
        },
        "alerts": {
            "alert": "अलर्ट",
            "warning": "चेतावनी",
            "criticalAlert": "गंभीर अलर्ट",
            "acknowledge": "स्वीकार करें",
            "emergency": "आपातकाल",
            "alertAcknowledged": "अलर्ट स्वीकृत",
            "recentTitle": "हालिया घटना एवं इवेंट लॉग",
            "viewAll": "सभी लॉग देखें",
            "timeCol": "समय",
            "nodeCol": "नोड",
            "eventCol": "घटना विवरण",
            "severityCol": "गंभीरता",
            "actionCol": "कार्रवाई",
            "acknowledgedBadge": "स्वीकृत",
            "criticalBannerTitle": "गंभीर अलर्ट!",
            "criticalBannerDesc": "नोड 01 (ज़ोन 01) विस्थापन सुरक्षित सीमा से अधिक (12.4 मिमी)।",
            "viewDetails": "विवरण देखें",
            "dismiss": "खारिज करें",
            "ackSuccess": "अलर्ट को खदान प्रशासक द्वारा {time} पर स्वीकार किया गया।"
        },
        "insar": {
            "insar": "Sentinel-1 InSAR",
            "subsidence": "धंसाव / भूमि अवतलन",
            "displacement": "भूमि विस्थापन",
            "deformation": "विरूपण",
            "rate": "धंसाव दर",
            "mmPerYear": "मिमी/वर्ष",
            "title": "उपग्रह InSAR संचयी भूमि बदलाव",
            "cumulativeShift": "संचयी बदलाव"
        },
        "brand": {
            "name": "MineGuard AI",
            "tagline": "सुरक्षित खदानें। बेहतर कल।",
            "slogan": "निगरानी • पूर्वानुमान • रोकथाम",
            "hackathon": "Smart India Hackathon 2026 प्रोटोटाइप"
        },
        "nav": {
            "dashboard": "डैशबोर्ड",
            "liveMonitoring": "लाइव निगरानी",
            "mapView": "मानचित्र दृश्य",
            "alerts": "अलर्ट",
            "analytics": "एनालिटिक्स",
            "reports": "रिपोर्ट्स",
            "satellite": "उपग्रह / InSAR",
            "userManagement": "उपयोगकर्ता प्रबंधन",
            "settings": "सेटिंग्स",
            "home": "होम",
            "updates": "अपडेट",
            "safetyTips": "सुरक्षा टिप्स",
            "profile": "मेरी प्रोफ़ाइल"
        },
        "status": {
            "safe": "सुरक्षित",
            "warning": "चेतावनी",
            "critical": "गंभीर",
            "normal": "सामान्य",
            "online": "ऑनलाइन",
            "offline": "ऑफ़लाइन",
            "real": "सक्रिय IoT नोड",
            "simulated": "सक्रिय IoT नोड",
            "acknowledged": "स्वीकृत",
            "unacknowledged": "अस्वीकृत"
        },
        "kpis": {
            "totalNodes": "कुल नोड्स",
            "totalNodesSub": "9 सक्रिय नोड्स • 3 ज़ोन",
            "activeAlerts": "सक्रिय अलर्ट",
            "activeAlertsSub": "{warning} चेतावनी • {critical} गंभीर",
            "systemStatus": "सिस्टम स्थिति",
            "systemStatusSub": "सभी सेवाएं सुचारू रूप से चल रही हैं",
            "riskZones": "जोखिम क्षेत्र",
            "riskZonesSub": "{total} में से {risk} ज़ोन जोखिम में"
        },
        "analytics": {
            "title": "भू-तकनीकी एनालिटिक्स और रुझान सीमाएं",
            "displacementTrend": "विस्थापन बनाम सुरक्षा सीमा (मिमी)",
            "tiltTrend": "त्रि-अक्षीय झुकाव वैक्टर (डिग्री)",
            "riskTrend": "ML रिस्क इंजन प्रक्षेपवक्र (%)",
            "satelliteTrend": "उपग्रह InSAR संचयी भूमि बदलाव (मिमी)",
            "safeThreshold": "सुरक्षित सीमा (3.0 मिमी)",
            "warningThreshold": "चेतावनी सीमा (8.0 मिमी)",
            "criticalThreshold": "गंभीर सीमा (12.0 मिमी)",
            "timeRange": "पिछले 12 घंटे"
        },
        "aiInsight": {
            "title": "AI भू-तकनीकी अंतर्दृष्टि",
            "summaryTitle": "LLM संश्लेषण और व्याख्या",
            "actionsTitle": "अनुशंसित निवारण उपाय",
            "generatedAt": "{time} पर उत्पन्न",
            "confidence": "संश्लेषण विश्वसनीयता: {score}%",
            "disclaimer": "सूचना: भू-तकनीकी जोखिम स्कोर ML रिस्क इंजन द्वारा गणना किए जाते हैं। LLM योग्य सुरक्षा कर्मियों की सहायता के लिए संदर्भ उत्पन्न करता है।"
        },
        "demo": {
            "controllerTitle": "SIH मूल्यांकन डेमो नियंत्रक",
            "safeBtn": "सामान्य (सुरक्षित 18%)",
            "warningBtn": "चेतावनी सिमुलेशन (76%)",
            "criticalBtn": "गंभीर सिमुलेशन (91%)",
            "resetBtn": "परिदृश्य रीसेट करें"
        },
        "user": {
            "greeting": "नमस्ते, {name}",
            "staySafe": "आज सुरक्षित रहें!",
            "amISafe": "क्या मैं सुरक्षित हूँ?",
            "safeCard": {
                "title": "खदान सुरक्षित है",
                "desc": "निगरानी किए जा रहे सभी क्षेत्र वर्तमान में स्थिर हैं।",
                "mine": "माइन साइट अल्फा",
                "zone": "ज़ोन 01 (उत्तर-पूर्व खंड)",
                "lastUpdated": "अंतिम अद्यतन",
                "systemStatus": "निगरानी स्थिति: ऑनलाइन",
                "viewMap": "खदान मानचित्र देखें",
                "reminder": "आपकी सुरक्षा जागरूकता खदान को सभी के लिए सुरक्षित बनाती है।"
            },
            "warningCard": {
                "badge": "सावधान रहें",
                "desc": "आपके खदान क्षेत्र में कुछ भूगर्भीय परिवर्तन देखे गए हैं।",
                "affectedArea": "प्रभावित क्षेत्र: ज़ोन 01 (उत्तर-पूर्व खंड)",
                "detectedAt": "पता चला: {time}",
                "risk": "जोखिम स्तर: मध्यम",
                "instruction": "बढ़ी हुई सतर्कता के साथ काम जारी रखा जा सकता है। सुरक्षा दिशानिर्देशों का पालन करें।",
                "viewMap": "प्रभावित क्षेत्र देखें"
            },
            "criticalCard": {
                "badge": "गंभीर अलर्ट",
                "desc": "आपके क्षेत्र में भूमि अस्थिरता का पता चला है।",
                "affectedArea": "प्रभावित क्षेत्र: ज़ोन 01 (सेंट्रल पिट / उत्तर-पूर्व दीवार)",
                "detectedAt": "पता चला: {time}",
                "risk": "वर्तमान जोखिम स्तर: उच्च (गंभीर)",
                "instructionTitle": "खदान सुरक्षा निर्देशों का पालन करें",
                "instruction": "काम तुरंत रोकें। निर्दिष्ट सुरक्षित एकत्रण क्षेत्र में जाएं।",
                "viewRoute": "सुरक्षित निकासी मार्ग देखें",
                "seenAlert": "मैंने यह अलर्ट देख लिया है",
                "seenSuccess": "अलर्ट पावती दर्ज की गई। शांतिपूर्वक निकासी करें।"
            },
            "evacuationModal": {
                "title": "आपातकालीन निकासी मार्ग मानचित्र",
                "subtitle": "ज़ोन 01 से असेंबली पॉइंट A तक सुरक्षित गलियारा",
                "yourLocation": "आपकी वर्तमान स्थिति (ज़ोन 01)",
                "dangerZone": "खतरे का क्षेत्र (दीवार ढलान विफलता क्षेत्र)",
                "safePath": "निर्दिष्ट सुरक्षित गलियारा (रैंप 2)",
                "assemblyPoint": "असेंबली पॉइंट A (सुरक्षित आश्रय)",
                "step1": "1. मशीनरी संचालन बंद करें और तत्काल क्षेत्र को सुरक्षित करें।",
                "step2": "2. रैंप 2 के साथ लगे हरे सुरक्षा बीकन का पालन करें।",
                "step3": "3. लाल रेखा को पार न करें।",
                "step4": "4. असेंबली पॉइंट A पर सुरक्षा वार्डन को अपनी उपस्थिति दर्ज कराएं।",
                "close": "मानचित्र बंद करें"
            },
            "updatesPage": {
                "title": "खदान सुरक्षा अपडेट",
                "subtitle": "साइट सुरक्षा केंद्र से सीधा प्रसारण",
                "filterAll": "सभी अपडेट",
                "filterAlerts": "केवल अलर्ट",
                "filterSafety": "सुरक्षा परामर्श",
                "filterSystem": "सिस्टम जांच"
            },
            "safetyTipsPage": {
                "title": "खदान सुरक्षा दिशानिर्देश और प्रोटोकॉल",
                "subtitle": "ओपन-कास्ट और भूमिगत कर्मियों के लिए आवश्यक सावधानियां",
                "alertPillar": "सतर्क रहें",
                "responsiblePillar": "जिम्मेदार बनें",
                "safePillar": "सुरक्षित रहें",
                "precautionsTitle": "मानक सुरक्षा सावधानियां",
                "emergencyProcedureTitle": "आपातकालीन कार्रवाई प्रक्रिया (6 चरण)",
                "steps": [
                    "1. चेतावनी सायरन या ऐप अलर्ट बजते ही काम तुरंत रोक दें।",
                    "2. शांत रहें और सहकर्मियों के साथ दृश्य संपर्क बनाए रखें।",
                    "3. ऊंची दीवारों और अस्थिर किनारों से दूर हट जाएं।",
                    "4. निर्दिष्ट हरे आपातकालीन निकासी मार्ग का पालन करें।",
                    "5. असेंबली पॉइंट A / निर्दिष्ट सुरक्षित क्षेत्र में पहुंचें।",
                    "6. सुरक्षा वार्डन के निर्देशों का पालन करें और अपनी उपस्थिति दर्ज कराएं।"
                ]
            },
            "profilePage": {
                "title": "कर्मचारी प्रोफ़ाइल",
                "name": "कार्तिक एस",
                "role": "खदान कार्यकर्ता (भारी मशीनरी ऑपरेटर)",
                "empId": "कर्मचारी आईडी",
                "dept": "विभाग",
                "mine": "आवंटित खदान",
                "zone": "आवंटित ज़ोन",
                "phone": "संपर्क फ़ोन",
                "emergencyContact": "आपातकालीन संपर्क",
                "language": "ऐप भाषा",
                "notifications": "पुश सूचनाएं",
                "smsAlerts": "आपातकालीन SMS प्रसारण",
                "editProfile": "प्रोफ़ाइल संपादित करें",
                "emergencyCall": "सुरक्षा अधिकारी हेल्पलाइन पर कॉल करें",
                "logout": "साइन आउट"
            },
            "offline": {
                "banner": "कनेक्शन उपलब्ध नहीं है। ऑफ़लाइन सुरक्षित मोड में काम कर रहा है। {time} की स्थिति दिखाई जा रही है।"
            }
        }
    }
}

# Add remaining Indian languages
languages_meta = {
    "te": {
        "common": {"save": "భద్రపరచు", "cancel": "రద్దు చేయి", "close": "మూసివేయి", "loading": "లోడ్ అవుతోంది...", "online": "ఆన్‌లైన్", "offline": "ఆఫ్‌లైన్", "acknowledge": "ధృవీకరించు", "all": "అన్నీ", "you": "మీరు", "reset": "రీసెట్", "details": "వివరాలు", "actions": "చర్యలు", "back": "వెనుకకు", "submit": "సమర్పించు", "status": "స్థితి", "active": "చురుకైన", "inactive": "నిష్క్రియ"},
        "dashboard": {"dashboard": "డాష్‌బోర్డ్", "overview": "అవలోకనం", "monitoring": "లైవ్ పర్యవేక్షణ", "riskLevel": "భౌగోళిక సాంకేతిక ప్రమాద స్థాయి", "activeSensors": "క్రియాశీల సెన్సార్లు", "lastUpdated": "చివరిగా నవీకరించబడింది", "title": "MineGuard AI డాష్‌బోర్డ్", "systemStatus": "సిస్టమ్ స్థితి"},
        "map": {"map": "గని మ్యాప్", "title": "3D ఉపగ్రహ గని కుంగుబాటు మ్యాప్", "legend": "మ్యాప్ లెజెండ్", "satellite": "ఉపగ్రహ వీక్షణ", "terrain": "గని స్థలాకృతి / వాలు", "sensors": "సెన్సార్లు", "insar": "InSAR రాడార్", "riskZones": "ప్రమాద మండలాలు", "evacuationRoute": "సురక్షిత తరలింపు మార్గం", "assemblyPoint": "అసెంబ్లీ పాయింట్ A", "workerLocation": "మీ ప్రస్తుత స్థానం", "fullscreen": "పూర్తి స్క్రీన్", "minimize": "కుదించు", "expand": "మ్యాప్‌ను విస్తరించు", "collapse": "మ్యాప్‌ను కుదించు", "restore": "సాధారణ వీక్షణ", "maximize": "పూర్తి స్క్రీన్ వీక్షణ", "zoomIn": "జూమ్ ఇన్", "zoomOut": "జూమ్ అవుట్", "resetView": "వీక్షణను రీసెట్ చేయి", "layerSatellite": "ఉపగ్రహ వీక్షణ", "layerTopographic": "గని స్థలాకృతి / వాలు", "layerHeatmap": "రూపాంతరణ హీట్‌మ్యాప్", "safeZone": "సురక్షిత మండలం", "warningZone": "హెచ్చరిక పరిధి", "criticalZone": "తీవ్ర ప్రమాద విభాగం", "zoneLabel": "బహుళ-మండల ఓపెన్ పిట్", "realNode": "IoT నోడ్ (BNO055 + ADXL-345 + VL53L0X)", "simulatedNode": "IoT నోడ్ (BNO055 + ADXL-345 + VL53L0X)"},
        "sensor": {"sensor": "సెన్సార్", "sensors": "సెన్సార్లు", "node": "IoT నోడ్", "temperature": "ఉష్ణోగ్రత", "humidity": "తేమ", "vibration": "కంపనం", "acceleration": "త్వరణం", "battery": "బ్యాటరీ", "signal": "సిగ్నల్ (RSSI)", "status": "స్థితి", "lastUpdated": "చివరిగా నవీకరించబడింది", "displacement": "స్థానభ్రంశం", "tilt": "వంపు", "pitch": "పిచ్", "roll": "రోల్", "yaw": "యా", "normal": "సాధారణం", "warning": "హెచ్చరిక", "critical": "తీవ్ర ప్రమాదం", "offline": "ఆఫ్‌లైన్", "laser": "VL53L0X లేజర్", "crackGrowth": "పగుళ్ల పెరుగుదల", "lastHeartbeat": "చివరి సిగ్నల్"},
        "risk": {"safe": "సురక్షితం", "warning": "హెచ్చరిక", "critical": "ప్రమాదకరం", "low": "తక్కువ ప్రమాదం", "medium": "మధ్యస్థ ప్రమాదం", "high": "అధిక ప్రమాదం", "title": "భౌగోళిక సాంకేతిక ప్రమాద స్థాయి", "subTitle": "ML రిస్క్ ఇంజిన్ ద్వారా లెక్కించబడింది", "scoreLabel": "ప్రమాద సంభావ్యత సూచిక", "safeLabel": "సురక్షితం (0 - 40%)", "warningLabel": "హెచ్చరిక (41 - 80%)", "criticalLabel": "ప్రమాదకరం (81 - 100%)"},
        "alerts": {"alert": "హెచ్చరిక", "warning": "హెచ్చరిక", "criticalAlert": "తీవ్ర హెచ్చరిక", "acknowledge": "ధృవీకరించు", "emergency": "అత్యవసరం", "alertAcknowledged": "హెచ్చరిక ధృవీకరించబడింది", "recentTitle": "ఇటీవలి సంఘటనలు & లాగ్", "viewAll": "అన్ని లాగ్‌లను వీక్షించండి", "timeCol": "సమయం", "nodeCol": "నోడ్", "eventCol": "ఈవెంట్ వివరణ", "severityCol": "తీవ్రత", "actionCol": "చర్య", "acknowledgedBadge": "ధృవీకరించబడింది", "criticalBannerTitle": "తీవ్ర ప్రమాద హెచ్చరిక!", "criticalBannerDesc": "నోడ్ 01 (జోన్ 01) స్థానభ్రంశం పరిమితిని మించిపోయింది (12.4 mm).", "viewDetails": "వివరాలను చూడండి", "dismiss": "తీసివేయి", "ackSuccess": "హెచ్చరిక మైన్ అడ్మినిస్ట్రేటర్ ద్వారా {time} వద్ద ధృవీకరించబడింది."},
        "insar": {"insar": "Sentinel-1 InSAR", "subsidence": "భూమి కుంగుబాటు", "displacement": "భూమి స్థానభ్రంశం", "deformation": "రూపాంతరం", "rate": "కుంగుబాటు రేటు", "mmPerYear": "మిమీ/సంవత్సరం", "title": "ఉపగ్రహ InSAR సంచిత నేల మార్పు", "cumulativeShift": "సంచిత మార్పు"},
        "brand": {"name": "MineGuard AI", "tagline": "సురక్షితమైన గనులు. మంచి రేపు.", "slogan": "పర్యవేక్షణ • అంచనా • నివారణ", "hackathon": "Smart India Hackathon 2026 నమూనా"},
        "nav": {"dashboard": "డాష్‌బోర్డ్", "liveMonitoring": "లైవ్ పర్యవేక్షణ", "mapView": "మ్యాప్ వీక్షణ", "alerts": "హెచ్చరికలు", "analytics": "విశ్లేషణ", "reports": "నివేదికలు", "satellite": "ఉపగ్రహం / InSAR", "userManagement": "వినియోగదారు నిర్వహణ", "settings": "సెట్టింగ్‌లు", "home": "హోమ్", "updates": "నవీకరణలు", "safetyTips": "భద్రతా చిట్కాలు", "profile": "నా ప్రొఫైల్"}
    },
    "kn": {
        "common": {"save": "ಉಳಿಸಿ", "cancel": "ರದ್ದುಮಾಡಿ", "close": "ಮುಚ್ಚಿ", "loading": "ಲೋಡ್ ಆಗುತ್ತಿದೆ...", "online": "ಆನ್‌ಲೈನ್", "offline": "ಆಫ್‌ಲೈನ್", "acknowledge": "ಸ್ವೀಕರಿಸಿ", "all": "ಎಲ್ಲವೂ", "you": "ನೀವು", "reset": "ಮರುಹೊಂದಿಸಿ", "details": "ವಿವರಗಳು", "actions": "ಕ್ರಮಗಳು", "back": "ಹಿಂದಕ್ಕೆ", "submit": "ಸಲ್ಲಿಸಿ", "status": "ಸ್ಥಿತಿ", "active": "ಸಕ್ರಿಯ", "inactive": "ನಿಷ್ಕ್ರಿಯ"},
        "dashboard": {"dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", "overview": "ಅವಲೋಕನ", "monitoring": "ನೇರ ಮೇಲ್ವಿಚಾರಣೆ", "riskLevel": "ಭೂತಾಂತ್ರಿಕ ಅಪಾಯದ ಮಟ್ಟ", "activeSensors": "ಸಕ್ರಿಯ ಸಂವೇದಕಗಳು", "lastUpdated": "ಕೊನೆಯದಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ", "title": "MineGuard AI ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", "systemStatus": "ವ್ಯವಸ್ಥೆಯ ಸ್ಥಿತಿ"},
        "map": {"map": "ಗಣಿ ನಕ್ಷೆ", "title": "3D ಉಪಗ್ರಹ ಗಣಿ ಕುಸಿತ ನಕ್ಷೆ", "legend": "ನಕ್ಷೆ ವಿವರಣೆ", "satellite": "ಉಪಗ್ರಹ ನೋಟ", "terrain": "ಗಣಿ ಭೂಪ್ರದೇಶ / ಇಳಿಜಾರು", "sensors": "ಸಂವೇದಕಗಳು", "insar": "InSAR ರಾಡಾರ್", "riskZones": "ಅಪಾಯದ ವಲಯಗಳು", "evacuationRoute": "ಸುರಕ್ಷಿತ ಸ್ಥಳಾಂತರ ಮಾರ್ಗ", "assemblyPoint": "ಸಭೆ ಸೇರುವ ಸ್ಥಳ A", "workerLocation": "ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಸ್ಥಳ", "fullscreen": "ಪೂರ್ಣ ಪರದೆ", "minimize": "ಕುಗ್ಗಿಸಿ", "expand": "ನಕ್ಷೆಯನ್ನು ವಿಸ್ತರಿಸಿ", "collapse": "ನಕ್ಷೆಯನ್ನು ಕುಗ್ಗಿಸಿ", "restore": "ಸಾಮಾನ್ಯ ನೋಟ", "maximize": "ಪೂರ್ಣ ಪರದೆ ನೋಡಿ", "zoomIn": "ದೊಡ್ಡದಾಗಿಸಿ", "zoomOut": "ಚಿಕ್ಕದಾಗಿಸಿ", "resetView": "ನೋಟ ಮರುಹೊಂದಿಸಿ", "layerSatellite": "ಉಪಗ್ರಹ ನೋಟ", "layerTopographic": "ಗಣಿ ಭೂಪ್ರದೇಶ / ಇಳಿಜಾರು", "layerHeatmap": "ರೂಪಾಂತರ ಹೀಟ್‌ಮ್ಯಾಪ್", "safeZone": "ಸುರಕ್ಷಿತ ವಲಯ", "warningZone": "ಎಚ್ಚರಿಕೆ ವಲಯ", "criticalZone": "ತೀವ್ರ ಅಪಾಯದ ವಲಯ", "zoneLabel": "ಬಹು-ವಲಯ ಮುಕ್ತ ಗಣಿ", "realNode": "IoT ನೋಡ್ (BNO055 + ADXL-345 + VL53L0X)", "simulatedNode": "IoT ನೋಡ್ (BNO055 + ADXL-345 + VL53L0X)"},
        "sensor": {"sensor": "ಸಂವೇದಕ", "sensors": "ಸಂವೇದಕಗಳು", "node": "IoT ನೋಡ್", "temperature": "ತಾಪಮಾನ", "humidity": "ತೇವಾಂಶ", "vibration": "ಕಂಪನ", "acceleration": "ವೇಗವರ್ಧನೆ", "battery": "ಬ್ಯಾಟರಿ", "signal": "ಸಿಗ್ನಲ್ (RSSI)", "status": "ಸ್ಥಿತಿ", "lastUpdated": "ಕೊನೆಯದಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ", "displacement": "ಸ್ಥಾನಪಲ್ಲಟ", "tilt": "ಓರೆ", "pitch": "ಪಿಚ್", "roll": "ರೋಲ್", "yaw": "ಯಾ", "normal": "ಸಾಮಾನ್ಯ", "warning": "ಎಚ್ಚರಿಕೆ", "critical": "ಗಂಭೀರ", "offline": "ಆಫ್‌ಲೈನ್", "laser": "VL53L0X ಲೇಸರ್", "crackGrowth": "ಬಿರುಕು ಬೆಳವಣಿಗೆ", "lastHeartbeat": "ಕೊನೆಯ ಸಿಗ್ನಲ್"},
        "risk": {"safe": "ಸುರಕ್ಷಿತ", "warning": "ಎಚ್ಚರಿಕೆ", "critical": "ಗಂಭೀರ", "low": "ಕಡಿಮೆ ಅಪಾಯ", "medium": "ಮಧ್ಯಮ ಅಪಾಯ", "high": "ಹೆಚ್ಚಿನ ಅಪಾಯ", "title": "ಭೂತಾಂತ್ರಿಕ ಅಪಾಯದ ಮಟ್ಟ", "subTitle": "ML ರಿಸ್ಕ್ ಎಂಜಿನ್ ಮೂಲಕ ಲೆಕ್ಕಹಾಕಲಾಗಿದೆ", "scoreLabel": "ಅಪಾಯದ ಸಂಭವನೀಯತೆ ಸೂಚ್ಯಂಕ", "safeLabel": "ಸುರಕ್ಷಿತ (0 - 40%)", "warningLabel": "ಎಚ್ಚರಿಕೆ (41 - 80%)", "criticalLabel": "ಗಂಭೀರ (81 - 100%)"},
        "alerts": {"alert": "ಎಚ್ಚರಿಕೆ", "warning": "ಎಚ್ಚರಿಕೆ", "criticalAlert": "ಗಂಭೀರ ಎಚ್ಚರಿಕೆ", "acknowledge": "ಸ್ವೀಕರಿಸಿ", "emergency": "ತುರ್ತುಸ್ಥಿತಿ", "alertAcknowledged": "ಎಚ್ಚರಿಕೆ ಸ್ವೀಕರಿಸಲಾಗಿದೆ", "recentTitle": "ಇತ್ತೀಚಿನ ಘಟನೆಗಳು ಮತ್ತು ಲಾಗ್", "viewAll": "ಎಲ್ಲಾ ಲಾಗ್‌ಗಳನ್ನು ವೀಕ್ಷಿಸಿ", "timeCol": "ಸಮಯ", "nodeCol": "ನೋಡ್", "eventCol": "ಘಟನೆಯ ವಿವರಣೆ", "severityCol": "ತೀವ್ರತೆ", "actionCol": "ಕ್ರಮ", "acknowledgedBadge": "ಸ್ವೀಕರಿಸಲಾಗಿದೆ", "criticalBannerTitle": "ಗಂಭೀರ ಎಚ್ಚರಿಕೆ!", "criticalBannerDesc": "ನೋಡ್ 01 (ವಲಯ 01) ಸ್ಥಾನಪಲ್ಲಟ ಸುರಕ್ಷಿತ ಮಿತಿ ಮೀರಿದೆ (12.4 mm).", "viewDetails": "ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ", "dismiss": "ತಿರಸ್ಕರಿಸಿ", "ackSuccess": "ಎಚ್ಚರಿಕೆಯನ್ನು ಗಣಿ ಆಡಳಿತಾಧಿಕಾರಿ {time} ರಲ್ಲಿ ಸ್ವೀಕರಿಸಿದ್ದಾರೆ."},
        "insar": {"insar": "Sentinel-1 InSAR", "subsidence": "ಭೂಕುಸಿತ / ನೆಲ ಕುಸಿತ", "displacement": "ನೆಲದ ಸ್ಥಾನಪಲ್ಲಟ", "deformation": "ರೂಪಾಂತರ", "rate": "ಕುಸಿತ ದರ", "mmPerYear": "ಮಿಮೀ/ವರ್ಷ", "title": "ಉಪಗ್ರಹ InSAR ಒಟ್ಟು ನೆಲದ ಬದಲಾವಣೆ", "cumulativeShift": "ಒಟ್ಟು ಬದಲಾವಣೆ"},
        "brand": {"name": "MineGuard AI", "tagline": "ಸುರಕ್ಷಿತ ಗಣಿಗಳು. ಉತ್ತಮ ಭವಿಷ್ಯ.", "slogan": "ಮೇಲ್ವಿಚಾರಣೆ • ಮುನ್ಸೂಚನೆ • ತಡೆಗಟ್ಟುವಿಕೆ", "hackathon": "Smart India Hackathon 2026 ಮಾದರಿ"},
        "nav": {"dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", "liveMonitoring": "ನೇರ ಮೇಲ್ವಿಚಾರಣೆ", "mapView": "ನಕ್ಷೆ ನೋಟ", "alerts": "ಎಚ್ಚರಿಕೆಗಳು", "analytics": "ವಿಶ್ಲೇಷಣೆ", "reports": "ವರದಿಗಳು", "satellite": "ಉಪಗ್ರಹ / InSAR", "userManagement": "ಬಳಕೆದಾರರ ನಿರ್ವಹಣೆ", "settings": "ಸಂಯೋಜನೆಗಳು", "home": "ಮುಖಪುಟ", "updates": "ನವೀಕರಣಗಳು", "safetyTips": "ಸುರಕ್ಷತಾ ಸಲಹೆಗಳು", "profile": "ನನ್ನ ವಿವರ"}
    },
    "ml": {
        "common": {"save": "സംരക്ഷിക്കുക", "cancel": "റദ്ദാക്കുക", "close": "അടയ്ക്കുക", "loading": "ലോഡ് ചെയ്യുന്നു...", "online": "ഓൺലൈൻ", "offline": "ഓഫ്‌ലൈൻ", "acknowledge": "അംഗീകരിക്കുക", "all": "എല്ലാം", "you": "നിങ്ങൾ", "reset": "പുനഃക്രമീകരിക്കുക", "details": "വിശദാംശങ്ങൾ", "actions": "നടപടികൾ", "back": "പിന്നോട്ട്", "submit": "സമർപ്പിക്കുക", "status": "നില", "active": "സജീവം", "inactive": "നിഷ്‌ക്രിയം"},
        "dashboard": {"dashboard": "ഡാഷ്‌ബോർഡ്", "overview": "അവലോകനം", "monitoring": "തത്സമയ നിരീക്ഷണം", "riskLevel": "ഭൂസാങ്കേതിക അപകട സാധ്യത", "activeSensors": "സജീവ സെൻസറുകൾ", "lastUpdated": "അവസാനം പുതുക്കിയത്", "title": "MineGuard AI ഡാഷ്‌ബോർഡ്", "systemStatus": "സിസ്റ്റം നില"},
        "map": {"map": "ഖനി ഭൂപടം", "title": "3D ഉപഗ്രഹ ഖനി ഇടിയൽ ഭൂപടം", "legend": "ഭൂപട സൂചിക", "satellite": "ഉപഗ്രഹ കാഴ്ച", "terrain": "ഖനി ഭൂപ്രകൃതി / ചരിവ്", "sensors": "സെൻസറുകൾ", "insar": "InSAR റഡാർ", "riskZones": "അപകട മേഖലകൾ", "evacuationRoute": "സുരക്ഷിത ഒഴിപ്പിക്കൽ പാത", "assemblyPoint": "ഒത്തുചേരൽ കേന്ദ്രം A", "workerLocation": "നിങ്ങളുടെ നിലവിലെ സ്ഥാനം", "fullscreen": "പൂർണ്ണ സ്‌ക്രീൻ", "minimize": "ചെറുതാക്കുക", "expand": "ഭൂപടം വികസിപ്പിക്കുക", "collapse": "ഭൂപടം ചുരുക്കുക", "restore": "സാധാരണ കാഴ്ച", "maximize": "പൂർണ്ണ സ്‌ക്രീൻ കാണുക", "zoomIn": "വലുതാക്കുക", "zoomOut": "ചെറുതാക്കുക", "resetView": "കാഴ്ച പുനഃക്രമീകരിക്കുക", "layerSatellite": "ഉപഗ്രഹ കാഴ്ച", "layerTopographic": "ഭൂപ്രകൃതി / ചരിവ്", "layerHeatmap": "രൂപാന്തര ഹീറ്റ്മാപ്പ്", "safeZone": "സുരക്ഷിത മേഖല", "warningZone": "മുന്നറിയിപ്പ് മേഖല", "criticalZone": "ഗുരുതര അപകട മേഖല", "zoneLabel": "മൾട്ടി-സോൺ ഓപ്പൺ പിറ്റ്", "realNode": "IoT നോഡ് (BNO055 + ADXL-345 + VL53L0X)", "simulatedNode": "IoT നോഡ് (BNO055 + ADXL-345 + VL53L0X)"},
        "sensor": {"sensor": "സെൻസർ", "sensors": "സെൻസറുകൾ", "node": "IoT നോഡ്", "temperature": "താപനില", "humidity": "ഈർപ്പം", "vibration": "കമ്പനം", "acceleration": "ത്വരണം", "battery": "ബാറ്ററി", "signal": "സിഗ്നൽ (RSSI)", "status": "നില", "lastUpdated": "അവസാനം പുതുക്കിയത്", "displacement": "സ്ഥാനചലനം", "tilt": "ചെരിവ്", "pitch": "പിച്ച്", "roll": "റോൾ", "yaw": "യോ", "normal": "സാധാരണം", "warning": "മുന്നറിയിപ്പ്", "critical": "ഗുരുതരം", "offline": "ഓഫ്‌ലൈൻ", "laser": "VL53L0X ലേസർ", "crackGrowth": "വിള്ളൽ വർദ്ധനവ്", "lastHeartbeat": "അവസാന സിഗ്നൽ"},
        "risk": {"safe": "സുരക്ഷിതം", "warning": "മുന്നറിയിപ്പ്", "critical": "അതീവ ഗുരുതരം", "low": "കുറഞ്ഞ അപകടസാധ്യത", "medium": "ഇടത്തരം അപകടസാധ്യത", "high": "ഉയർന്ന അപകടസാധ്യത", "title": "ഭൂസാങ്കേതിക അപകട സാധ്യത", "subTitle": "ML റിസ്ക് എഞ്ചിൻ കണക്കാക്കിയത്", "scoreLabel": "അപകട സാധ്യത സൂചിക", "safeLabel": "സുരക്ഷിതം (0 - 40%)", "warningLabel": "മുന്നറിയിപ്പ് (41 - 80%)", "criticalLabel": "ഗുരുതരം (81 - 100%)"},
        "alerts": {"alert": "മുന്നറിയിപ്പ്", "warning": "മുന്നറിയിപ്പ്", "criticalAlert": "ഗുരുതര മുന്നറിയിപ്പ്", "acknowledge": "അംഗീകരിക്കുക", "emergency": "അടിയന്തരാവസ്ഥ", "alertAcknowledged": "മുന്നറിയിപ്പ് അംഗീകരിച്ചു", "recentTitle": "സമീപകാല സംഭവങ്ങൾ & ലോഗ്", "viewAll": "എല്ലാ ലോഗുകളും കാണുക", "timeCol": "സമയം", "nodeCol": "നോഡ്", "eventCol": "സംഭവ വിവരണം", "severityCol": "തീവ്രത", "actionCol": "നടപടി", "acknowledgedBadge": "അംഗീകരിച്ചു", "criticalBannerTitle": "ഗുരുതര മുന്നറിയിപ്പ്!", "criticalBannerDesc": "നോഡ് 01 (മേഖല 01) സ്ഥാനചലനം സുരക്ഷിത പരിധി കവിഞ്ഞു (12.4 mm).", "viewDetails": "വിശദാംശങ്ങൾ കാണുക", "dismiss": "നിരസിക്കുക", "ackSuccess": "മുന്നറിയിപ്പ് ഖനി അഡ്മിനിസ്ട്രേറ്റർ {time}-ൽ അംഗീകരിച്ചു."},
        "insar": {"insar": "Sentinel-1 InSAR", "subsidence": "ഭൂമി ഇടിയൽ / താഴ്ന്നുപോകൽ", "displacement": "ഭൂമി സ്ഥാനചലനം", "deformation": "രൂപാന്തരം", "rate": "ഇടിയൽ നിരക്ക്", "mmPerYear": "മിമി/വർഷം", "title": "ഉപഗ്രഹ InSAR ഭൂമി വ്യതിയാനം", "cumulativeShift": "മൊത്തം മാറ്റം"},
        "brand": {"name": "MineGuard AI", "tagline": "സുരക്ഷിത ഖനികൾ. മികച്ച നാളെ.", "slogan": "നിരീക്ഷിക്കുക • പ്രവചിക്കുക • തടയുക", "hackathon": "Smart India Hackathon 2026 മാതൃക"},
        "nav": {"dashboard": "ഡാഷ്‌ബോർഡ്", "liveMonitoring": "തത്സമയ നിരീക്ഷണം", "mapView": "ഭൂപട കാഴ്ച", "alerts": "മുന്നറിയിപ്പുകൾ", "analytics": "അനലിറ്റിക്സ്", "reports": "റിപ്പോർട്ടുകൾ", "satellite": "ഉപഗ്രഹം / InSAR", "userManagement": "ഉപയോക്തൃ മാനേജ്മെന്റ്", "settings": "ക്രമീകരണങ്ങൾ", "home": "ഹോം", "updates": "അപ്‌ഡേറ്റുകൾ", "safetyTips": "സുരക്ഷാ നിർദ്ദേശങ്ങൾ", "profile": "എന്റെ പ്രൊഫൈൽ"}
    },
    "bn": {
        "common": {"save": "সংরক্ষণ করুন", "cancel": "বাতিল", "close": "বন্ধ করুন", "loading": "লোড হচ্ছে...", "online": "অনলাইন", "offline": "অফলাইন", "acknowledge": "স্বীকার করুন", "all": "সমস্ত", "you": "আপনি", "reset": "রিসেট", "details": "বিবরণ", "actions": "পদক্ষেপ", "back": "পিছনে", "submit": "জমা দিন", "status": "অবস্থা", "active": "সক্রিয়", "inactive": "নিষ্ক্রিয়"},
        "dashboard": {"dashboard": "ড্যাশবোর্ড", "overview": "সংক্ষিপ্ত বিবরণ", "monitoring": "লাইভ নজরদারি", "riskLevel": "ভূ-প্রযুক্তিগত ঝুঁকির স্তর", "activeSensors": "সক্রিয় সেন্সর", "lastUpdated": "সর্বশেষ আপডেট", "title": "MineGuard AI ড্যাশবোর্ড", "systemStatus": "সিস্টেমের অবস্থা"},
        "map": {"map": "খনি মানচিত্র", "title": "3D স্যাটেলাইট খনি ধস মানচিত্র", "legend": "মানচিত্রের নির্দেশিকা", "satellite": "স্যাটেলাইট দৃশ্য", "terrain": "ভূমিরূপ / ঢাল", "sensors": "সেন্সর", "insar": "InSAR রাডার", "riskZones": "ঝুঁকিপূর্ণ এলাকা", "evacuationRoute": "নিরাপদ স্থানান্তর পথ", "assemblyPoint": "সমাবেশস্থল A", "workerLocation": "আপনার বর্তমান অবস্থান", "fullscreen": "ফুলস্ক্রিন", "minimize": "সংক্ষিপ্ত করুন", "expand": "মানচিত্র সম্প্রসারণ করুন", "collapse": "মানচিত্র সংক্ষিপ্ত করুন", "restore": "স্বাভাবিক দৃশ্য", "maximize": "ফুলস্ক্রিন দেখুন", "zoomIn": "জুম ইন", "zoomOut": "জুম আউট", "resetView": "ভিউ রিসেট করুন", "layerSatellite": "স্যাটেলাইট ভিউ", "layerTopographic": "ভূমিরূপ / ঢাল", "layerHeatmap": "বিকৃতি হিটম্যাপ", "safeZone": "নিরাপদ এলাকা", "warningZone": "সতর্কতা এলাকা", "criticalZone": "সংকটজনক এলাকা", "zoneLabel": "মাল্টি-জোন ওপেন পিট", "realNode": "IoT নোড (BNO055 + ADXL-345 + VL53L0X)", "simulatedNode": "IoT নোড (BNO055 + ADXL-345 + VL53L0X)"},
        "sensor": {"sensor": "সেন্সর", "sensors": "সেন্সরসমূহ", "node": "IoT নোড", "temperature": "তাপমাত্রা", "humidity": "আর্দ্রতা", "vibration": "কম্পন", "acceleration": "ত্বরণ", "battery": "ব্যাটারি", "signal": "সিগন্যাল (RSSI)", "status": "অবস্থা", "lastUpdated": "সর্বশেষ আপডেট", "displacement": "স্থানচ্যুতি", "tilt": "ঢাল / প্রবণতা", "pitch": "পিচ", "roll": "রোল", "yaw": "ইয়ো", "normal": "স্বাভাবিক", "warning": "সতর্কতা", "critical": "সংকটজনক", "offline": "অফলাইন", "laser": "VL53L0X লেজার", "crackGrowth": "ফাটল বৃদ্ধি", "lastHeartbeat": "সর্বশেষ সিগন্যাল"},
        "risk": {"safe": "নিরাপদ", "warning": "সতর্কতা", "critical": "সংকটজনক", "low": "কম ঝুঁকি", "medium": "মাঝারি ঝুঁকি", "high": "উচ্চ ঝুঁকি", "title": "ভূ-প্রযুক্তিগত ঝুঁকির স্তর", "subTitle": "ML ঝুঁকি ইঞ্জিন দ্বারা গণনা করা হয়েছে", "scoreLabel": "ঝুঁকির সম্ভাবনা সূচক", "safeLabel": "নিরাপদ (0 - 40%)", "warningLabel": "সতর্কতা (41 - 80%)", "criticalLabel": "সংকটজনক (81 - 100%)"},
        "alerts": {"alert": "সতর্কবার্তা", "warning": "সতর্কতা", "criticalAlert": "সংকটজনক সতর্কবার্তা", "acknowledge": "স্বীকার করুন", "emergency": "জরুরি অবস্থা", "alertAcknowledged": "সতর্কবার্তা গৃহীত হয়েছে", "recentTitle": "সাম্প্রতিক ঘটনা ও লগ", "viewAll": "সমস্ত লগ দেখুন", "timeCol": "সময়", "nodeCol": "নোড", "eventCol": "ঘটনার বিবরণ", "severityCol": "তীব্রতা", "actionCol": "পদক্ষেপ", "acknowledgedBadge": "গৃহীত", "criticalBannerTitle": "সংকটজনক সতর্কবার্তা!", "criticalBannerDesc": "নোড 01 (জোন 01) স্থানচ্যুতি নিরাপদ সীমা অতিক্রম করেছে (12.4 মিমি)।", "viewDetails": "বিস্তারিত দেখুন", "dismiss": "খারিজ করুন", "ackSuccess": "সতর্কবার্তাটি খনি প্রশাসক কর্তৃক {time} এ স্বীকৃত হয়েছে।"},
        "insar": {"insar": "Sentinel-1 InSAR", "subsidence": "ভূমি অবনমন / ধস", "displacement": "ভূমি স্থানচ্যুতি", "deformation": "বিকৃতি", "rate": "ধসের হার", "mmPerYear": "মিমি/বছর", "title": "স্যাটেলাইট InSAR ক্রমবর্ধমান স্থান পরিবর্তন", "cumulativeShift": "ক্রমবর্ধমান পরিবর্তন"},
        "brand": {"name": "MineGuard AI", "tagline": "নিরাপদ খনি। উজ্জ্বল ভবিষ্যৎ।", "slogan": "নজরদারি • পূর্বাভাস • প্রতিরোধ", "hackathon": "Smart India Hackathon 2026 প্রোটোটাইপ"},
        "nav": {"dashboard": "ড্যাশবোর্ড", "liveMonitoring": "লাইভ নজরদারি", "mapView": "মানচিত্র দৃশ্য", "alerts": "সতর্কতা", "analytics": "বিশ্লেষণ", "reports": "প্রতিবেদন", "satellite": "স্যাটেলাইট / InSAR", "userManagement": "ব্যবহারকারী ব্যবস্থাপনা", "settings": "সেটিংস", "home": "হোম", "updates": "আপডেট", "safetyTips": "সুরক্ষা টিপস", "profile": "আমার প্রোফাইল"}
    },
    "mr": {
        "common": {"save": "जतन करा", "cancel": "रद्द करा", "close": "बंद करा", "loading": "लोड होत आहे...", "online": "ऑनलाइन", "offline": "ऑफलाइन", "acknowledge": "स्वीकारा", "all": "सर्व", "you": "तुम्ही", "reset": "रीसेट करा", "details": "तपशील", "actions": "कृती", "back": "मागे", "submit": "प्रस्तुत करा", "status": "स्थिती", "active": "सक्रिय", "inactive": "निष्क्रिय"},
        "dashboard": {"dashboard": "डॅशबोर्ड", "overview": "आढावा", "monitoring": "थेट देखरेख", "riskLevel": "भू-तांत्रिक जोखीम पातळी", "activeSensors": "सक्रिय सेन्सर्स", "lastUpdated": "शेवटचे अद्यतन", "title": "MineGuard AI डॅशबोर्ड", "systemStatus": "सिस्टम स्थिती"},
        "map": {"map": "खाण नकाशा", "title": "3D उपग्रह खाण खचणे नकाशा", "legend": "नकाशा सूची", "satellite": "उपग्रह दृश्य", "terrain": "भूभाग / उतार", "sensors": "सेन्सर्स", "insar": "InSAR रडार", "riskZones": "धोकादायक क्षेत्रे", "evacuationRoute": "सुरक्षित स्थलांतर मार्ग", "assemblyPoint": "एकत्र येण्याचे ठिकाण A", "workerLocation": "तुमचे सध्याचे स्थान", "fullscreen": "पूर्ण स्क्रीन", "minimize": "लहान करा", "expand": "नकाशा वाढवा", "collapse": "नकाशा लहान करा", "restore": "सामान्य दृश्य", "maximize": "पूर्ण स्क्रीन दृश्य", "zoomIn": "मोठे करा", "zoomOut": "लहान करा", "resetView": "दृश्य रीसेट करा", "layerSatellite": "उपग्रह दृश्य", "layerTopographic": "भूभाग / उतार", "layerHeatmap": "विरूपण हीटमॅप", "safeZone": "सुरक्षित क्षेत्र", "warningZone": "चेतावणी क्षेत्र", "criticalZone": "गंभीर धोका क्षेत्र", "zoneLabel": "मल्टी-झोन ओपन पिट", "realNode": "IoT नोड (BNO055 + ADXL-345 + VL53L0X)", "simulatedNode": "IoT नोड (BNO055 + ADXL-345 + VL53L0X)"},
        "sensor": {"sensor": "सेन्सर", "sensors": "सेन्सर्स", "node": "IoT नोड", "temperature": "तापमान", "humidity": "आर्द्रता", "vibration": "कंपन", "acceleration": "प्रवेग", "battery": "बॅटरी", "signal": "सिग्नल (RSSI)", "status": "स्थिती", "lastUpdated": "शेवटचे अद्यतन", "displacement": "विस्थापन", "tilt": "कलणे", "pitch": "पिच", "roll": "रोल", "yaw": "यॉ", "normal": "सामान्य", "warning": "चेतावणी", "critical": "गंभीर", "offline": "ऑफलाइन", "laser": "VL53L0X लेझर", "crackGrowth": "तडे जाणे", "lastHeartbeat": "शेवटचा सिग्नल"},
        "risk": {"safe": "सुरक्षित", "warning": "चेतावणी", "critical": "गंभीर", "low": "कमी धोका", "medium": "मध्यम धोका", "high": "उच्च धोका", "title": "भू-तांत्रिक जोखीम पातळी", "subTitle": "ML रिस्क इंजिनद्वारे गणना केलेले", "scoreLabel": "जोखीम संभाव्यता निर्देशांक", "safeLabel": "सुरक्षित (0 - 40%)", "warningLabel": "चेतावणी (41 - 80%)", "criticalLabel": "गंभीर (81 - 100%)"},
        "alerts": {"alert": "सूचना", "warning": "चेतावणी", "criticalAlert": "गंभीर सूचना", "acknowledge": "स्वीकारा", "emergency": "आणीबाणी", "alertAcknowledged": "सूचना स्वीकारली", "recentTitle": "अलीकडील घटना आणि लॉग", "viewAll": "सर्व लॉग पहा", "timeCol": "वेळ", "nodeCol": "नोड", "eventCol": "घटनेचे वर्णन", "severityCol": "तीव्रता", "actionCol": "कृती", "acknowledgedBadge": "स्वीकारले", "criticalBannerTitle": "गंभीर सूचना!", "criticalBannerDesc": "नोड 01 (झोन 01) विस्थापन सुरक्षित मर्यादेपेक्षा जास्त (12.4 मिमी).", "viewDetails": "तपशील पहा", "dismiss": "काढून टाका", "ackSuccess": "खाण प्रशासकाद्वारे {time} वाजता सूचना स्वीकारली गेली."},
        "insar": {"insar": "Sentinel-1 InSAR", "subsidence": "जमीन खचणे", "displacement": "जमीन विस्थापन", "deformation": "विरूपण", "rate": "खचण्याचा दर", "mmPerYear": "मिमी/वर्ष", "title": "उपग्रह InSAR एकूण जमीन बदल", "cumulativeShift": "एकूण बदल"},
        "brand": {"name": "MineGuard AI", "tagline": "सुरक्षित खाणी. उज्ज्वल भविष्य.", "slogan": "निरीक्षण • अंदाज • प्रतिबंध", "hackathon": "Smart India Hackathon 2026 प्रोटोटाइप"},
        "nav": {"dashboard": "डॅशबोर्ड", "liveMonitoring": "थेट देखरेख", "mapView": "नकाशा दृश्य", "alerts": "सूचना", "analytics": "विश्लेषण", "reports": "अहवाल", "satellite": "उपग्रह / InSAR", "userManagement": "वापरकर्ता व्यवस्थापन", "settings": "सेटिंग्ज", "home": "मुख्यपृष्ठ", "updates": "अपडेट्स", "safetyTips": "सुरक्षा टिप्स", "profile": "माझी प्रोफाइल"}
    },
    "gu": {
        "common": {"save": "સાચવો", "cancel": "રદ કરો", "close": "બંધ કરો", "loading": "લોડ થઈ રહ્યું છે...", "online": "ઓનલાઇન", "offline": "ઓફલાઇન", "acknowledge": "સ્વીકારો", "all": "બધા", "you": "તમે", "reset": "રીસેટ", "details": "વિગતો", "actions": "પગલાં", "back": "પાછળ", "submit": "સબમિટ કરો", "status": "સ્થિતિ", "active": "સક્રિય", "inactive": "નિષ્ક્રિય"},
        "dashboard": {"dashboard": "ડેશબોર્ડ", "overview": "ઝાંખી", "monitoring": "લાઇવ મોનિટરિંગ", "riskLevel": "ભૂ-તકનીકી જોખમ સ્તર", "activeSensors": "સક્રિય સેન્સર્સ", "lastUpdated": "છેલ્લું અપડેટ", "title": "MineGuard AI ડેશબોર્ડ", "systemStatus": "સિસ્ટમ સ્થિતિ"},
        "map": {"map": "ખાણ નકશો", "title": "3D સેટેલાઇટ ખાણ બેસી જવાનો નકશો", "legend": "નકશા સંકેત", "satellite": "સેટેલાઇટ દૃશ્ય", "terrain": "ભૂપ્રદેશ / ઢોળાવ", "sensors": "સેન્સર્સ", "insar": "InSAR રડાર", "riskZones": "જોખમી વિસ્તારો", "evacuationRoute": "સલામત સ્થળાંતર માર્ગ", "assemblyPoint": "એકત્ર થવાનું સ્થળ A", "workerLocation": "તમારું વર્તમાન સ્થાન", "fullscreen": "પૂર્ણ સ્ક્રીન", "minimize": "નાનું કરો", "expand": "નકશો મોટો કરો", "collapse": "નકશો નાનો કરો", "restore": "સામાન્ય દૃશ્ય", "maximize": "પૂર્ણ સ્ક્રીન જુઓ", "zoomIn": "મોટું કરો", "zoomOut": "નાનું કરો", "resetView": "દૃશ્ય રીસેટ કરો", "layerSatellite": "સેટેલાઇટ દૃશ્ય", "layerTopographic": "ભૂપ્રદેશ / ઢોળાવ", "layerHeatmap": "વિકૃતિ હીટમેપ", "safeZone": "સલામત વિસ્તાર", "warningZone": "ચેતવણી વિસ્તાર", "criticalZone": "ગંભીર જોખમી વિસ્તાર", "zoneLabel": "મલ્ટી-ઝોન ઓપન પીટ", "realNode": "IoT નોડ (BNO055 + ADXL-345 + VL53L0X)", "simulatedNode": "IoT નોડ (BNO055 + ADXL-345 + VL53L0X)"},
        "sensor": {"sensor": "સેન્સર", "sensors": "સેન્સર્સ", "node": "IoT નોડ", "temperature": "તાપમાન", "humidity": "ભેજ", "vibration": "કંપન", "acceleration": "પ્રવેગક", "battery": "બેટરી", "signal": "સિગ્નલ (RSSI)", "status": "સ્થિતિ", "lastUpdated": "છેલ્લું અપડેટ", "displacement": "સ્થાનાંતરણ", "tilt": "ઝુકાવ", "pitch": "પીચ", "roll": "રોલ", "yaw": "યૉ", "normal": "સામાન્ય", "warning": "ચેતવણી", "critical": "ગંભીર", "offline": "ઓફલાઇન", "laser": "VL53L0X લેસર", "crackGrowth": "તિરાડ વૃદ્ધિ", "lastHeartbeat": "છેલ્લો સિગ્નલ"},
        "risk": {"safe": "સલામત", "warning": "ચેતવણી", "critical": "ગંભીર", "low": "ઓછું જોખમ", "medium": "મધ્યમ જોખમ", "high": "વધુ જોખમ", "title": "ભૂ-તકનીકી જોખમ સ્તર", "subTitle": "ML રિસ્ક એન્જિન દ્વારા ગણતરી કરેલ", "scoreLabel": "જોખમ સંભાવના ઇન્ડેક્સ", "safeLabel": "સલામત (0 - 40%)", "warningLabel": "ચેતવણી (41 - 80%)", "criticalLabel": "ગંભીર (81 - 100%)"},
        "alerts": {"alert": "ચેતવણી", "warning": "ચેતવણી", "criticalAlert": "ગંભીર ચેતવણી", "acknowledge": "સ્વીકારો", "emergency": "કટોકટી", "alertAcknowledged": "ચેતવણી સ્વીકારી", "recentTitle": "તાજેતરની ઘટનાઓ અને લોગ", "viewAll": "બધા લોગ જુઓ", "timeCol": "સમય", "nodeCol": "નોડ", "eventCol": "ઘટના વર્ણન", "severityCol": "તીવ્રતા", "actionCol": "પગલાં", "acknowledgedBadge": "સ્વીકારેલ", "criticalBannerTitle": "ગંભીર ચેતવણી!", "criticalBannerDesc": "નોડ 01 (ઝોન 01) સ્થાનાંતરણ મર્યાદા વટાવી ગયું (12.4 મીમી).", "viewDetails": "વિગતો જુઓ", "dismiss": "દૂર કરો", "ackSuccess": "ખાણ વહીવટકર્તા દ્વારા {time} વાગ્યે ચેતવણી સ્વીકારવામાં આવી."},
        "insar": {"insar": "Sentinel-1 InSAR", "subsidence": "જમીન બેસી જવી / ધસી પડવું", "displacement": "જમીન સ્થાનાંતરણ", "deformation": "વિકૃતિ", "rate": "બેસી જવાનો દર", "mmPerYear": "મીમી/વર્ષ", "title": "સેટેલાઇટ InSAR કુલ જમીન ફેરફાર", "cumulativeShift": "કુલ ફેરફાર"},
        "brand": {"name": "MineGuard AI", "tagline": "સલામત ખાણો. ઉજ્જવળ ભવિષ્ય.", "slogan": "મોનિટર • આગાહી • નિવારણ", "hackathon": "Smart India Hackathon 2026 પ્રોટોટાઇપ"},
        "nav": {"dashboard": "ડેશબોર્ડ", "liveMonitoring": "લાઇવ મોનિટરિંગ", "mapView": "નકશા દૃશ્ય", "alerts": "ચેતવણીઓ", "analytics": "વિશ્લેષણ", "reports": "અહેવાલો", "satellite": "સેટેલાઇટ / InSAR", "userManagement": "વપરાશકર્તા સંચાલન", "settings": "સેટિંગ્સ", "home": "હોમ", "updates": "અપડેટ્સ", "safetyTips": "સલામતી ટીપ્સ", "profile": "મારી પ્રોફાઇલ"}
    },
    "pa": {
        "common": {"save": "ਸੰਭਾਲੋ", "cancel": "ਰੱਦ ਕਰੋ", "close": "ਬੰਦ ਕਰੋ", "loading": "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...", "online": "ਔਨਲਾਈਨ", "offline": "ਔਫਲਾਈਨ", "acknowledge": "ਸਵੀਕਾਰ ਕਰੋ", "all": "ਸਾਰੇ", "you": "ਤੁਸੀਂ", "reset": "ਰੀਸੈਟ", "details": "ਵੇਰਵੇ", "actions": "ਕਾਰਵਾਈਆਂ", "back": "ਪਿੱਛੇ", "submit": "ਜਮ੍ਹਾਂ ਕਰੋ", "status": "ਸਥਿਤੀ", "active": "ਸਰਗਰਮ", "inactive": "ਨਿਸ਼ਕਿਰਿਆ"},
        "dashboard": {"dashboard": "ਡੈਸ਼ਬੋਰਡ", "overview": "ਸੰਖੇਪ ਜਾਣਕਾਰੀ", "monitoring": "ਲਾਈਵ ਨਿਗਰਾਨੀ", "riskLevel": "ਭੂ-ਤਕਨੀਕੀ ਜੋਖਮ ਪੱਧਰ", "activeSensors": "ਸਰਗਰਮ ਸੈਂਸਰ", "lastUpdated": "ਆਖਰੀ ਅੱਪਡੇਟ", "title": "MineGuard AI ਡੈਸ਼ਬੋਰਡ", "systemStatus": "ਸਿਸਟਮ ਸਥਿਤੀ"},
        "map": {"map": "ਖਾਨ ਨਕਸ਼ਾ", "title": "3D ਸੈਟੇਲਾਈਟ ਖਾਨ ਧੱਸਣ ਨਕਸ਼ਾ", "legend": "ਨਕਸ਼ਾ ਸੰਕੇਤ", "satellite": "ਸੈਟੇਲਾਈਟ ਦ੍ਰਿਸ਼", "terrain": "ਖਾਨ ਭੂਗੋਲ / ਢਲਾਣ", "sensors": "ਸੈਂਸਰ", "insar": "InSAR ਰਾਡਾਰ", "riskZones": "ਜੋਖਮ ਖੇਤਰ", "evacuationRoute": "ਸੁਰੱਖਿਅਤ ਨਿਕਾਸੀ ਰਸਤਾ", "assemblyPoint": "ਇਕੱਠੇ ਹੋਣ ਦਾ ਸਥਾਨ A", "workerLocation": "ਤੁਹਾਡਾ ਮੌਜੂਦਾ ਸਥਾਨ", "fullscreen": "ਪੂਰੀ ਸਕ੍ਰੀਨ", "minimize": "ਛੋਟਾ ਕਰੋ", "expand": "ਨਕਸ਼ਾ ਫੈਲਾਓ", "collapse": "ਨਕਸ਼ਾ ਛੋਟਾ ਕਰੋ", "restore": "ਆਮ ਦ੍ਰਿਸ਼", "maximize": "ਪੂਰੀ ਸਕ੍ਰੀਨ ਵੇਖੋ", "zoomIn": "ਵੱਡਾ ਕਰੋ", "zoomOut": "ਛੋਟਾ ਕਰੋ", "resetView": "ਦ੍ਰਿਸ਼ ਰੀਸੈਟ ਕਰੋ", "layerSatellite": "ਸੈਟੇਲਾਈਟ ਦ੍ਰਿਸ਼", "layerTopographic": "ਭੂਗੋਲ / ਢਲਾਣ", "layerHeatmap": "ਵਿਗਾੜ ਹੀਟਮੈਪ", "safeZone": "ਸੁਰੱਖਿਅਤ ਖੇਤਰ", "warningZone": "ਚੇਤਾਵਨੀ ਖੇਤਰ", "criticalZone": "ਗੰਭੀਰ ਖੇਤਰ", "zoneLabel": "ਮਲਟੀ-ਜ਼ੋਨ ਓਪਨ ਪਿਟ", "realNode": "IoT ਨੋਡ (BNO055 + ADXL-345 + VL53L0X)", "simulatedNode": "IoT ਨੋਡ (BNO055 + ADXL-345 + VL53L0X)"},
        "sensor": {"sensor": "ਸੈਂਸਰ", "sensors": "ਸੈਂਸਰ", "node": "IoT ਨੋਡ", "temperature": "ਤਾਪਮਾਨ", "humidity": "ਨਮੀ", "vibration": "ਕੰਬਣੀ", "acceleration": "ਪ੍ਰਵੇਗ", "battery": "ਬੈਟਰੀ", "signal": "ਸਿਗਨਲ (RSSI)", "status": "ਸਥਿਤੀ", "lastUpdated": "ਆਖਰੀ ਅੱਪਡੇਟ", "displacement": "ਵਿਸਥਾਪਨ", "tilt": "ਝੁਕਾਅ", "pitch": "ਪਿੱਚ", "roll": "ਰੋਲ", "yaw": "ਯਾਅ", "normal": "ਸਧਾਰਨ", "warning": "ਚੇਤਾਵਨੀ", "critical": "ਗੰਭੀਰ", "offline": "ਔਫਲਾਈਨ", "laser": "VL53L0X ਲੇਜ਼ਰ", "crackGrowth": "ਦਰਾਰ ਦਾ ਵਾਧਾ", "lastHeartbeat": "ਆਖਰੀ ਸਿਗਨਲ"},
        "risk": {"safe": "ਸੁਰੱਖਿਅਤ", "warning": "ਚੇਤਾਵਨੀ", "critical": "ਗੰਭੀਰ", "low": "ਘੱਟ ਜੋਖਮ", "medium": "ਦਰਮਿਆਨਾ ਜੋਖਮ", "high": "ਉੱਚ ਜੋਖਮ", "title": "ਭੂ-ਤਕਨੀਕੀ ਜੋਖਮ ਪੱਧਰ", "subTitle": "ML ਜੋਖਮ ਇੰਜਨ ਦੁਆਰਾ ਗਿਣਿਆ ਗਿਆ", "scoreLabel": "ਜੋਖਮ ਸੰਭਾਵਨਾ ਸੂਚਕਾਂਕ", "safeLabel": "ਸੁਰੱਖਿਅਤ (0 - 40%)", "warningLabel": "ਚੇਤਾਵਨੀ (41 - 80%)", "criticalLabel": "ਗੰਭੀਰ (81 - 100%)"},
        "alerts": {"alert": "ਚੇਤਾਵਨੀ", "warning": "ਚੇਤਾਵਨੀ", "criticalAlert": "ਗੰਭੀਰ ਚੇਤਾਵਨੀ", "acknowledge": "ਸਵੀਕਾਰ ਕਰੋ", "emergency": "ਐਮਰਜੈਂਸੀ", "alertAcknowledged": "ਚੇਤਾਵਨੀ ਸਵੀਕਾਰ ਕੀਤੀ ਗਈ", "recentTitle": "ਤਾਜ਼ਾ ਘਟਨਾਵਾਂ ਅਤੇ ਲੌਗ", "viewAll": "ਸਾਰੇ ਲੌਗ ਵੇਖੋ", "timeCol": "ਸਮਾਂ", "nodeCol": "ਨੋਡ", "eventCol": "ਘਟਨਾ ਦਾ ਵੇਰਵਾ", "severityCol": "ਗੰਭੀਰਤਾ", "actionCol": "ਕਾਰਵਾਈ", "acknowledgedBadge": "ਸਵੀਕਾਰ ਕੀਤਾ", "criticalBannerTitle": "ਗੰਭੀਰ ਚੇਤਾਵਨੀ!", "criticalBannerDesc": "ਨੋਡ 01 (ਜ਼ੋਨ 01) ਵਿਸਥਾਪਨ ਸੁਰੱਖਿਅਤ ਸੀਮਾ ਤੋਂ ਵੱਧ ਗਿਆ (12.4 mm)।", "viewDetails": "ਵੇਰਵੇ ਵੇਖੋ", "dismiss": "ਰੱਦ ਕਰੋ", "ackSuccess": "ਮਾਈਨ ਐਡਮਿਨਿਸਟ੍ਰੇਟਰ ਦੁਆਰਾ {time} ਵਜੇ ਚੇਤਾਵਨੀ ਸਵੀਕਾਰ ਕੀਤੀ ਗਈ।"},
        "insar": {"insar": "Sentinel-1 InSAR", "subsidence": "ਜ਼ਮੀਨ ਧੱਸਣਾ", "displacement": "ਜ਼ਮੀਨ ਵਿਸਥਾਪਨ", "deformation": "ਵਿਗਾੜ", "rate": "ਧੱਸਣ ਦੀ ਦਰ", "mmPerYear": "ਮਿਮੀ/ਸਾਲ", "title": "ਸੈਟੇਲਾਈਟ InSAR ਜ਼ਮੀਨੀ ਬਦਲਾਅ", "cumulativeShift": "ਕੁੱਲ ਬਦਲਾਅ"},
        "brand": {"name": "MineGuard AI", "tagline": "ਸੁਰੱਖਿਅਤ ਖਾਣਾਂ। ਬਿਹਤਰ ਭਵਿੱਖ।", "slogan": "ਨਿਗਰਾਨੀ • ਭਵਿੱਖਬਾਣੀ • ਰੋਕਥਾਮ", "hackathon": "Smart India Hackathon 2026 ਪ੍ਰੋਟੋਟਾਈਪ"},
        "nav": {"dashboard": "ਡੈਸ਼ਬੋਰਡ", "liveMonitoring": "ਲਾਈਵ ਨਿਗਰਾਨੀ", "mapView": "ਨਕਸ਼ਾ ਦ੍ਰਿਸ਼", "alerts": "ਚੇਤਾਵਨੀਆਂ", "analytics": "ਵਿਸ਼ਲੇਸ਼ਣ", "reports": "ਰਿਪੋਰਟਾਂ", "satellite": "ਸੈਟੇਲਾਈਟ / InSAR", "userManagement": "ਯੂਜ਼ਰ ਪ੍ਰਬੰਧਨ", "settings": "ਸੈਟਿੰਗਾਂ", "home": "ਹੋਮ", "updates": "ਅੱਪਡੇਟ", "safetyTips": "ਸੁਰੱਖਿਆ ਸੁਝਾਅ", "profile": "ਮੇਰੀ ਪ੍ਰੋਫਾਈਲ"}
    },
    "or": {
        "common": {"save": "ସଂରକ୍ଷଣ କରନ୍ତୁ", "cancel": "ବାତିଲ କରନ୍ତୁ", "close": "ବନ୍ଦ କରନ୍ତୁ", "loading": "ଲୋଡ୍ ହେଉଛି...", "online": "ଅନଲାଇନ୍", "offline": "ଅଫଲାଇନ୍", "acknowledge": "ସ୍ୱୀକାର କରନ୍ତୁ", "all": "ସମସ୍ତ", "you": "ଆପଣ", "reset": "ରିସେଟ୍", "details": "ବିବରଣୀ", "actions": "ପଦକ୍ଷେପ", "back": "ପଛକୁ", "submit": "ଦାଖଲ କରନ୍ତୁ", "status": "ସ୍ଥିତି", "active": "ସକ୍ରିୟ", "inactive": "ନିଷ୍କ୍ରିୟ"},
        "dashboard": {"dashboard": "ଡ୍ୟାସବୋର୍ଡ", "overview": "ସମୀକ୍ଷା", "monitoring": "ପ୍ରତ୍ୟକ୍ଷ ନିରୀକ୍ଷଣ", "riskLevel": "ଭୂ-ବୈଷୟିକ ବିପଦ ସ୍ତର", "activeSensors": "ସକ୍ରିୟ ସେନ୍ସର", "lastUpdated": "ଶେଷ ଅଦ୍ୟତନ", "title": "MineGuard AI ଡ୍ୟାସବୋର୍ଡ", "systemStatus": "ସିଷ୍ଟମ ସ୍ଥିତି"},
        "map": {"map": "ଖଣି ମାନଚିତ୍ର", "title": "3D ଉପଗ୍ରହ ଖଣି ଦବିବା ମାନଚିତ୍ର", "legend": "ମାନଚିତ୍ର ସୂଚୀ", "satellite": "ଉପଗ୍ରହ ଦୃଶ୍ୟ", "terrain": "ଭୂଭାଗ / ଢଳାଣ", "sensors": "ସେନ୍ସର", "insar": "InSAR ରାଡାର", "riskZones": "ବିପଦପୂର୍ଣ୍ଣ ଅଞ୍ଚଳ", "evacuationRoute": "ନିରାପଦ ନିଷ୍କାସନ ପଥ", "assemblyPoint": "ଏକତ୍ରିକରଣ ସ୍ଥାନ A", "workerLocation": "ଆପଣଙ୍କ ବର୍ତ୍ତମାନର ସ୍ଥାନ", "fullscreen": "ପୂର୍ଣ୍ଣ ସ୍କ୍ରିନ୍", "minimize": "ଛୋଟ କରନ୍ତୁ", "expand": "ମାନଚିତ୍ର ପ୍ରସାରିତ କରନ୍ତୁ", "collapse": "ମାନଚିତ୍ର ଛୋଟ କରନ୍ତୁ", "restore": "ସାଧାରଣ ଦୃଶ୍ୟ", "maximize": "ପୂର୍ଣ୍ଣ ସ୍କ୍ରିନ୍ ଦେଖନ୍ତୁ", "zoomIn": "ବଡ଼ କରନ୍ତୁ", "zoomOut": "ଛୋଟ କରନ୍ତୁ", "resetView": "ଦୃଶ୍ୟ ରିସେଟ୍ କରନ୍ତୁ", "layerSatellite": "ଉପଗ୍ରହ ଦୃଶ୍ୟ", "layerTopographic": "ଭୂଭାଗ / ଢଳାଣ", "layerHeatmap": "ବିକୃତି ହିଟମ୍ୟାପ୍", "safeZone": "ସୁରକ୍ଷିତ ଅଞ୍ଚଳ", "warningZone": "ଚେତାବନୀ ଅଞ୍ଚଳ", "criticalZone": "ଗମ୍ଭୀର ବିପଦ ଅଞ୍ଚଳ", "zoneLabel": "ମଲ୍ଟି-ଜୋନ୍ ଓପନ୍ ପିଟ୍", "realNode": "IoT ନୋଡ୍ (BNO055 + ADXL-345 + VL53L0X)", "simulatedNode": "IoT ନୋଡ୍ (BNO055 + ADXL-345 + VL53L0X)"},
        "sensor": {"sensor": "ସେନ୍ସର", "sensors": "ସେନ୍ସରଗୁଡ଼ିକ", "node": "IoT ନୋଡ୍", "temperature": "ତାପମାତ୍ରା", "humidity": "ଆର୍ଦ୍ରତା", "vibration": "କମ୍ପନ", "acceleration": "ତ୍ୱରଣ", "battery": "ବ୍ୟାଟେରୀ", "signal": "ସିଗନାଲ (RSSI)", "status": "ସ୍ଥିତି", "lastUpdated": "ଶେଷ ଅଦ୍ୟତନ", "displacement": "ବିସ୍ଥାପନ", "tilt": "ଢଳିବା", "pitch": "ପିଚ୍", "roll": "ରୋଲ୍", "yaw": "ୟା", "normal": "ସାଧାରଣ", "warning": "ଚେତାବନୀ", "critical": "ଗମ୍ଭୀର", "offline": "ଅଫଲାଇନ୍", "laser": "VL53L0X ଲେଜର", "crackGrowth": "ଫାଟ ବୃଦ୍ଧି", "lastHeartbeat": "ଶେଷ ସିଗନାଲ"},
        "risk": {"safe": "ସୁରକ୍ଷିତ", "warning": "ଚେତାବନୀ", "critical": "ସଙ୍କଟଜନକ", "low": "କମ୍ ବିପଦ", "medium": "ମଧ୍ୟମ ବିପଦ", "high": "ଉଚ୍ଚ ବିପଦ", "title": "ଭୂ-ବୈଷୟିକ ବିପଦ ସ୍ତର", "subTitle": "ML ରିସ୍କ ଇଞ୍ଜିନ ଦ୍ୱାରା ଗଣନା କରାଯାଇଛି", "scoreLabel": "ବିପଦ ସମ୍ଭାବନା ସୂଚକାଙ୍କ", "safeLabel": "ସୁରକ୍ଷିତ (0 - 40%)", "warningLabel": "ଚେତାବନୀ (41 - 80%)", "criticalLabel": "ସଙ୍କଟଜନକ (81 - 100%)"},
        "alerts": {"alert": "ଚେତାବନୀ", "warning": "ଚେତାବନୀ", "criticalAlert": "ଗମ୍ଭୀର ଚେତାବନୀ", "acknowledge": "ସ୍ୱୀକାର କରନ୍ତୁ", "emergency": "ଜରୁରୀକାଳୀନ", "alertAcknowledged": "ଚେତାବନୀ ସ୍ୱୀକୃତ", "recentTitle": "ସାମ୍ପ୍ରତିକ ଘଟଣା ଏବଂ ଲଗ୍", "viewAll": "ସମସ୍ତ ଲଗ୍ ଦେଖନ୍ତୁ", "timeCol": "ସମୟ", "nodeCol": "ନୋଡ୍", "eventCol": "ଘଟଣା ବିବରଣୀ", "severityCol": "ତୀବ୍ରତା", "actionCol": "ପଦକ୍ଷେପ", "acknowledgedBadge": "ସ୍ୱୀକୃତ", "criticalBannerTitle": "ଗମ୍ଭୀର ଚେତାବନୀ!", "criticalBannerDesc": "ନୋଡ୍ 01 (ଜୋନ୍ 01) ବିସ୍ଥାପନ ସୁରକ୍ଷିତ ସୀମା ଅତିକ୍ରମ କରିଛି (12.4 mm)।", "viewDetails": "ବିବରଣୀ ଦେଖନ୍ତୁ", "dismiss": "ଅଣଦେଖା କରନ୍ତୁ", "ackSuccess": "ଖଣି ପ୍ରଶାସକଙ୍କ ଦ୍ୱାରା {time} ରେ ଚେତାବନୀ ସ୍ୱୀକାର କରାଗଲା।"},
        "insar": {"insar": "Sentinel-1 InSAR", "subsidence": "ଭୂମି ଦବିବା / ଧସିବା", "displacement": "ଭୂମି ବିସ୍ଥାପନ", "deformation": "ବିକୃତି", "rate": "ଦବିବା ହାର", "mmPerYear": "ମିମି/ବର୍ଷ", "title": "ଉପଗ୍ରହ InSAR ସାମଗ୍ରିକ ଭୂମି ପରିବର୍ତ୍ତନ", "cumulativeShift": "ସାମଗ୍ରିକ ପରିବର୍ତ୍ତନ"},
        "brand": {"name": "MineGuard AI", "tagline": "ନିରାପଦ ଖଣି। ଉନ୍ନତ ଭବିଷ୍ୟତ।", "slogan": "ନିରୀକ୍ଷଣ • ପୂର୍ବାନୁମାନ • ପ୍ରତିରୋଧ", "hackathon": "Smart India Hackathon 2026 ପ୍ରୋଟୋଟାଇପ୍"},
        "nav": {"dashboard": "ଡ୍ୟାସବୋର୍ଡ", "liveMonitoring": "ପ୍ରତ୍ୟକ୍ଷ ନିରୀକ୍ଷଣ", "mapView": "ମାନଚିତ୍ର ଦୃଶ୍ୟ", "alerts": "ଚେତାବନୀ", "analytics": "ବିଶ୍ଳେଷଣ", "reports": "ରିପୋର୍ଟ", "satellite": "ଉପଗ୍ରହ / InSAR", "userManagement": "ଉପଭୋକ୍ତା ପରିଚାଳନା", "settings": "ସେଟିଂସ", "home": "ମୁଖ୍ୟପୃଷ୍ଠା", "updates": "ଅଦ୍ୟତନ", "safetyTips": "ସୁରକ୍ଷା ପରାମର୍ଶ", "profile": "ମୋ ପ୍ରୋଫାଇଲ୍"}
    },
    "as": {
        "common": {"save": "সংৰক্ষণ কৰক", "cancel": "বাতিল কৰক", "close": "বন্ধ কৰক", "loading": "লোড হৈ আছে...", "online": "অনলাইন", "offline": "অফলাইন", "acknowledge": "স্বীকাৰ কৰক", "all": "সকলো", "you": "আপুনি", "reset": "পুনৰায় ছেট কৰক", "details": "বিৱৰণ", "actions": "পদক্ষেপ", "back": "পিছলৈ", "submit": "দাখিল কৰক", "status": "স্থিতি", "active": "সক্ৰিয়", "inactive": "নিষ্ক্ৰিয়"},
        "dashboard": {"dashboard": "ডেচবৰ্ড", "overview": "অৱলোকন", "monitoring": "প্ৰত্যক্ষ নিৰীক্ষণ", "riskLevel": "ভূ-কাৰিকৰী বিপদৰ মাত্ৰা", "activeSensors": "সক্ৰিয় চেন্সৰসমূহ", "lastUpdated": "শেহতীয়া আপডেট", "title": "MineGuard AI ডেচবৰ্ড", "systemStatus": "ছিষ্টেম স্থিতি"},
        "map": {"map": "খনি মানচিত্ৰ", "title": "3D উপগ্ৰহ খনি ভূমিস্খলন মানচিত্ৰ", "legend": "মানচিত্ৰ সংকেত", "satellite": "উপগ্ৰহ দৃশ্য", "terrain": "ভূ-প্ৰকৃতি / ঢাল", "sensors": "চেন্সৰসমূহ", "insar": "InSAR ৰাডাৰ", "riskZones": "বিপদজনক অঞ্চল", "evacuationRoute": "সুৰক্ষিত স্থানান্তৰ পথ", "assemblyPoint": "একত্ৰিত হোৱা স্থান A", "workerLocation": "আপোনাৰ বৰ্তমান অৱস্থান", "fullscreen": "সম্পূৰ্ণ স্ক্ৰীণ", "minimize": "সৰু কৰক", "expand": "মানচিত্ৰ সম্প্ৰসাৰণ কৰক", "collapse": "মানচিত্ৰ সৰু কৰক", "restore": "স্বাভাৱিক দৃশ্য", "maximize": "সম্পূৰ্ণ স্ক্ৰীণ চাওক", "zoomIn": "ডাঙৰ কৰক", "zoomOut": "সৰু কৰক", "resetView": "দৃশ্য পুনৰায় ছেট কৰক", "layerSatellite": "উপগ্ৰহ দৃশ্য", "layerTopographic": "ভূ-প্ৰকৃতি / ঢাল", "layerHeatmap": "বিকৃতি হিটমেপ", "safeZone": "সুৰক্ষিত অঞ্চল", "warningZone": "সতৰ্কতা অঞ্চল", "criticalZone": "সংকটজনক অঞ্চল", "zoneLabel": "মাল্টি-জোন মুকলি খনি", "realNode": "IoT নোড (BNO055 + ADXL-345 + VL53L0X)", "simulatedNode": "IoT নোড (BNO055 + ADXL-345 + VL53L0X)"},
        "sensor": {"sensor": "চেন্সৰ", "sensors": "চেন্সৰসমূহ", "node": "IoT নোড", "temperature": "উষ্ণতা", "humidity": "আৰ্দ্ৰতা", "vibration": "কম্পন", "acceleration": "ত্বৰণ", "battery": "বেটাৰী", "signal": "সংকেত (RSSI)", "status": "স্থিতি", "lastUpdated": "শেহতীয়া আপডেট", "displacement": "স্থানচ্যুতি", "tilt": "হেলনীয়া হোৱা", "pitch": "পিচ", "roll": "ৰোল", "yaw": "ইয়ো", "normal": "স্বাভাৱিক", "warning": "সতৰ্কবাণী", "critical": "সংকটজনক", "offline": "অফলাইন", "laser": "VL53L0X লেজাৰ", "crackGrowth": "ফাঁট বৃদ্ধি", "lastHeartbeat": "শেহতীয়া সংকেত"},
        "risk": {"safe": "সুৰক্ষিত", "warning": "সতৰ্কবাণী", "critical": "সংকটজনক", "low": "কম বিপদ", "medium": "মধ্যমীয়া বিপদ", "high": "উচ্চ বিপদ", "title": "ভূ-কাৰিকৰী বিপদৰ মাত্ৰা", "subTitle": "ML ৰিস্ক ইঞ্জিন দ্বাৰা গণনা কৰা হৈছে", "scoreLabel": "বিপদ সম্ভাৱনা সূচক", "safeLabel": "সুৰক্ষিত (0 - 40%)", "warningLabel": "সতৰ্কবাণী (41 - 80%)", "criticalLabel": "সংকটজনক (81 - 100%)"},
        "alerts": {"alert": "সতৰ্কবাৰ্তা", "warning": "সতৰ্কবাণী", "criticalAlert": "সংকটজনক সতৰ্কবাৰ্তা", "acknowledge": "স্বীকাৰ কৰক", "emergency": "জৰুৰীকালীন", "alertAcknowledged": "সতৰ্কবাৰ্তা গ্ৰহণ কৰা হৈছে", "recentTitle": "শেহতীয়া ঘটনা আৰু লগ", "viewAll": "সকলো লগ চাওক", "timeCol": "সময়", "nodeCol": "নোড", "eventCol": "ঘটনাৰ বিৱৰণ", "severityCol": "তীব্ৰতা", "actionCol": "পদক্ষেপ", "acknowledgedBadge": "গ্ৰহণ কৰা হ'ল", "criticalBannerTitle": "সংকটজনক সতৰ্কবাৰ্তা!", "criticalBannerDesc": "নোড 01 (জোন 01) স্থানচ্যুতি সুৰক্ষিত সীমা অতিক্ৰম কৰিছে (12.4 mm)।", "viewDetails": "বিৱৰণ চাওক", "dismiss": "বাতিল কৰক", "ackSuccess": "খনি প্ৰশাসকৰ দ্বাৰা {time} ত সতৰ্কবাৰ্তা স্বীকাৰ কৰা হ'ল।"},
        "insar": {"insar": "Sentinel-1 InSAR", "subsidence": "মাটি তললৈ যোৱা / ভূমিস্খলন", "displacement": "ভূমি স্থানচ্যুতি", "deformation": "বিকৃতি", "rate": "স্খলনৰ হাৰ", "mmPerYear": "মিমি/বছৰ", "title": "উপগ্ৰহ InSAR সামগ্ৰিক ভূমি পৰিৱৰ্তন", "cumulativeShift": "সামগ্ৰিক পৰিৱৰ্তন"},
        "brand": {"name": "MineGuard AI", "tagline": "সুৰক্ষিত খনি। উজ্জ্বল ভৱিষ্যত।", "slogan": "নিৰীক্ষণ • পূৰ্বানুমান • প্ৰতিৰোধ", "hackathon": "Smart India Hackathon 2026 প্ৰ'ট'টাইপ"},
        "nav": {"dashboard": "ডেচবৰ্ড", "liveMonitoring": "প্ৰত্যক্ষ নিৰীক্ষণ", "mapView": "মানচিত্ৰ দৃশ্য", "alerts": "সতৰ্কবাৰ্তা", "analytics": "বিশ্লেষণ", "reports": "প্ৰতিবেদন", "satellite": "উপগ্ৰহ / InSAR", "userManagement": "ব্যৱহাৰকাৰী ব্যৱস্থাপনা", "settings": "ছেটিংছ", "home": "হোম", "updates": "আপডেট", "safetyTips": "সুৰক্ষা পৰামৰ্শ", "profile": "মোৰ প্ৰ'ফাইল"}
    }
}

# Deep merge template into each language
en_dict = locales["en"]

def deep_merge(base, override):
    result = base.copy()
    for k, v in override.items():
        if k in result and isinstance(result[k], dict) and isinstance(v, dict):
            result[k] = deep_merge(result[k], v)
        else:
            result[k] = v
    return result

for lang, data in languages_meta.items():
    merged = deep_merge(en_dict, data)
    locales[lang] = merged

# Make sure all output directories exist
dirs = [
    "/home/jarvis/mine/dashboard/frontend/shared/messages",
    "/home/jarvis/mine/dashboard/frontend/admin/messages",
    "/home/jarvis/mine/dashboard/frontend/user/messages"
]

for d in dirs:
    os.makedirs(d, exist_ok=True)
    for lang_code, content in locales.items():
        filepath = os.path.join(d, f"{lang_code}.json")
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(content, f, ensure_ascii=False, indent=2)
        print(f"Wrote {filepath}")

print("All 12 languages generated successfully!")
