# Sicherheits- und Vertrauensmodell

## Geltungsbereich

Dieses Repository enthält Dokumentation, Typdefinitionen, eine reine Export-/Aggregationsfunktion und synthetische Tests. Es betreibt keinen Server, verarbeitet keine echten HR-/Kundendaten und verbindet keine externen Systeme. Es ist kein Sicherheitsprodukt zum Installieren und kein Nachweis eines unabhängigen Security-Audits.

Die private Anwendung wurde für dieses Showcase statisch untersucht, nicht gestartet, penetriert oder als sicher freigegeben. Frühere Dependency-Auditwerte werden nicht als aktueller Befund ausgegeben.

## Menschliche Entscheidungshoheit

Datenhinweise, heuristische Treffer und mögliche KI-Vorschläge dürfen fachliche Entscheidungen nur vorbereiten. Betroffenheit, positive Erfüllung, Risikoakzeptanz und Abschluss benötigen qualifizierte, berechtigte Menschen.

**Ist-Grenze:** Review-Flags und ein als `reviewedByPartner` bezeichnetes Eingabefeld sind kein manipulationssicherer Freigabeprozess. Die untersuchte Assessment-Route verarbeitet manuelle Antworten aus dem Request; eine vertrauenswürdige Reviewer-Identität ist damit nicht nachgewiesen. Die Demo kann Maßnahmen über simulierte Ticketstatus auf `done` setzen. Auch der öffentliche Exportauszug prüft keine Freigabe. Diese Grenzen sind ausdrücklich keine Produktionsfreigabe.

## Vertrauensgrenzen und offene Kontrollen

| Grenze | Vor realem Einsatz erforderlich; hier nicht nachgewiesen |
| --- | --- |
| Browser → API | Authentisierung, Autorisierung, vollständige Schema-/Größenvalidierung, CSRF-/Abuse-Konzept und passende Fehlerbehandlung. |
| Partner → Kundenmandant | Servergebundene Mandantenidentität, Least Privilege und getestete RLS-/Zugriffspolitik für jede Datenklasse. |
| HR/QM → Maßnahmen | Datenminimierung, Zweckbindung, Prüfung von Herkunft/Aktualität; Owner nur als Vorschlag behandeln. |
| Import → Auswertung | Robuste Parser, Grenzen für Datenmenge und Inhalt; Dateiformat und tatsächlichen Inhalt unterscheiden. |
| Ticketanbieter → fachlicher Abschluss | Status als Signal, nicht als Nachweis; geprüfter Abschluss benötigt Freigabe und Wirksamkeitsbeleg. |
| Token → Connector | Secret Store, minimale Scopes, Rotation, Widerruf und Logs ohne Secrets. Typen und Referenznamen beweisen keine sichere Speicherung. |
| Datenbank → Bericht | Nachweisbindung, Versionsstand, berechtigte Freigaben, Aufbewahrung/Löschung und nachvollziehbare Änderungen. |
| Künftige KI → Entscheidung | Kennzeichnung, Quellen, Versions-/Verarbeitungsgrenzen, Injection-Abwehr und keine autonome Rechts- oder Risikoentscheidung. |

Es wird weder EU-Hosting, Verschlüsselung ruhender Daten, DSGVO-Konformität noch manipulationssichere Auditierung als umgesetzt zugesagt. Dafür wären Architektur, Verträge, Konfiguration und reale Tests erforderlich.

## Öffentliche Auswahl

Übernommen wurden nur einzeln gelesene, unveränderte Quelldateien ohne echte Daten, Betriebswerte oder Netzoperationen. Nicht enthalten: private Git-Historie, `.env`-Dateien, Deployment-/Agentenkonfiguration, SQL-Migrationen, Marktstudien, Zugangsdaten, Kundenlisten, Demo-Personenbestände, Screenshots oder exportierte Nutzerdaten.

Die Hashes in [PROVENANCE.json](../PROVENANCE.json) und [MANIFEST.sha256](../MANIFEST.sha256) belegen Dateigleichheit bzw. Dateiintegrität, **nicht** Sicherheit, Urheberschaft oder Zertifizierung. Ein Muster-Scan ist nur eine zusätzliche Heuristik; die bewusste Dateiauswahl und Inhaltsprüfung bleiben notwendig.

## Vor einem Pilot

1. Scope und Katalog durch qualifizierte Fachpersonen prüfen; keine geschützten Normtexte ohne Rechte übernehmen.
2. Authentisierung, mandantengebundene Autorisierung und vertrauenswürdige Review-Zustandsübergänge implementieren und negativ testen.
3. Datensparsame, widerrufbare Connectorzugriffe mit synthetischen Daten end-to-end testen.
4. Nachweislebenszyklus, Aufbewahrung/Löschung und Incident-/Recovery-Prozesse festlegen und testen.
5. Berechtigte Freigabe für Umgang mit echten Daten separat einholen. Keine Pilotkennzahl vor einem reproduzierbaren Versuch behaupten.

Ein möglicher späterer öffentlicher Hinweis auf eine Schwachstelle sollte nur eine bereinigte Beschreibung enthalten, niemals Zugangsdaten oder echte Nachweise. Es besteht hier kein zugesagtes Bug-Bounty-, SLA- oder Disclosure-Programm.
