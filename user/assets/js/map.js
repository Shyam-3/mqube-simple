// ============================================
// MQUBE TUITIONS - GLOBAL CONFIGURATION
// ============================================

// GOOGLE MAPS LOCATION URL
// To change the map location, simply update the URL below.
// This change will automatically reflect across all pages.
// 
// How to get a new Google Maps embed URL:
// 1. Go to Google Maps (https://maps.google.com)
// 2. Search for your location
// 3. Click "Share" button
// 4. Click "Embed a map" tab
// 5. Copy the iframe src URL
// 
// OR use this format:
// https://maps.google.com/maps?q=YOUR_ADDRESS_HERE&t=&z=15&ie=UTF8&iwloc=&output=embed

const MQUBE_CONFIG = {
    mapUrl: "https://maps.google.com/maps?q=3/6%20Ganapathy%20Nagar,%20L%20Poolangulam,%20Madurai%2020&t=&z=15&ie=UTF8&iwloc=&output=embed"
};

// Apply map URL to iframes when page loads (footer + contact page map)
document.addEventListener('DOMContentLoaded', function() {
    if (!MQUBE_CONFIG.mapUrl) return;

    const mapIframes = document.querySelectorAll('.footer-map iframe, .contact-map-iframe');
    mapIframes.forEach((iframe) => {
        iframe.src = MQUBE_CONFIG.mapUrl;
    });
});
