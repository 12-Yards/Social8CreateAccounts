---
name: Embedded vendor authentication
description: Cross-site vendor portal login can succeed while its dashboard auth check falls back to sign-in.
---

The vendor portal's embedded sign-in already redirects to its dashboard route. When the iframe is cross-site, a successful login toast followed by the sign-in form means the dashboard auth check cannot read the session cookie; iframe storage permission alone does not fix this.

**Why:** The vendor portal keeps authentication in its own cookie and does not expose a token or postMessage handoff to the host site.

**How to apply:** Keep the vendor UI embedded as the single source of truth, and configure the vendor platform's session cookie for embedded use (`SameSite=None; Secure`) or implement its Storage Access flow. Do not duplicate the vendor forms in the marketing site as a workaround.