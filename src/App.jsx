import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
   Polygon
} from "react-leaflet";

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
  FileText,
  Send,
  TrendingUp,
  Info,
  Languages,
   User,
} from "lucide-react";

import "./App.css";
const stateData = {
    Meghalaya: {
      districts: {
        Sohra: {
          risk: "HIGH",
          score: 87,
          rainfall: 182,
          soilMoisture: 78,
          status: "Warning",
        },
        Shillong: {
          risk: "MEDIUM",
          score: 58,
          rainfall: 82,
          soilMoisture: 59,
          status: "Watch",
        },
        "East Khasi Hills": {
          risk: "MEDIUM",
          score: 64,
          rainfall: 96,
          soilMoisture: 61,
          status: "Watch",
        },
      },
    },

    Assam: {
      districts: {
        Guwahati: {
          risk: "LOW",
          score: 31,
          rainfall: 42,
          soilMoisture: 38,
          status: "Safe",
        },
        "Dima Hasao" : {
          risk: "HIGH",
          score: 76,
          rainfall: 145,
          soilMoisture: 72,
          status: "Warning",
        },
      },
    },

    "Arunachal Pradesh": {
      districts: {
        Itanagar: {
          risk: "HIGH",
          score: 79,
          rainfall: 156,
          soilMoisture: 73,
          status: "Warning",
        },
        Tawang: {
          risk: "MEDIUM",
          score: 62,
          rainfall: 91,
          soilMoisture: 64,
          status: "Watch",
        },
      },
  },

  Sikkim: {
    districts: {
      Gangtok: {
        risk: "MEDIUM",
        score: 58,
        rainfall: 78,
        soilMoisture: 57,
        status: "Watch",
      },
    },
  },

  Mizoram: {
    districts: {
      Aizawl: {
        risk: "HIGH",
        score: 81,
        rainfall: 134,
        soilMoisture: 71,
        status: "Warning",
      },
    },
  },

  Nagaland: {
    districts: {
      Kohima: {
        risk: "MEDIUM",
        score: 55,
        rainfall: 71,
        soilMoisture: 54,
        status: "Watch",
      },
    },
  },

  Tripura: {
    districts: {
      Agartala: {
        risk: "LOW",
        score: 27,
        rainfall: 38,
        soilMoisture: 35,
        status: "Safe",
      },
    },
  },
};


