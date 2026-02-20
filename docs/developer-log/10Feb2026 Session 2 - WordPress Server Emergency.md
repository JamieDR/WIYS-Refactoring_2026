# Session 2 — February 10, 2026
## WordPress Server Emergency

**Duration:** ~2 hours
**Branch:** N/A (no code changes)
**Commits:** 0

---

### Summary
Emergency server triage session. The WordPress server was at 100% CPU and the API was returning 403 errors. Diagnosed both issues and resolved them. No code changes to the Apps Script codebase.

---

### What We Did

#### 1. Server at 100% CPU — Kit Plugin
**Symptom:** wheninyourstate.com unresponsive, Cloudways dashboard showing sustained 100% CPU.

**Root cause:** The Kit (formerly ConvertKit) WordPress plugin was running infinite database scans across all 11,000+ posts, searching for shortcodes that didn't exist in any of them. Each scan triggered a full table scan of `wp_posts`, and the plugin was re-triggering itself in a loop.

**Fix:** Deactivated the Kit plugin from the WordPress admin panel. CPU recovered immediately.

**Lesson:** Email marketing plugins that scan post content can be dangerous on large sites. If Kit is needed later, it should be configured to only scan new posts, not the entire archive.

#### 2. API Calls Returning 403 — Cloudflare Under Attack Mode
**Symptom:** All WordPress REST API calls from Google Apps Script were failing with 403 Forbidden. The batch functions (upload, schedule, etc.) were completely broken.

**Root cause:** Cloudflare's "Under Attack Mode" had been turned on (likely during the CPU crisis as a defensive measure). This mode challenges every request with a JavaScript challenge page — which API calls can't solve, so they all fail.

**Fix:**
1. Turned off Under Attack Mode in Cloudflare dashboard
2. Added a WAF rule exception for `/wp-json/*` so API calls bypass Cloudflare's challenge even if Under Attack Mode is turned on again in the future

---

### Code Stats
- **Lines changed:** 0
- **Functions modified:** 0
- No code changes — this was entirely server/infrastructure triage

---

### Still TODO (from this session)
- **Whitelist Bingbot in Cloudflare** — discovered during investigation that Bingbot was also being blocked (added as TODO #14)
- **Re-enable Breeze caching plugin** — was disabled during troubleshooting, needs careful re-enablement (added as TODO #15)

---

### Jamie's Progress Assessment

**Good signs:**
- Responded quickly to the server emergency and escalated appropriately
- Followed the diagnostic process step by step instead of panicking
- Learned the relationship between WordPress plugins, database load, and server CPU — a real-world lesson in why plugin management matters

**Areas to develop:**
- Understanding Cloudflare's protection modes and when they help vs. hurt (Under Attack Mode is nuclear — it blocks everything including legitimate API traffic)
- Getting comfortable checking Cloudways server metrics independently to diagnose future issues
