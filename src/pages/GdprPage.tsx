import LegalPage from '@/components/LegalPage';

const GdprPage = () => (
  <LegalPage title="GDPR Compliance">
    <p>Last updated: April 2026</p>
    <h2>Our Commitment to GDPR</h2>
    <p>HireX is fully compliant with the General Data Protection Regulation (EU GDPR) and the Indian DPDP Act.</p>
    <h2>Data Processing</h2>
    <p>We process personal data only with lawful basis — consent, contractual necessity, or legitimate interest. You can withdraw consent at any time.</p>
    <h2>Data Subject Rights</h2>
    <ul>
      <li>Right to access your personal data</li>
      <li>Right to rectification</li>
      <li>Right to erasure ("right to be forgotten")</li>
      <li>Right to data portability</li>
      <li>Right to object to processing</li>
    </ul>
    <h2>Data Protection Officer</h2>
    <p>For GDPR inquiries, contact our DPO at support@gethirex.space.</p>
  </LegalPage>
);

export default GdprPage;