function App() {
  const [activePage, setActivePage] = useState("Home");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [selectedDistrict, setSelectedDistrict] = useState("Sohra");
  const [selectedState, setSelectedState] = useState("Meghalaya");

  const [authPage, setAuthPage] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState({
    name: "Bhavesh",
    email: "bhavesh@example.com",
    role: "Citizen",
    phone: "9876543210",
  });

  const [showProfile, setShowProfile] = useState(false);
  
  const states = Object.keys(stateData);
  const districts = Object.keys(stateData[selectedState].districts);
  const currentDistrict = stateData[selectedState].districts[selectedDistrict];
  
  const handleStateChange = (state) => {
    setSelectedState(state);
    const firstDistrict = Object.keys(stateData[state].districts)[0];
    setSelectedDistrict(firstDistrict);
  };

  const navigation = [
    { name: "Home", icon: <Home size={19} /> },
    { name: "Risk Map", icon: <Map size={19} /> },
    { name: "Alerts", icon: <Bell size={19} /> },
    { name: "Safe Route", icon: <Route size={19} /> },
    { name: "Report Landslide", icon: <Camera size={19} /> },
    
  ];

  //notifications

  const [showNotifications, setShowNotifications] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "alert",
      title: "High Landslide Risk",
      message: "High landslide risk detected in Sohra, Meghalaya.",
      time: "2 min ago",
      read: false,
    },
    {
      id: 2,
      type: "report",
      title: "New Landslide Report",
      message: "A new landslide report was submitted from East Khasi Hills.",
      time: "10 min ago",
      read: false,
    },
    {
      id: 3,
      type: "alert",
      title: "Weather Alert",
      message: "Heavy rainfall may increase landslide risk.",
      time: "25 min ago",
      read: true,
    },
  ]);

  if (!isLoggedIn) {
    return authPage === "login" ? (
      <LoginPage
        setAuthPage={setAuthPage}
        setIsLoggedIn={setIsLoggedIn}
      />
    ) : (
      <RegisterPage
        setAuthPage={setAuthPage}
      />
    );
  }
  

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
            
          </div>

          <div className="location-selector">

              <label>State</label>

              <select
                value={selectedState}
                onChange={(e) =>
                  handleStateChange(e.target.value)
                }
              >
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>

              <label>District</label>

              <select
                value={selectedDistrict}
                onChange={(e) =>
                  setSelectedDistrict(e.target.value)
                }
              >
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>

          </div>
                    
        </div>

        <div className="sidebar-bottom">

          

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

            <div
              className="notification"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={20} />

              {notifications.some((n) => !n.read) && (
                <span className="notification-dot"></span>
              )}
            </div>

            {showNotifications && (
              <div className="notification-dropdown">

                <div className="notification-header">
                  <div>
                    <h3>Notifications</h3>
                    <span>
                      {notifications.filter((n) => !n.read).length} unread
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setNotifications(
                        notifications.map((notification) => ({
                          ...notification,
                          read: true,
                        }))
                      );
                    }}
                  >
                    Mark all read
                  </button>
                </div>

                <div className="notification-list">

                  {notifications.length === 0 ? (
                    <div className="no-notifications">
                      <Bell size={28} />
                      <p>No notifications</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`notification-item ${
                          !notification.read ? "unread" : ""
                        }`}
                      >

                        <div className={`notification-icon ${notification.type}`}>
                          {notification.type === "alert" ? (
                            <AlertTriangle size={18} />
                          ) : (
                            <FileText size={18} />
                          )}
                        </div>

                        <div className="notification-content">
                          <strong>{notification.title}</strong>

                          <p>{notification.message}</p>

                          <small>{notification.time}</small>
                        </div>

                      </div>
                    ))
                  )}

                </div>
              </div>
            )}

            <div className="profile"  onClick={() => setShowProfile(!showProfile)}>
              <div className="avatar">U</div>
              <div>
                <small>Hello,</small>
                <strong>{user.name}</strong>
              </div>
              <ChevronDown size={15} />
            </div>

            {showProfile && (
              <div className="profile-dropdown">

                <div className="profile-top">
                  <div className="profile-avatar">
                    <User size={25} />
                  </div>

                  <div>
                    <h3>{user.name}</h3>
                    <p>{user.role}</p>
                  </div>
                </div>

                <div className="profile-info">

                  <div className="profile-item">
                    <span>Name</span>
                    <strong>{user.name}</strong>
                  </div>

                  <div className="profile-item">
                    <span>Email</span>
                    <strong>{user.email}</strong>
                  </div>

                  <div className="profile-item">
                    <span>Role</span>
                    <strong>{user.role}</strong>
                  </div>

                  <div className="profile-item">
                    <span>Current Location</span>
                    <strong>
                      {selectedDistrict}, {selectedState}
                    </strong>
                  </div>

                </div>

                <button
                  className="logout-button"
                  onClick={() => {
                    setShowProfile(false);
                    setIsLoggedIn(false);
                  }}
                >
                  Logout
                </button>

              </div>
            )}

          </div>

        </header>

        {/* PAGE */}
        <div className="content">

          {activePage === "Home" && <HomePage
          selectedState={selectedState}
          selectedDistrict={selectedDistrict}
          district={currentDistrict}
          setActivePage={setActivePage}
          />}

          {activePage === "Risk Map" && <RiskMapPage />}

          {activePage === "Alerts" && <AlertsPage />}

          {activePage === "Safe Route" && <SafeRoutePage />}

          {activePage === "Report Landslide" && <ReportPage selectedState={selectedState}
          selectedDistrict={selectedDistrict} />}

        </div>

      </main>

    </div>
  );
}

//registration page

