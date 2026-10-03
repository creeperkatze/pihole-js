import { version } from "../../package.json";
import { defineDocsConfig } from "./shared/docs";

export default defineDocsConfig({
  name: "pihole-js",
  description: "A framework-agnostic fully typed JavaScript client for the Pi-hole API.",
  repo: "creeperkatze/pihole-js",
  version,
  guide: [
    { text: "Getting Started", link: "/guide/getting-started" },
    { text: "Authentication", link: "/guide/authentication" },
    { text: "Sessions and Fetch", link: "/guide/sessions-and-fetch" },
    { text: "Error Handling", link: "/guide/error-handling" },
    { text: "Blocking", link: "/guide/blocking" },
    { text: "Domain Management", link: "/guide/domain-management" },
  ],
  api: new URL("../api", import.meta.url),
  nav: [
    { text: "Projects", link: "/#projects" },
  ],
});
