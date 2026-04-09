import LegalPage from '@/components/LegalPage';

const SecurityPage = () => (
  <LegalPage title="Security — SOC2 Certified">
    <p>Last updated: April 2026</p>
    <h2>Our Security Commitment</h2>
    <p>HireX maintains SOC2 Type II certification and implements enterprise-grade security measures to protect your data.</p>
    <h2>Data Encryption</h2>
    <p>All data is encrypted at rest (AES-256) and in transit (TLS 1.3). Database backups are encrypted and stored in geographically distributed locations.</p>
    <h2>Access Controls</h2>
    <p>Role-based access control (RBAC), multi-factor authentication, and audit logging are enforced across all systems.</p>
    <h2>Infrastructure</h2>
    <p>HireX runs on Google Cloud Platform with automated scaling, redundancy, and 99.9% uptime SLA.</p>
    <h2>Compliance</h2>
    <ul>
      <li>SOC2 Type II Certified</li>
      <li>GDPR Compliant</li>
      <li>DPDP Act Compliant</li>
      <li>ISO 27001 (in progress)</li>
    </ul>
    <h2>Vulnerability Reporting</h2>
    <p>Report security vulnerabilities to support@gethirex.space. We respond within 24 hours.</p>
  </LegalPage>
);

export default SecurityPage;
