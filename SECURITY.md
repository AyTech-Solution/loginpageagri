# Security Policy 🔒

At **AyTech Solution**, we take the security of our agricultural infrastructure and authentication frameworks very seriously. If you find a security vulnerability, we appreciate your help in reporting it to us responsibly.

---

## Supported Versions

We actively monitor and patch the current production deployment of **AgriPortal**. Please ensure you are running the latest state of the main branch.

| Version | Supported |
| :--- | :--- |
| v1.0.x |  Yes |
| < v1.0.0 | ❌ No |

---

## Reporting a Vulnerability

**Please do not open a public GitHub Issue for security-related bugs.** Publicly disclosing a vulnerability can expose user data or system integrity.

Instead, please report security vulnerabilities through the proper channel:

1. Send an email detailing the vulnerability to **teamaytech@gmail.com** .
2. Include a detailed description of the issue, steps to reproduce the bug, and the potential impact.
3. The team at **AyTech Solution** will acknowledge your report within 48 hours and provide a timeline for the fix.

## Our Practices

- **Zero API Key Leakage:** We enforce that no Firebase production keys or active secrets are committed to the version control system. All integrations utilize `.env` runtime injection.
- **Dependency Audits:** Automated dependency tracking is used to ensure all security patches on underlying packages are kept up to date.

---
*Thank you for helping keep AyTech Solution applications secure!*
