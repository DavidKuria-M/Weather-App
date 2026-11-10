# Weather Forecast Application

A sleek, responsive, and feature-rich weather web application built with vanilla JavaScript, Webpack, and modern CSS. It automatically detects the user's local position, performs reverse geocoding to retrieve readable place names, and interfaces with the Visual Crossing Weather API to deliver real-time current conditions and multi-day forecasts.


## Key Features

*   **Automatic Geolocation & Reverse Geocoding:** Automatically queries the browser's `navigator.geolocation` API on startup and translates coordinates into a human-readable city/town name using OpenStreetMap's Nominatim API.
*   **Comprehensive Weather Metrics:** Displays accurate current conditions including temperature, feels-like temperature, weather descriptions, dynamic FontAwesome icons, humidity, wind speed, atmospheric pressure, sunrise, and sunset times.
*   **5-Day Extended Forecast:** Renders detailed daily cards featuring high/low temperatures, conditions, and formatted dates.
*   **Persistent Search Bar:** Allows users to query any city or location worldwide, with the active search query staying preserved in the input box.
*   **Unit Conversion:** Seamlessly toggle between Metric (`°C`, `km/h`) and US Imperial (`°F`, `mph`) units.
*   **Code Quality Control:** Maintained with strict ESLint configurations to ensure clean, bug-free, and professional code standards.

---

##  Built With

*   **Core Languages:** JavaScript (ES6+ Modules), HTML5, CSS3
*   **Bundler & Tooling:** Webpack, Babel / ESLint
*   **APIs:** 
    *   [Visual Crossing Weather API](https://www.visualcrossing.com/) (Timeline weather data)
    *   [OpenStreetMap Nominatim API](https://nominatim.org/) (Reverse geocoding)
*   **Styling & Icons:** FontAwesome, Custom CSS Flexbox/Grid layouts

---

##  Getting Started

Follow these instructions to set up and run the project locally on your machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and npm installed on your system.

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/DavidKuria-M/Weather-App.git]
   cd weather-app