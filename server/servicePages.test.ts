import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(process.cwd());
const read = (file: string) => readFileSync(resolve(projectRoot, file), "utf8");

describe("dedicated service pages", () => {
  it("preserves the supplied Commercial Cleaning Melbourne SEO and page content", () => {
    const page = read("client/src/pages/CommercialCleaningMelbournePage.tsx");
    expect(page).toContain('title="Commercial Cleaning Melbourne | Nexus Facility Group"');
    expect(page).toContain("Commercial cleaning in Melbourne's south-east and across Victoria.");
    expect(page).toContain("Commercial Cleaning Services in Melbourne");
    expect(page).toContain("Commercial Cleaning Across Melbourne's South-East");
    expect(page).toContain("Frequently Asked Questions");
    expect(page).toContain("Nexus Facility Group - Commercial Cleaning Melbourne");
    expect(page).toContain('href="/office-cleaning-melbourne"');
    expect(page).toContain('href="/areas"');
    expect(page).toContain('href="/pricing"');
  });

  it("preserves the supplied Office Cleaning Melbourne SEO and page content", () => {
    const page = read("client/src/pages/OfficeCleaningMelbournePage.tsx");
    expect(page).toContain('title="Office Cleaning Melbourne | Nexus Facility Group"');
    expect(page).toContain("Need reliable office cleaners in Melbourne?");
    expect(page).toContain("Office Cleaning Melbourne");
    expect(page).toContain("Office Cleaning Checklist: Daily, Weekly and Periodic Tasks");
    expect(page).toContain("Frequently Asked Questions About Office Cleaning Melbourne");
    expect(page).toContain("Nexus Facility Group — Office Cleaning Melbourne &");
    expect(page).toContain('href="/commercial-cleaning-melbourne"');
    expect(page).toContain('href="/areas"');
  });

  it("registers both pages and exposes canonical sitemap entries", () => {
    const app = read("client/src/App.tsx");
    const nav = read("client/src/components/Navigation.tsx");
    const services = read("client/src/pages/ServicesPage.tsx");
    const sitemap = read("client/public/sitemap.xml");
    expect(app).toContain('path="/commercial-cleaning-melbourne"');
    expect(app).toContain('path="/office-cleaning-melbourne"');
    expect(nav).toContain("Commercial Cleaning Melbourne");
    expect(nav).toContain("Office Cleaning Melbourne");
    expect(services).toContain('href: "/commercial-cleaning-melbourne"');
    expect(services).toContain('href: "/office-cleaning-melbourne"');
    expect(sitemap).toContain("https://www.nexusfacility.au/commercial-cleaning-melbourne");
    expect(sitemap).toContain("https://www.nexusfacility.au/office-cleaning-melbourne");
  });
});
