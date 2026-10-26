# Cyber Security Connector — Forschungs-Showcase

**Vorhandene HR-, Qualitäts- und Onboarding-Daten in nachvollziehbare Maßnahmen, Aufgaben und Nachweise übersetzen.**

Der private Forschungsprototyp heißt im Quellcode **Lotse**. Er untersucht, wie kleine und mittlere Unternehmen und ihre Cyber-Security-Partner vorhandene Informationen für eine strukturierte Sicherheits-Arbeitsstrecke nutzen können: Welche Aufgaben fehlen, wer könnte sie bearbeiten und welche Hinweise müssen fachlich geprüft werden?

Dies ist eine **kuratierte technische Ansicht**, keine vollständige Anwendung, kein veröffentlichtes Produkt und kein einsatzbereites Compliance-System. Das Hauptprojekt bleibt privat. Dieses eigenständige Showcase wird mit Freigabe des Eigentümers öffentlich bereitgestellt; der vollständige Produktcode und seine Git-Historie bleiben privat.

## Produktidee und Verantwortung

```text
Onboarding + HR/Organigramm + QM/Prozessdaten
                 ↓
    normalisierte Datensätze mit Herkunft
                 ↓
   regelbasierte Vorschläge und Maßnahmen
                 ↓
       fachliche Prüfung durch Menschen
                 ↓
 optionale Tickets → Fortschritt → Nachweisprüfung
                 ↓
    Management- und Auditdokumentation (Ziel)
```

Der Nutzen liegt nicht im automatischen Bescheinigen von Sicherheit, sondern im Vorbereiten einer überprüfbaren Arbeitsgrundlage. Ticketing ist optional; ein Maßnahmenplan kann bereits aus Onboarding-Antworten entstehen. Partner-CRM ist ein separater Intake-Pfad, keine Voraussetzung für den Maßnahmenplan.

**Menschliche Freigabe ist eine Produktanforderung, noch kein durchgängig erzwungenes Sicherheitsmerkmal.** Positive Wirksamkeitsbestätigungen, Risikoakzeptanzen, Rechtsentscheidungen und der fachliche Abschluss einer Maßnahme müssen bei berechtigten Menschen bleiben. Die aktuelle Demo und die gezeigten Exportfunktionen erzwingen diese Grenze nicht vollständig.

## Was ist vorhanden, was ist geplant?

„Vorhanden“ bedeutet hier: im privaten Quellcode durch statische Inspektion identifiziert. Nur der kleine öffentliche Codeauszug wurde in diesem Showcase ausgeführt. Frühere Test- oder Auditangaben des privaten README werden nicht als aktuelle Ergebnisse übernommen.