function RegisterPage({ setAuthPage }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Citizen",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    console.log("Registration Data:", formData);

    alert("Registration successful! Please login.");

    setAuthPage("login");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Register to access NER Landslide Watch</p>
        </div>

        <form onSubmit={handleRegister}>

          <div className="auth-field">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label>Role</label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="Citizen">Citizen</option>
              <option value="Student">Student</option>
              <option value="Government">Government Official</option>
              <option value="Disaster Management">Disaster Management</option>
              <option value="Researcher">Researcher</option>
            </select>
          </div>

          <div className="auth-field">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Create Account
          </button>

        </form>

        <div className="auth-switch">
          Already have an account?

          <button
            type="button"
            onClick={() => setAuthPage("login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

//login page

function LoginPage({ setAuthPage, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Login:", {
      email,
      password,
    });

    // Temporary frontend login
    // Later this will connect to our backend API.
    setIsLoggedIn(true);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-header">
          <h1>Welcome Back 👋</h1>
          <p>Login to NER Landslide Watch</p>
        </div>

        <form onSubmit={handleLogin}>

          <div className="auth-field">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Login
          </button>

        </form>

        <div className="auth-switch">
          Don't have an account?

          <button
            type="button"
            onClick={() => setAuthPage("register")}
          >
            Create Account
          </button>
        </div>

      </div>
    </div>
  );
}


/* =========================
   HOME PAGE
========================= */

function HomePage({
  selectedState,
  selectedDistrict,
  district,
  setActivePage
}) {
  const hour = new Date().getHours();

    let greeting;

    if (hour < 12) {
      greeting = "Good morning";
    } else if (hour < 18) {
      greeting = "Good afternoon";
    } else {
      greeting = "Good evening";
    }
      

  return (
    <>

      <div className="page-header">

        <div>
          <h1>{greeting} 👋</h1>
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

            <h2>{district.risk}</h2>

            <p>
             Your location: <b>{selectedDistrict}, {selectedState}</b>
            </p>

          </div>

        </div>


        <MetricCard
          icon={<CloudRain />}
          title="Rainfall"
          value={`${district.score} %`}
          description="Last 24 hours"
          status="High"
        />

        <MetricCard
          icon={<Droplets />}
          title="Soil Moisture"
          value={`${district.soilMoisture} %`}
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

        <div className="home-map-panel">
          <div className="map-header">
            <div>
              <h3>Live Risk Map</h3>
              <p>Landslide risk monitoring across Northeast India</p>
            </div>

            <button
              className="view-map-btn"
              onClick={() => setActivePage("risk-map")}
            >
              View Full Map
            </button>
          </div>

          <RealRiskMap />
        </div>

        <LiveAlerts />

      </div>


      {/* LOWER SECTION */}

      <div className="bottom-grid">

        <AIRisk district={district} />

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
          <div className="map-layers">
            <label className="layer-option">
              <input type="radio" name="mapType" value="satellite" />
              <span>Satellite</span>
            </label>

            <label className="layer-option">
              <input type="radio" name="mapType" value="terrain" />
              <span>Terrain</span>
            </label>
          </div>
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

function AIRisk({district}) {

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
            <strong>{district.score}</strong>
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
          <p>
            Real-time landslide risk monitoring across Northeast India.
          </p>
        </div>
      </div>

      <div className="risk-map-panel">
        <RealRiskMap />
      </div>
    </>
  );
}


/* =========================Y
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
  const [from, setFrom] = useState("Shillong");
  const [to, setTo] = useState("Cherrapunji");
  const [routeFound, setRouteFound] = useState(false);

  const handleFindRoute = () => {
    if (from.trim() && to.trim()) {
      setRouteFound(true);
    }
  };

  const locations = [
    "Shillong",
    "Cherrapunji",
    "Guwahati",
    "Aizawl",
    "Kohima",
    "Gangtok",
    "Itanagar",
    "Tawang",
    "Agartala",
  ];

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Safe Route</h1>
          <p>Find a route that avoids high-risk landslide zones.</p>
        </div>
      </div>

      <div className="route-container">

        {/* ROUTE FORM */}
        <div className="route-form panel">

          <label>From</label>

          <div className="input-location">
            <MapPin size={17} />

            <select
              value={from}
              onChange={(e) => {
                setFrom(e.target.value);
                setRouteFound(false);
              }}
            >
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>


          <label>To</label>

          <div className="input-location">
            <MapPin size={17} />

            <select
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
                setRouteFound(false);
              }}
            >
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>


          <button
            className="find-route"
            onClick={handleFindRoute}
            disabled={!from.trim() || !to.trim()}
          >
            <Route size={18} />
            Find Safe Route
          </button>

        </div>


        {/* ROUTE OPTIONS */}
        <div className="route-options">

          <h3>Route Options</h3>

          {!routeFound ? (
            <div className="route-placeholder">
              <MapPin size={25} />
              <p>Enter your starting point and destination.</p>
            </div>
          ) : (
            <>
              <div className="route-found">
                <strong>{from}</strong>
                <span> → </span>
                <strong>{to}</strong>
              </div>

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
            </>
          )}

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

