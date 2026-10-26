# Architektur und Datenfluss

## Beobachtete Struktur des privaten Prototyps

```text
KMU-Demo                       Partner-Demo
Onboarding / Dashboard         Kunden-Intake / Connect / Dashboard
          \                    /
           gemeinsamer TypeScript-Core
          /          |             \
normalisierte    Maßnahmen-       Assessment-Engine
Datensätze       Generator        + versionierter Katalog
     |               |                     |
HR-Demo / QM-CSV   Owner- und          Antwort / Hinweis
                 Prozesshinweise     Quelle / Konfidenz / Review
                     |                     |
             Demo-Ticketing         Export- und Berichtsmodelle

Separat vorhanden: Supabase/Postgres-Schemagrundlagen
Nicht gleichbedeutend mit: betriebener, abgesicherter Persistenz
```

Next.js/React bilden die beiden Demooberflächen. Der gemeinsame Core enthält Connector-Interfaces, normalisierte Datensätze, regelbasierte Ableitung, Ticketmodelle und Berichtsmodelle. Das private Projekt ist ein npm-Workspace-Monorepo. Dieses Showcase ist dagegen ein eigenständiges, kleines Repository ohne Framework- oder Laufzeitabhängigkeiten.

## Zwei verwandte, aber nicht identische Pfade

### 1. Onboarding-Demo

Der untersuchte KMU-Onboarding-Pfad ruft `generateMeasuresFromSources` auf. Ein regelbasierter Basisgenerator erstellt Maßnahmen aus den Antworten. HR-Datensätze ergänzen vermutete Verantwortliche anhand von Abteilungen; QM-Datensätze ergänzen Prozessbezüge anhand von Schlüsselwörtern. Ein erkannter Prozess belegt weder Aktualität noch Wirksamkeit.

Die Demo speichert lokal und sendet einen Onboarding-Request. Das Dashboard lädt den lokalen Stand und simuliert Ticketstatus. Diese UI ist **nicht** als durchgängige Oberfläche des neueren Assessment-/Reviewmodells nachgewiesen.

### 2. Assessment-Grundlage

Die untersuchte Assessment-Route kombiniert Katalog, normalisierte Datensätze und manuelle Antworten. `runAssessment` liefert Antworten und Maßnahmen. Passende Connector-Schlüsselwörter führen höchstens zu `partial` mit `requiresReview: true`; fehlende Hinweise zu `unknown`. Konfidenz ist eine Regelheuristik, keine statistisch kalibrierte Sicherheit.

Manuelle Antworten und das Feld `reviewedByPartner` werden aus der Eingabe verarbeitet. Der untersuchte Pfad beweist keine serverseitig berechtigte Freigabe. Ticketexport-, Managementbericht- und Auditpaket-Builder erzeugen strukturierte Daten, keine fertigen Dokumentdateien oder rechtlich geprüften Aussagen.

## Kanonischer Stand und optionale Connectoren

Das Ziel ist, Maßnahmen und Nachweise unabhängig vom Ticketanbieter zu führen. HR und QM liefern Eingangsdaten; Ticketing konsumiert Maßnahmen. Partner-CRM unterstützt die Kundenanlage separat. Ein Connector-Interface oder ein Marketplace-Eintrag ist kein Beleg für eine Live-Anbindung.

Der veröffentlichte Originalauszug zeigt ausschließlich die Transformation von Maßnahmen in Exportdatensätze und die Statusaggregation. Namen wie `jira` oder `asana` sind dort Zielkennzeichen, keine Netzoperationen.

## Zielarchitektur, noch nicht durchgängig realisiert

Vor echten Daten werden authentisierte Akteure, mandantengebundene Zugriffe und ein serverseitiger Review-Zustandsautomat benötigt. Positive Bestätigung, Risikoakzeptanz und fachlicher Abschluss müssen Berechtigung, geprüften Nachweis, Begründung und Version voraussetzen. Ein Ticketstatus darf diesen Zustand nicht selbstständig setzen.

Persistenz muss Quelle, Katalogversion, Nachweisstand und Freigaben nachvollziehbar verknüpfen. Tokenablage, RLS, Löschregeln, Auditereignisse, idempotenter Export und Status-Rückfluss benötigen eigene Abnahme. Vorhandene SQL-Tabellen oder Typfelder sind nur Grundlagen dafür, keine Sicherheitsgarantie.

Quellbelege und Einordnung: [STATUS.md](STATUS.md). Vertrauensgrenzen: [SECURITY.md](SECURITY.md).