| Bereich | Ehrliche Einordnung |
| --- | --- |
| KMU- und Partneroberfläche | Next.js-/React-Demos mit Onboarding, Marketplace und Dashboard vorhanden; kein hier ausgeführter Browser- oder Deploymentnachweis. |
| Maßnahmen aus mehreren Quellen | Regelbasierter Generator vorhanden: Onboarding erzeugt den Basisplan, HR ergänzt Owner-Vorschläge, QM ergänzt Prozesshinweise. Heuristiken ersetzen keine fachliche Prüfung. |
| HR / Personio | Demo-Adapter liefert einen fest eingebauten Datensatz. Der untersuchte `pull`-Pfad ruft keine Personio-Live-API auf. |
| QM / Prozessimport | Einfacher, semikolongetrennter CSV-Parser vorhanden. Kein vollständiger CSV-Standardparser, kein nativer XLSX-Import und kein Nachweis einer QM-Herstellerintegration. |
| Partner-CRM / HubSpot | Demo-Kundenimport vorhanden; der Live-Pfad wirft ausdrücklich einen Fehler. |
| Ticketing / Jira | Mock-Tickets und simulierte Statusänderungen vorhanden; Live-Codepfade sind kein Nachweis eines funktionierenden, autorisierten End-to-End-Connectors. |
| Weitere Ticketziele | Namen im Export-Datenmodell, keine bestätigten Azure-DevOps-, Asana- oder ServiceNow-Integrationen. |
| Assessment / Nachweise | Regelbasierte Vorbefüllung mit Quellenreferenzen, Konfidenz und Review-Flag vorhanden. Keine geprüfte Nachweisablage oder unabhängige Wirksamkeitsprüfung. |
| Berichte / Auditpakete | Datenmodelle und Builder vorhanden; kein fertiger PDF-/DOCX-/XLSX-Renderer, kein Audit- oder Zertifizierungsnachweis. |
| Datenbank | Supabase-/Postgres-Migrationen vorhanden; Migration ist kein Nachweis für angewandtes Schema, Mandantentrennung oder produktive Persistenz. |
| KI | KI-Unterstützung ist ein möglicher Ausbau. Der hier beschriebene Maßnahmen-/Assessment-Pfad arbeitet regelbasiert; keine validierte KI-Produktfunktion behauptet. |
| Betrieb / Sicherheit | Authentisierung, Autorisierung, durchgängige Review-Gates, sichere Tokenverwaltung, RLS und Betriebsprozesse sind vor realen Daten gesondert umzusetzen bzw. zu prüfen. |

Details und genaue Quellbelege: [Implementierungsstand](docs/STATUS.md), [Architektur](docs/ARCHITECTURE.md) und [Sicherheitsmodell](docs/SECURITY.md).

## Kleiner unveränderter Originalauszug

Enthalten sind eine reine TypeScript-Datei für **Ticket-Exportdatensätze und Fortschrittsberechnung** sowie ihre zwei Typabhängigkeiten. Sie illustrieren die Trennung zwischen kanonischer Maßnahme und austauschbarem Ticketziel. Keine Funktion in diesem Auszug ruft ein Kundensystem auf.

Mit Node.js ab 22.18, ohne externe Pakete, Zugangsdaten oder private Quelldateien:

```bash
npm test
shasum -a 256 -c MANIFEST.sha256
```

Die acht Tests nutzen ausschließlich neu erstellte synthetische Maßnahmen. Sie prüfen Exportfelder, Prioritäten, leere und optionale Werte, Eingabeerhalt und Fortschrittszählung. Ein Test dokumentiert ausdrücklich die Grenze: `done` zählt auch ohne geprüften Nachweis als erledigt. Der berechnete Prozentwert ist **kein Sicherheits- oder Compliance-Score**.

- [Komponenten und Grenzen](components/README.md)
- [Prüfumfang und tatsächliche Ergebnisse](docs/VERIFICATION.md)
- [Relative Herkunft und SHA-256-Hashes](PROVENANCE.json)
- [Dateimanifest](MANIFEST.sha256)

## Nicht zugesagt

Keine automatische NIS-2-/BSIG-Konformität, ISO-Zertifizierung, Rechtsberatung, bestätigte Betroffenheitsprüfung, Kundenwirkung, Zeitersparnis, Produktionsreife, sichere Mehrmandantenfähigkeit oder erfolgreiche Live-Integration. NIS-2 ist hier ein Forschungs- und Modellierungskontext, kein fachlich freigegebener Compliance-Katalog. Es werden keine Pilotkennzahlen als erreichte Ergebnisse dargestellt.

## Rechte und Veröffentlichungsgrenze

Texte und ausgewählte Originalauszüge bleiben **proprietär**; siehe [LICENSE](LICENSE). Öffentlich einsehbar bedeutet nicht Open Source. Dieses eigenständige Repository enthält keine private Git-Historie, Betriebs- oder Zugangskonfiguration, Kundendaten, internen Marktstudien oder fremden Normtexte. Bilder und Datenbestände aus der privaten Demo werden bewusst nicht übernommen.
