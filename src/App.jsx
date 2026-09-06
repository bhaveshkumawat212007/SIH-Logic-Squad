import React, { useState } from "react";
import {
  Home,
  Map,
  Bell,
  Route,
  Camera,
  Activity,
  CloudRain,
  Droplets,
  Mountain,
  AlertTriangle,
  Search,
  ChevronDown,
  Navigation,
  MapPin,
  Clock,
  ShieldCheck,
  Radio,
  Users,
  Menu,
  X,
  Upload,
  Send,
  TrendingUp,
  Info,
  Languages,
} from "lucide-react";

import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Home");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [language, setLanguage] = useState("EN");

  const navigation = [
    { name: "Home", icon: <Home size={19} /> },
    { name: "Risk Map", icon: <Map size={19} /> },
    { name: "Alerts", icon: <Bell size={19} /> },
    { name: "Safe Route", icon: <Route size={19} /> },
    { name: "Report Landslide", icon: <Camera size={19} /> },
  ];

  return (
    <div className="app">

      {/* SIDEBAR */}
      <aside className={`sidebar ${mobileMenu ? "mobile-open" : ""}`}>

        <div className="brand">
          <div className="brand-logo">▲</div>

          <div>
            <h2>NER Landslide Watch</h2>
            <span>AI-Based Early Warning System</span>
          </div>

          <button
            className="close-menu"
            onClick={() => setMobileMenu(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="navigation">
          {navigation.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${
                activePage === item.name ? "active" : ""
              }`}
              onClick={() => {
                setActivePage(item.name);
                setMobileMenu(false);
              }}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="region">

          <div className="region-title">
            <span>North East India</span>
            <ChevronDown size={15} />
          </div>

          <div className="state selected">
            <MapPin size={15} />
            <span>Meghalaya</span>
          </div>

          <div className="district">
            <span>East Khasi Hills</span>
          </div>

          <div className="district">
            <span>Sohra</span>
          </div>

          <div className="state">
            <MapPin size={15} />
            <span>Assam</span>
          </div>

          <div className="state">
            <MapPin size={15} />
            <span>Arunachal Pradesh</span>
          </div>

        </div>

        <div className="sidebar-bottom">

          <div className="languages">
            <button className={language === "EN" ? "lang-active" : ""}
              onClick={() => setLanguage("EN")}>
              EN
            </button>

            <button className={language === "HI" ? "lang-active" : ""}
              onClick={() => setLanguage("HI")}>
              हिंदी
            </button>

            <button className={language === "AS" ? "lang-active" : ""}
              onClick={() => setLanguage("AS")}>
              অসমীয়া
            </button>

            <Languages size={16} />
          </div>

          <div className="system-status">
            <span className="online-dot"></span>
            System Operational
          </div>

        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="main">

        {/* TOPBAR */}
        <header className="topbar">

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenu(true)}
          >
            <Menu />
          </button>

          <div className="search-box">
            <Search size={18} />
            <input
              placeholder="Search location, district, road..."
            />
          </div>

          <div className="top-actions">

            <button className="notification">
              <Bell size={20} />
              <span></span>
            </button>

            <div className="profile">
              <div className="avatar">U</div>
              <div>
                <small>Hello,</small>
                <strong>User</strong>
              </div>
              <ChevronDown size={15} />
            </div>

          </div>

        </header>

        {/* PAGE */}
        <div className="content">

          {activePage === "Home" && <HomePage />}

          {activePage === "Risk Map" && <RiskMapPage />}

          {activePage === "Alerts" && <AlertsPage />}

          {activePage === "Safe Route" && <SafeRoutePage />}

          {activePage === "Report Landslide" && <ReportPage />}

        </div>

      </main>

    </div>
  );
}


/* =========================
   HOME PAGE
========================= */

function HomePage() {

  return (
    <>

      <div className="page-header">

        <div>
          <h1>Good afternoon 👋</h1>
          <p>Here is the current landslide situation in your region.</p>
        </div>

        <div className="last-update">
          <Activity size={16} />
          Updated 2 min ago
        </div>

      </div>


      {/* STATUS CARDS */}

      <div className="status-grid">

        <div className="risk-card high">

          <div className="risk-icon">
            <AlertTriangle />
          </div>

          <div>
            <span className="card-label">CURRENT RISK</span>

            <h2>HIGH RISK</h2>

            <p>
              Your location: <b>Sohra, Meghalaya</b>
            </p>

          </div>

        </div>


        <MetricCard
          icon={<CloudRain />}
          title="Rainfall"
          value="86 mm"
          description="Last 24 hours"
          status="High"
        />

        <MetricCard
          icon={<Droplets />}
          title="Soil Moisture"
          value="71%"
          description="Current level"
          status="High"
        />

        <MetricCard
          icon={<Mountain />}
          title="Slope Movement"
          value="+3.2 mm/h"
          description="Increasing"
          status="Warning"
        />

      </div>


      {/* MAP + ALERTS */}

      <div className="dashboard-grid">

        <RiskMap />

        <LiveAlerts />

      </div>


      {/* LOWER SECTION */}

      <div className="bottom-grid">

        <AIRisk />

        <RiskTimeline />

      </div>

    </>
  );
}


/* =========================
   METRIC CARD
========================= */

function MetricCard({
  icon,
  title,
  value,
  description,
  status,
}) {

  return (

    <div className="metric-card">

      <div className="metric-top">

        <div className="metric-icon">
          {icon}
        </div>

        <span className="metric-title">
          {title}
        </span>

      </div>

      <h2>{value}</h2>

      <p>{description}</p>

      <span className="metric-status">
        {status}
      </span>

    </div>

  );
}


/* =========================
   RISK MAP
========================= */

function RiskMap() {

  return (

    <div className="panel map-panel">

      <div className="panel-header">

        <div>
          <h3>Regional Risk Map</h3>
          <p>Real-time landslide risk visualization</p>
        </div>

        <div className="map-controls">
          <button>Satellite</button>
          <button className="selected-map">Terrain</button>
        </div>

      </div>


      <div className="map">

        <div className="terrain terrain-one"></div>
        <div className="terrain terrain-two"></div>
        <div className="terrain terrain-three"></div>

        <div className="road road-one"></div>
        <div className="road road-two"></div>

        <div className="location-label shillong">
          <MapPin size={16} />
          Shillong
        </div>

        <div className="location-label sohra">
          <MapPin size={16} />
          Sohra
        </div>

        <div className="location-label maw">
          <AlertTriangle size={16} />
          Mawlynnong
        </div>


        <div className="map-zoom">
          <button>+</button>
          <button>−</button>
        </div>


        <div className="map-legend">

          <strong>Risk Level</strong>

          <span>
            <i className="safe"></i>
            Safe
          </span>

          <span>
            <i className="low"></i>
            Low
          </span>

          <span>
            <i className="medium"></i>
            Medium
          </span>

          <span>
            <i className="danger"></i>
            High
          </span>

        </div>

      </div>

    </div>

  );
}


/* =========================
   LIVE ALERTS
========================= */

function LiveAlerts() {

  const alerts = [
    {
      level: "HIGH",
      place: "Mawlynnong",
      distance: "1.8 km away",
      time: "12 min ago",
    },
    {
      level: "MODERATE",
      place: "NH-6 Sector 12",
      distance: "4.2 km away",
      time: "28 min ago",
    },
    {
      level: "LOW",
      place: "Ranikkor",
      distance: "7.6 km away",
      time: "1 hr ago",
    },
    {
      level: "HIGH",
      place: "Laitumkhrah",
      distance: "12.3 km away",
      time: "2 hr ago",
    },
  ];

  return (

    <div className="panel alerts-panel">

      <div className="panel-header">

        <div>
          <h3>Live Alerts</h3>
          <p>Nearby warnings</p>
        </div>

        <button className="view-all">
          View all →
        </button>

      </div>


      <div className="alert-list">

        {alerts.map((alert, index) => (

          <div className="alert-item" key={index}>

            <div className={`alert-symbol ${alert.level.toLowerCase()}`}>
              <AlertTriangle size={17} />
            </div>

            <div className="alert-info">

              <strong>{alert.level} RISK</strong>

              <span>{alert.place}</span>

              <small>
                {alert.distance} · {alert.time}
              </small>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}


/* =========================
   AI RISK
========================= */

function AIRisk() {

  return (

    <div className="panel ai-panel">

      <div className="panel-header">

        <div>
          <h3>🤖 AI Risk Analysis</h3>
          <p>Prediction based on real-time data</p>
        </div>

        <span className="confidence">
          91% Confidence
        </span>

      </div>


      <div className="ai-content">

        <div className="risk-score">

          <div className="score-circle">
            <strong>82</strong>
            <span>/100</span>
          </div>

          <b>HIGH RISK</b>

        </div>


        <div className="factors">

          <h4>Contributing Factors</h4>

          <Factor
            name="Rainfall"
            percentage="42%"
            width="84%"
          />

          <Factor
            name="Soil Moisture"
            percentage="28%"
            width="56%"
          />

          <Factor
            name="Slope Movement"
            percentage="18%"
            width="36%"
          />

          <Factor
            name="Terrain"
            percentage="8%"
            width="16%"
          />

          <Factor
            name="Historical Data"
            percentage="4%"
            width="8%"
          />

        </div>

      </div>

      <button className="why-ai">
        <Info size={16} />
        Why this prediction?
      </button>

    </div>

  );
}


function Factor({ name, percentage, width }) {

  return (

    <div className="factor">

      <div className="factor-label">

        <span>{name}</span>
        <strong>{percentage}</strong>

      </div>

      <div className="progress">
        <div style={{ width }}></div>
      </div>

    </div>

  );
}


/* =========================
   RISK TIMELINE
========================= */

function RiskTimeline() {

  const timeline = [
    ["12 PM", "LOW"],
    ["1 PM", "MODERATE"],
    ["2 PM", "MODERATE"],
    ["3 PM", "HIGH"],
    ["4 PM", "HIGH"],
    ["5 PM", "MODERATE"],
  ];

  return (

    <div className="panel timeline-panel">

      <div className="panel-header">

        <div>
          <h3>Risk Timeline</h3>
          <p>Predicted risk over time</p>
        </div>

        <TrendingUp size={20} />

      </div>


      <div className="timeline">

        {timeline.map(([time, risk]) => (

          <div className="timeline-item" key={time}>

            <span>{time}</span>

            <div className={`timeline-dot ${risk.toLowerCase()}`}>
            </div>

            <small>{risk}</small>

          </div>

        ))}

      </div>


      <div className="peak-warning">

        <Clock size={17} />

        <div>
          <strong>Peak estimated risk</strong>
          <span>3:30 PM – 4:30 PM</span>
        </div>

      </div>

    </div>

  );
}


/* =========================
   RISK MAP PAGE
========================= */

function RiskMapPage() {

  return (

    <>

      <div className="page-header">

        <div>
          <h1>Risk Map</h1>
          <p>Explore real-time landslide risk across Northeast India.</p>
        </div>

      </div>

      <div className="full-map">

        <RiskMap />

      </div>

    </>

  );
}


/* =========================
   ALERT PAGE
========================= */

function AlertsPage() {

  return (

    <>

      <div className="page-header">

        <div>
          <h1>Alerts & Warnings</h1>
          <p>Important landslide warnings near your region.</p>
        </div>

      </div>


      <div className="alert-detail-grid">

        <div className="warning-card">

          <div className="warning-top">

            <div className="warning-icon">
              <AlertTriangle />
            </div>

            <span>HIGH RISK</span>

          </div>

          <h2>Landslide Warning</h2>

          <div className="warning-info">

            <p>
              <MapPin size={17} />
              NH-6, Meghalaya
            </p>

            <p>
              <Navigation size={17} />
              1.6 km from your location
            </p>

            <p>
              <Clock size={17} />
              Valid until 6:30 PM
            </p>

          </div>

          <p className="warning-message">
            Heavy rainfall and abnormal ground movement
            detected. Avoid this road until further notice.
          </p>

          <div className="warning-actions">

            <button className="danger-btn">
              <Map size={17} />
              View on Map
            </button>

            <button className="outline-btn">
              <Route size={17} />
              Find Safe Route
            </button>

          </div>

        </div>


        <div className="panel">

          <div className="panel-header">

            <div>
              <h3>Recent Alerts</h3>
              <p>Latest regional activity</p>
            </div>

          </div>

          <LiveAlerts />

        </div>

      </div>

    </>

  );
}


/* =========================
   SAFE ROUTE
========================= */

function SafeRoutePage() {

  return (

    <>

      <div className="page-header">

        <div>
          <h1>Safe Route</h1>
          <p>Find a route that avoids high-risk landslide zones.</p>
        </div>

      </div>


      <div className="route-container">

        <div className="route-form panel">

          <label>From</label>

          <div className="input-location">
            <MapPin size={17} />
            <input value="Shillong" readOnly />
          </div>


          <label>To</label>

          <div className="input-location">
            <MapPin size={17} />
            <input value="Cherrapunji" readOnly />
          </div>


          <button className="find-route">
            <Route size={18} />
            Find Safe Route
          </button>

        </div>


        <div className="route-options">

          <h3>Route Options</h3>

          <RouteCard
            route="Route A"
            time="42 min"
            distance="24 km"
            risk="HIGH LANDSLIDE RISK"
          />

          <RouteCard
            route="Route B"
            time="51 min"
            distance="32 km"
            risk="SAFE ROUTE"
            safe
          />

          <div className="safe-message">

            <ShieldCheck size={20} />

            <span>
              Route B avoids high-risk zones and
              landslide-prone areas based on real-time
              data and terrain analysis.
            </span>

          </div>

        </div>

      </div>

    </>

  );
}


function RouteCard({
  route,
  time,
  distance,
  risk,
  safe,
}) {

  return (

    <div className={`route-card ${safe ? "safe-route" : ""}`}>

      <div>

        <strong>{route}</strong>

        <h3>{time}</h3>

        <span>{distance}</span>

        <div className={`route-risk ${safe ? "safe" : ""}`}>
          {safe ? <ShieldCheck size={14} /> : <AlertTriangle size={14} />}
          {risk}
        </div>

      </div>

      <div className={`route-mini-map ${safe ? "green-route" : "red-route"}`}>
        <div></div>
      </div>

    </div>

  );
}


/* =========================
   REPORT PAGE
========================= */

function ReportPage() {

  const [selected, setSelected] = useState("Road blocked");

  const options = [
    "Fallen rocks",
    "Soil movement",
    "Road blocked",
    "Cracks on slope",
    "Other",
  ];

  return (

    <>

      <div className="page-header">

        <div>
          <h1>Report Landslide</h1>
          <p>Help authorities identify hazards faster.</p>
        </div>

      </div>


      <div className="report-panel panel">

        <div className="detected-location">

          <MapPin size={19} />

          <div>
            <strong>Location automatically detected</strong>
            <span>Sohra, East Khasi Hills, Meghalaya</span>
          </div>

        </div>


        <div className="report-grid">

          <div>

            <h3>What did you observe?</h3>

            <div className="radio-list">

              {options.map((option) => (

                <label key={option}>

                  <input
                    type="radio"
                    checked={selected === option}
                    onChange={() => setSelected(option)}
                  />

                  <span>{option}</span>

                </label>

              ))}

            </div>

          </div>


          <div>

            <h3>Upload Photo</h3>

            <div className="upload-box">

              <Upload size={30} />

              <strong>Click to upload</strong>

              <span>or drag and drop</span>

              <small>JPG, PNG · Max 5MB</small>

            </div>

          </div>

        </div>


        <div className="description">

          <h3>Description <span>(optional)</span></h3>

          <textarea
            placeholder="Add any additional details like time, nearby landmarks..."
          ></textarea>

        </div>


        <button className="submit-report">
          <Send size={18} />
          Submit Report
        </button>

      </div>

    </>

  );
}


export default App;