import AppRouter, { SubDomainRouter } from "../AppRouter";

/**
 * subDomainList
 * * An array of objects defining the routing configuration for different subdomains.
 * This acts as the central registry mapping subdomains to their respective top-level router components.
 * * @type {Array<{subdomain: string, app: React.Component|Function, main: boolean}>}
 */
export const subDomainList = [
    {
        // The default "www" subdomain or base domain without a subdomain.
        subdomain: "www", 
        // The main application router (e.g., handles marketing pages, dashboard, auth).
        app: AppRouter,   
        // Flags this as the default application to load if no other subdomain matches.
        main: true        
    },
    {
        // The "url" subdomain (e.g., url.yourdomain.com).
        subdomain: "url", 
        // The specialized router for handling short link resolution and redirection.
        app: SubDomainRouter, 
        // Not the default application.
        main: false       
    }
];
