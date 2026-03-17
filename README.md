# 🛡️ GigShield AI
**Team Name:** API ARCHITECTS
**Persona:** Food Delivery Partners (Zomato/Swiggy)
**Phase:** 1 - Ideation & Foundation
**Video Pitch:** [Link to your 2-minute video]

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
