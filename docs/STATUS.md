# Implementierungsstand und Belege

## Leseregel

Diese Einordnung beruht auf statischer Inspektion des privaten Lotse-Quellstands bei der lokalen Vorbereitung. Sie trennt **Code vorhanden**, **Demo**, **Datenmodell**, **Ziel** und **hier ausgeführt**. Quellpfade in dieser Tabelle sind relative Referenzen in das private Projekt und absichtlich keine öffentlichen Links. Hashes des untersuchten Stands stehen in [PROVENANCE.json](../PROVENANCE.json). Der private README ist Kontext, nicht alleiniger Funktionsnachweis.

| Aussage | Einordnung | Relativer Quellbeleg | Einschränkung |
| --- | --- | --- | --- |
| Projektname Lotse | Quelle identifiziert | `README.md` | Showcase ist nicht das vollständige Produkt. |
| KMU-Onboarding und Dashboard | UI-Code vorhanden | `apps/kmu-demo/src/app/onboarding/page.tsx`; `apps/kmu-demo/src/app/dashboard/page.tsx` | Keine aktuelle Browserausführung in dieser Vorbereitung. |
| Multi-Source-Maßnahmen | Regelcode vorhanden | `packages/core-connector/src/measures/multi-source-generator.ts` | HR-Zuordnung und QM-Schlüsselwörter sind Heuristiken; keine fachliche Bestätigung. |
| Personio | Demo | `packages/core-connector/src/connectors/personio.ts` | `pull` liefert den eingebauten Datensatz; Kommentar suggeriert mehr als der untersuchte Code realisiert. Keine bestätigte Live-API. |
| HubSpot | Demo | `packages/core-connector/src/connectors/hubspot.ts` | Live-Pull wirft einen Fehler. Demo-Firmen nicht übernommen. |
| QM-Import | Einfacher Parser | `packages/core-connector/src/connectors/csv-import.ts` | `split` auf Zeilen/Semikolon; keine vollständige Behandlung gequoteter Felder und kein XLSX-Decoder. |
| Jira und Status | Demo plus nicht validierte Live-Pfade | `packages/core-connector/src/connectors/jira.ts`; `apps/kmu-demo/src/app/api/tickets/create-all/route.ts`; `apps/kmu-demo/src/app/dashboard/page.tsx` | Kein authentisierter Live-End-to-End-Test; Adapter gibt Connect-Tokens nicht als `meta.tokens` weiter, obwohl der Create-Pfad sie dort liest. |
| Reviewpflicht für Connectorhinweise | Core-Regel vorhanden | `packages/core-connector/src/compliance/assessment-engine.ts` | Treffer werden `partial` und reviewpflichtig; manuelle positive Antworten sind kein Nachweis einer berechtigten Freigabe. |
| Reviewer-Identität | Nicht abgesichert nachgewiesen | `apps/kmu-demo/src/app/api/assessment/run/route.ts`; `packages/core-connector/src/compliance/assessment-engine.ts` | `reviewedByPartner` wird aus Requestdaten verarbeitet; kein hier belegtes Auth-/Rollen-Gate. |
| Ticketexport und Fortschritt | **Hier ausgeführt** | `packages/core-connector/src/actions/ticket-export.ts` | Reine Objekte, keine Netzoperation; zählt `done` ohne Nachweisprüfung. Acht synthetische Tests bestanden. |
| Weitere Ticketziele | Typ-/Exportmodell | `packages/core-connector/src/compliance/types.ts` | Zieldeskriptoren sind keine implementierten Live-Connectoren. |
| Managementbericht/Auditpaket | Daten-Builder vorhanden | `packages/core-connector/src/reporting/report-model.ts` | Kein fertiges PDF/DOCX/XLSX; kein extern geprüftes Auditpaket. |
| Persistenz | Schema und optionale Codepfade | `supabase/migrations/003_compliance_product.sql`; `apps/kmu-demo/src/lib/supabase.ts`; `apps/kmu-demo/src/app/api/onboarding/complete/route.ts` | Keine angewandte Datenbank, RLS- oder Mandantenabnahme in diesem Showcase. |
| Menschliche Freigabe, Nachweisvault, KI-Unterstützung | Produktziel / teilweise Modelle | `docs/product/PRODUCT_BLUEPRINT.md`; `docs/product/CATALOG_AND_AI_POLICY.md` | Absichtserklärungen sind keine ausgelieferten Sicherheitskontrollen. |

## Bewusst keine Ergebnisbehauptung

Kein Kundenpilot, keine Zeitersparnis, keine Conversion-/Umsatzkennzahl, keine aktuelle Dependency-Auditbilanz, keine Zertifizierung und keine Freigabe des Rechtskatalogs werden aus den internen Planungsunterlagen übernommen. Insbesondere „vorhandener Code“ ist nicht gleich „getestete Integration“.

Die lokale Prüfung dieses Repositories beschränkt sich auf die veröffentlichten Auszüge, Dateiauswahl und Dokumentationsintegrität. [VERIFICATION.md](VERIFICATION.md) nennt die tatsächlich ausgeführten Befehle und Grenzen.
