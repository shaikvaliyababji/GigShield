# 🛡️ GigShield AI
**Team Name:** API ARCHITECTS.
**Persona:** Food Delivery Partners (Zomato/Swiggy).
**Phase:** 1 - Ideation & Foundation.
**Video Pitch:** [(https://youtu.be/BFatkng6XhI)].

# GigShield AI – AI-Hybrid Resilience Insurance


## Tagline
AI-powered parametric insurance that adapts to risk and protects gig workers when they need it most.

---

## 1. Problem Statement

India’s gig delivery workers face unpredictable income loss due to external disruptions such as heavy rain, heatwaves, pollution, and local shutdowns.

These disruptions reduce working hours and can cut 20–30% of weekly earnings. Currently, there is no insurance product designed specifically to protect their **income loss**.

GigShield AI solves this using an intelligent parametric insurance system.

---

## 2. Target Persona & Scenario

### Persona

Arjun – Zomato Delivery Partner  
Location: Chennai  
Daily Earnings: ₹600  
Weekly Earnings: ₹4200  

### Scenario

During a sudden monsoon flood, Arjun loses 4 hours of work due to heavy rain and waterlogging.

GigShield AI detects rainfall exceeding 50mm using weather APIs and automatically triggers a payout.

Before Arjun even reaches home, ₹300 is credited to his wallet — no claim filing, no paperwork.

---

## 3. Platform Choice: Why Web (Responsive PWA)

We chose a **Web Application (Responsive PWA)** using ReactJS because:

- Works seamlessly on **mobile browsers** (no install required)
- Supports **real-time GPS tracking via browser APIs**
- Enables **push notifications** for disruption alerts
- Easier deployment and accessibility across devices
- Faster iteration during hackathon development

This ensures gig workers can access the platform instantly using their smartphones.

---

## 4. Core Innovation: AI-Hybrid Resilience Model

A combination of:

1. **Tiered Dynamic Zone Model**
2. **Earnings-Linked Safety Valve**

---

## 5. Part 1: Tiered Dynamic Zone Model

### Zone-Based Risk Intelligence

Cities are divided into **micro-zones (pin codes / grid system)**.

Each zone is assigned a **Risk Tier (1–5)** using:

- historical weather data  
- flood-prone mapping  
- traffic congestion  
- pollution levels  

---

### Risk Tiers

| Tier | Risk Level | Weekly Premium |
|------|-----------|---------------|
| Tier 1 | Low | ₹15 |
| Tier 2 | Mild | ₹20 |
| Tier 3 | Medium | ₹25 |
| Tier 4 | High | ₹30 |
| Tier 5 | Extreme | ₹35 |

---

### Dynamic Adjustment

Every week:

AI evaluates:
- weather forecast  
- disruption probability  

Example:
A safe zone → upgraded to high risk during monsoon week.

---

## 6. Part 2: Earnings-Linked Safety Valve

### Survival Threshold = ₹2000/week

If earnings fall below threshold:

- 50% discount OR  
- full premium waiver  

---

### Example

Weekly earnings: ₹800  
Premium: ₹35  

Final Premium = ₹0  

---

## 7. Weekly Premium Formula

\[
P_w = \text{Base Fee} + (\text{Zone Risk} \times \text{AI Multiplier}) - \text{Safety Discount}
\]

Where:

- Base Fee = ₹10  
- Zone Risk = ₹5–₹25  
- AI Multiplier = 1.0–1.5  
- Safety Discount = up to ₹35  

---

## 8. Parametric Triggers

| Disruption | Trigger |
|-----------|--------|
| Heavy Rain | Rainfall > 40mm |
| Heatwave | Temperature > 42°C |
| Pollution | AQI > 350 |
| Traffic | Speed < 10 km/h |
| Curfew | Zone restriction alert |

---

## 9. AI/ML Integration

### Risk Prediction
- Random Forest / Gradient Boosting  
- Predicts disruption probability  

### Fraud Detection (2026 Ready)

- Velocity checks  
- GPS spoof detection  
- duplicate claim detection  
- anomaly detection  

---

### 🔹 AI Model Flow (Concrete Implementation)

**Input Features:**
- rainfall forecast (mm)
- temperature
- AQI levels
- traffic speed
- historical disruption frequency per zone

**Processing:**
- Machine Learning model (Random Forest / Gradient Boosting)
- outputs a risk score between 0–1

**Output:**
- Risk Tier (1–5)
- Premium adjustment via AI Multiplier

## 10. System Workflow

1. User registers  
2. Zone assigned  
3. Weekly premium calculated  
4. APIs monitored continuously  
5. Trigger event occurs  
6. Claim auto-generated  
7. Fraud check  
8. Instant payout  

---

## 10.1 Data Flow (Technical Pipeline)

Weather API → Risk Engine → Zone Tier Update  
User Location → Trigger Engine → Claim Creation  
Claim → Fraud Engine → Confidence Score → Payout / Hold

## 11. Tech Stack

### Frontend
- ReactJS (PWA)
- GSAP (GreenSock) – For high-fidelity data visualizations and interactive risk maps.

### Backend (choose one)
- Spring Boot (Java)  

### Database
- PostgreSQL / MongoDB  

### AI/ML
- Python  
- Scikit-learn  

---

## 12. API & Simulation Strategy

### Real APIs
- OpenWeatherMap (Free Tier)  
- AQI APIs  
- Google Maps Traffic API  

### Simulated APIs

- JSON Server for:
  - delivery platform earnings  
  - worker activity data  

- Mock trigger engine:
  - simulate rain / flood events  
### Execution Logic

- Disruption triggers evaluated every **5 minutes**
- Zone risk updated **weekly using forecast data**
- Claims processed in **real-time pipeline**
---

## 13. System Architecture

Frontend (React PWA)  
Backend (Spring Boot / FastAPI)  
AI Engine (Risk + Fraud)  
Database  
External APIs  
Trigger Engine  
Payment Gateway (Razorpay Test Mode)

---

## Business Sustainability

- High-risk zones → higher premiums  
- Low-risk weeks → reduced pricing  
- Safety Valve ensures affordability  

This maintains a **balanced loss ratio**, ensuring long-term viability.
## 14. Dashboards

### Worker Dashboard
- weekly premium  
- earnings protected  
- payout history  

### Admin Dashboard
- risk analytics  
- disruption events  
- fraud alerts  

---

## 15. 🚫 Non-Coverage (Constraint Compliance)

To maintain focus on income protection:

GigShield AI strictly **does NOT cover**:

- health insurance  
- life insurance  
- accident claims  
- vehicle or device repairs  

Only **loss of income due to external disruptions** is covered.

---

## 16. 6-Week Development Plan

### Weeks 1–2 (Ideation Phase)
- problem research  
- persona definition  
- UI mockups  
- README documentation  

### Weeks 3–4 (Core Build)
- user registration  
- policy management  
- dynamic premium logic  
- parametric trigger system  

### Weeks 5–6 (Advanced Features)
- fraud detection AI  
- payout simulation (Razorpay)  
- analytics dashboard  
- final demo & pitch  

---

## 17. Key Innovation Highlights

- AI-based dynamic pricing  
- zone-based risk modeling  
- empathy-driven safety valve  
- automated claim system  
- real-time disruption monitoring  

---

## 18. Project Goal

To build a scalable, intelligent insurance platform that ensures gig workers never lose income due to uncontrollable external disruptions.


## 19. 🛡️ Adversarial Defense & Anti-Spoofing Strategy  
### (2026 Market Crash Protocol)
### Post-Detection Actions (Liquidity Protection)

- Suspicious claims → temporarily **frozen**
- Fraud clusters → **rate-limited**
- High-risk accounts → moved to **manual audit**

This ensures the system prevents **mass payout drain during coordinated attacks**.
---

## 19.1 Context: 2026 Systemic Fraud

In 2026, fraud has evolved beyond basic GPS spoofing. Attackers now use:

- Kernel-level emulators  
- Hardware signal injectors  
- Synthetic sensor manipulation  

These coordinated fraud rings can simulate:

- fake movement  
- fake weather conditions  
- synchronized mass claims  

This creates a **Market Crash scenario**, where large-scale fake payouts drain the insurance liquidity pool.

---

## 19.2 Core Philosophy: Physics > Software

> Software can be spoofed. Physics cannot.

GigShield AI validates **real-world physical conditions**, not just device-reported data.

We implement a **Zero-Trust, Multi-Signal Verification Model**, where every claim must pass cross-validation across independent signals.

---

## 19.3 Multi-Layer Defense Architecture

---

### 🔹 Layer 1: Physicality Sync (Barometric Validation)

**Problem:** Weather APIs and GPS can be spoofed.

**Logic:**  
Heavy rain and storms are associated with **atmospheric pressure drops**.

**Defense:**
- Compare device barometer readings with real weather station data  
- If:
  - GPS = storm  
  - Barometer = stable indoor pressure  
→ Claim is flagged immediately  

---

### 🔹 Layer 2: Acoustic Fingerprinting (Ambient Noise Check)

**Problem:** Fraud rings operate indoors while claiming outdoor disruption.

**Logic:**  
Heavy rainfall (>40mm) produces a **distinct acoustic signature**.

**Defense:**
- Capture 1-second ambient sound sample  
- Analyze frequency patterns  

If:
- Claim = heavy rain  
- Audio = silence / fan noise  
→ Fraud likely  

---

### 🔹 Layer 3: Network & WiFi Environment (Fraud Farm Detection)

**Problem:** Multiple fake accounts operated from one location.

**Logic:**  
WiFi SSIDs and cell towers create **unique location fingerprints**.

**Defense:**
- Detect shared WiFi/router IDs across multiple users  

If:
- 50 users claim different locations  
- but share same WiFi/network  
→ **Syndicate Block triggered**

---

### 🔹 Layer 4: Velocity & Kinetic Consistency

**Problem:** GPS spoofing creates unrealistically perfect movement.

**Logic:**  
Real-world movement during disruption is **irregular and chaotic**.

**Defense:**
- Analyze:
  - accelerometer  
  - gyroscope  

If:
- movement = perfectly linear  
- no vibration / tilt / stops  
→ flagged as synthetic  

---

### 🔹 Layer 5: Spatial-Temporal Graph Analytics

**Problem:** Fraud scripts act in perfect synchronization.

**Logic:**  
Human behavior is naturally **staggered**, not simultaneous.

**Defense:**
- Analyze claim timestamps across users  

If:
- hundreds of users trigger claims at same millisecond  
→ statistically impossible → fraud cluster  

---

### 🔹 Layer 6: Behavioral Fingerprinting

Each user builds a **behavioral profile over time**.

**Features:**
- average speed  
- working hours  
- delivery zones  
- claim frequency  

**Detection:**
- sudden abnormal behavior  
- unexpected zone changes  

Example:
- User always works in Zone A  
- suddenly claims in Zone B during high payout event  
→ flagged  

---

### 🔹 Layer 7: Claim Confidence Scoring System (CCSS)

Each claim is assigned a **Fraud Risk Score (0–100)**.

**Inputs:**
- location validation  
- sensor consistency  
- network signals  
- behavior profile  
- synchronization patterns  

**Decision Matrix:**

| Score | Action |
|------|-------|
| 0–30 | Auto Approve |
| 31–70 | Soft Lock (re-validation) |
| 71–100 | Investigative Quarantine |

---

### 🔹 Layer 8: Cross-Platform Proof-of-Work

**Problem:** Fake claims during active work.

**Logic:**  
A rider cannot lose income while completing deliveries.

**Defense:**
- Sync with delivery platform APIs  

If:
- claim = income loss  
- but rider completed orders  
→ claim rejected + account flagged  

---

### 🔹 Layer 9: Device Integrity & Foundational Security

**Problem:** Advanced spoofing tools at OS level.

**Checks:**
- mock location enabled  
- rooted device detection  
- emulator detection  
- Xposed framework modules  

**Action:**
- high fraud risk assigned  
- stricter validation applied  

---

### 🔹 Layer 10: Progressive Trust System

Each user is assigned a **Trust Score**.

**Logic:**
- increases with genuine activity  
- decreases with suspicious signals  

**Benefits:**

| User Type | Experience |
|----------|----------|
| High Trust | Instant payouts |
| Medium Trust | Light verification |
| Low Trust | Strict validation |

---

## 19.4 Fairness Layer (Protecting Honest Users)

To ensure genuine users are not penalized:

- delayed verification instead of rejection  
- passive re-validation checks  
- trust-based fast approvals  

---

## 19.5 Fraud Ring Detection (Network Intelligence)

Fraud is often **coordinated, not individual**.

**Detection Techniques:**
- graph clustering of accounts  
- shared device/network signals  
- synchronized behavior  

→ Entire fraud cluster is blocked  

---

## 19.6 Why This Survives the Market Crash

- Detects **hardware-level spoofing**  
- Identifies **coordinated fraud rings**  
- Uses **physics-based validation**  
- Prevents **mass false payouts**  
- Preserves **fast payouts for genuine workers**  

---

## 19.7 Key Insight

> Fraud looks artificial.  
> Reality looks messy.

GigShield AI is designed to detect that difference.
