import { subDomainList } from "./constant";

/**
 * Determines which application to render based on the current subdomain.
 * It checks the hostname, extracts the subdomain, and matches it against 
 * the defined list of subdomains in `constant.js`.
 *
 * @returns {React.Component|Function} The React component corresponding to the matched subdomain, 
 * or the main application if no subdomain or match is found.
 */
export const getApps = () => {
    // 1. Extract the subdomain from the current URL hostname
    const subdomain = getSubDomain(window.location.hostname);

    // 2. Identify the default "main" application from the configuration
    const mainApp = subDomainList.find((app) => app.main);

    // 3. If there is no subdomain (e.g., just "localhost" or "urlbestshort.com"), return the main app
    if (subdomain === "") return mainApp.app;

    // 4. Look for a specific application that matches the extracted subdomain
    const apps = subDomainList.find((app) => subdomain === app.subdomain);

    // 5. Return the matched application, or fallback to the main app if the subdomain isn't recognized
    return apps ? apps.app : mainApp.app;
}

/**
 * Extracts the subdomain string from a full hostname URL.
 * Handles both local development environments (localhost) and production domains.
 * * Examples:
 * - "admin.localhost" -> "admin"
 * - "app.urlbestshort.com" -> "app"
 * - "urlbestshort.com" -> "" (empty string)
 *
 * @param {string} location - The full hostname (e.g., window.location.hostname).
 * @returns {string} The extracted subdomain, or an empty string if none exists.
 */
export const getSubDomain = (location) => {
    // Split the hostname into an array of its parts (e.g., ["app", "urlbestshort", "com"])
    const locationParts = location.split(".");
    
    // Check if the environment is local development
    const isLocalhost = locationParts.slice(-1)[0] === "localhost";
    
    // Determine how many parts from the END of the array to slice off.
    // - Localhost only has one TLD-like part ("localhost"), so we slice the last 1.
    // - Production domains usually have two (e.g., "example", "com"), so we slice the last 2.
    // Note: This assumes a standard domain structure and might need adjustment for complex TLDs like ".co.uk"
    const sliceTill = isLocalhost ? -1 : -2;
    
    // Take all the parts BEFORE the sliced portion and join them back together.
    // What remains is the subdomain.
    return locationParts.slice(0, sliceTill).join("");
};