function RealRiskMap() {

  const [userLocation, setUserLocation] = useState(null);
  

  const dangerZones = [
    {
      id: 1,
      name: "Sohra High Risk Zone",
      risk: "HIGH",
      coordinates: [
        [25.480, 91.350],
        [25.495, 91.370],
        [25.475, 91.395],
        [25.450, 91.385],
        [25.440, 91.360],
      ],
    },
    {
      id: 2,
      name: "East Khasi Hills Risk Zone",
      risk: "HIGH",
      coordinates: [
        [25.550, 91.850],
        [25.570, 91.880],
        [25.550, 91.900],
        [25.525, 91.880],
      ],
    },
  ];

  

  return (
    <MapContainer
      center={[25.467, 91.366]}
      zoom={7}
      className="real-risk-map"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {dangerZones.map((zone) => (
        <Polygon
          key={zone.id}
          positions={zone.coordinates}
          pathOptions={{
            color: "red",
            fillColor: "red",
            fillOpacity: 0.35,
            weight: 2,
          }}
        >
          <Popup>
            <strong>{zone.name}</strong>
            <br />
            Risk Level: <b>{zone.risk}</b>
          </Popup>
        </Polygon>
      ))}

      <Marker position={[25.467, 91.366]}>
        <Popup>
          <strong>Sohra, Meghalaya</strong>
          <br />
          Landslide Risk: HIGH
        </Popup>
      </Marker>

     

      <Marker position={[26.1445, 91.7362]}>
        <Popup>
          <strong>Guwahati, Assam</strong>
          <br />
          Landslide Risk: LOW
        </Popup>
      </Marker>

    </MapContainer>
  );
}


/* =========================
   REPORT PAGE
========================= */

function ReportPage({ selectedState, selectedDistrict }) {

  const [selected, setSelected] = useState("Road blocked");
  const [photo, setPhoto] = useState(null);

    const handlePhotoUpload = (e) => {
      const file = e.target.files[0];

      if (!file) return;

      // Only allow images
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file.");
        return;
      }

      setPhoto(file);
    };

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

        <div className="report-location">

        <label>Location</label>

        <div className="input-location">
          <MapPin size={17} />

          <input
            type="text"
            value={`${selectedDistrict}, ${selectedState}`}
            readOnly
          />

          <span className="location-auto">
            Auto
          </span>
        </div>

        <p className="location-help">
          Location automatically selected from your dashboard location.
        </p>

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


          <div className="photo-upload-section">

              <label className="report-label">
                Upload Photo
              </label>

              <label className="photo-upload-box">

                {!photo ? (
                  <>
                    <Upload size={30} />

                    <strong>Upload a photo</strong>

                    <span>
                      Click here to select an image
                    </span>

                    <small>
                      JPG, PNG or WEBP
                    </small>
                  </>
                ) : (
                  <div className="photo-preview">

                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Landslide preview"
                    />

                    <span className="photo-name">
                      {photo.name}
                    </span>

                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  hidden
                />

              </label>

              {photo && (
                <button
                  type="button"
                  className="remove-photo"
                  onClick={() => setPhoto(null)}
                >
                  Remove Photo
                </button>
              )}

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