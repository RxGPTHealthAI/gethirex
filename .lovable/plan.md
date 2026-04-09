
## Batch Build Plan — New Pages Only (existing pages untouched)

### Batch 1: Core Pages
1. **How It Works** (`/how-it-works`) — 4-step workflow with animated counters
2. **Process** (`/process`) — 5-phase detailed breakdown with results table
3. **Customer Stories** (`/customer-stories`) — 10 case studies with metrics
4. **Team** (`/team`) — Leadership + Tech + HR + Marketing with real photos from docx

### Batch 2: Product Pages  
5. **Demo** (`/demo`) — Demo booking page with Calendly embed placeholder
6. **Pricing (unified)** (`/pricing`) — India + US pricing for both employers & candidates
7. **Integrations** (`/integrations`) — 50+ ATS/HRIS/Job Board integration grid

### Batch 3: FAQ Pages
8. **HR FAQ** (`/hr-faq`) — 200 employer Q&As with accordion
9. **Candidates FAQ** (`/candidates-faq`) — 200 candidate Q&As with accordion

### Batch 4: Legal Pages
10. **Privacy Policy** (`/privacy`)
11. **Refund Policy** (`/refund`)
12. **Terms of Service** (`/terms`)
13. **Security** (`/security`) — SOC2, encryption details
14. **GDPR** (`/gdpr`) — EU GDPR + India DPDP compliance
15. **Cookie Policy** (`/cookies`)

### Visual Direction
- AI-generated photorealistic images of professionals, HR teams, AI agents
- Animated agent interaction simulations (not emojis)
- Glass card UI with brand tokens
- GSAP scroll animations for key sections
- Real team photos from uploaded docx

### Technical
- All pages get routes in App.tsx
- Footer links updated to point to new pages
- GlobalNav updated with new links
- Team photos copied from parsed documents to src/assets/team/
