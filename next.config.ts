import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Allows accessing the dev server from another device on the LAN (e.g.
  // testing on a phone/tablet, or via the "Network:" URL Next.js prints
  // itself) — without this, Next.js 16's dev-mode cross-origin protection
  // silently blocks in-app requests (like the locale switcher's navigation)
  // whenever the page is loaded from anything other than localhost.
  allowedDevOrigins: ["192.168.1.9"],
};

export default withNextIntl(nextConfig);
