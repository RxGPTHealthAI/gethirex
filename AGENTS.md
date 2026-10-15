# Architecture rules
- Public product showcases use the shared site layout, existing Button component, RouteSEO metadata, and sitemap entries so navigation and page discovery stay consistent.
- Embed product demos with privacy-enhanced YouTube players and stable 16:9 sizing; use verified titles without unsupported capability claims.
- RouteSEO owns canonical links; do not add a homepage canonical in index.html because it duplicates per-page canonicals.
- Interactive website previews live in focused components using local state and existing design-system controls; this keeps demonstrations isolated from production data, payments, and integrations.
- Enhance existing agent cards and journey content in place rather than duplicating catalogues; this preserves page content and a single source for advertised agent names.
- Institutional planning scenarios use component-local state, explicit allocation assumptions and guarded arithmetic; this avoids transmitting financial inputs or presenting estimates as returns.
- Candidate previews share page-specific sample data and reusable agent demonstration controls, with component-local selections; this keeps agent panels and simulations consistent without changing shared site controls or connected services.