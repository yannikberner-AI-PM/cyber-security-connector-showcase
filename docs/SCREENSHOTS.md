# App-Bilder: Herkunft und Grenzen

Die Bilder machen die Arbeitsstrecke prüfbar: Datenquellen auswählen, Vorschläge prüfen, Aufgaben verfolgen. Es sind vollständige Browseraufnahmen einer tatsächlich gestarteten Lotse-KMU-App, keine nachgebauten HTML-Mockups und keine zusammengesetzten Bilder. Die private Anwendung selbst wird nicht veröffentlicht.

## Isolierter Lauf am 26. Oktober 2026

- Nur versionierte App-, Paket-, Build- und Testdateien wurden in eine neue Scratch-Kopie übernommen. Kein privates Git-Verzeichnis, keine `.env`-Dateien, Datenbank oder Betriebsdaten.
- Frische Installation mit `npm ci`. Der Originalstand mit Next.js 16.4.0 meldete ein kritisches betroffenes Paket. `release:gate` verweigerte die Freigabe nach 25 bestandenen Security-Tests. Auditquellen: [Image-API](https://github.com/advisories/GHSA-2464-fhr4-w9xw), [Server Actions](https://github.com/advisories/GHSA-p3m5-59mp-jv5r), [use cache](https://github.com/advisories/GHSA-673q-mjm6-r5xr).
- Nur die isolierte Kopie wurde auf Next.js 16.4.3 aktualisiert. Danach erneut `npm ci` und vollständiges `release:gate`: frischer Audit ohne bekannte Befunde, 25 Security-Tests, 9 Core-Tests, Lint, Core-/App-Builds und 14 Browser-Tests erfolgreich. Das ist keine Freigabe des unveränderten privaten Originalstands.
- Server ausschließlich auf `127.0.0.1:3217`, `DEMO_MODE=true`, bereinigte Prozessumgebung ohne geerbte Connector-/Datenbankvariablen. Keine Integration mit Personio, Jira, HubSpot oder Supabase.
- Separate Browser-Sitzung `cyber-screens`: Die Browser-Use-Schnittstelle lehnte Loopback-Adressen ab. Stattdessen wurde ein neuer Playwright-Chromium-Prozess mit leerem, eigenständigem Browserkontext genutzt, nicht das persönliche Browserprofil.
- Browseranfragen waren auf den lokalen Origin begrenzt; externe Anfragen wären abgebrochen und als Fehler gemeldet worden. Tatsächlich keine externen Anfragen, keine Console-Errors und keine Pageerrors. npm-Installation/Audit und Build können öffentliche Paket-/Schriftressourcen abrufen; die Laufzeit-Isolation ist keine Behauptung eines vollständig offline gebauten Systems.
- Viewport 1440 × 1100, vollständige Seitenaufnahmen als PNG. Animationen wurden vor der Aufnahme abgewartet. Alle drei endgültigen Bilder wurden assistentengestützt visuell geprüft: keine abgeschnittenen Karten, sichtbarer Demo-Hinweis, keine privaten Daten. Das ist keine unabhängige menschliche Evaluation.

## Daten und tatsächlicher Ablauf

1. Leeres Browser-LocalStorage. Prüfung: „Weiter“ ist ohne Branche deaktiviert.
2. Ersten passenden Branchenwert und 51 bis 250 Mitarbeitende auswählen.
3. Personio-Demo verbinden. Der eingebaute synthetische Datensatz erzeugt 13 Personen-/Abteilungseinträge. Erstes Bild aufnehmen.
4. Mitgeliefertes QM-CSV importieren: fünf synthetische Beispielprozesse. Jira-Demo verbinden, Plan vorbereiten und Daten übergeben.
5. Tatsächlicher POST an `/api/onboarding/complete`: HTTP 200, `mode: demo`. Dashboard zeigt 13 regelbasierte Vorschläge. Zweites Bild aufnehmen.
6. Simulierte Tickets über `/api/tickets/create-all` erzeugen: HTTP 200, `mode: demo`. Erstes Ticket über `/api/webhooks/jira` synchronisieren: HTTP 200, `mode: demo`. Eine Aufgabe ist „In Arbeit“. Drittes Bild aufnehmen.
7. Dashboard neu laden: Ticketreferenzen bleiben im lokalen Browser erhalten. Bekannte Grenze: Maßnahmenstatus wird beim Laden aus dem Vorschlagsdatensatz auf „Offen“ zurückgesetzt, während der simulierte Ticketstatus erhalten bleibt. Keine zuverlässige Statuspersistenz behauptet.

Der [Laufbeleg](screenshots/capture-report.json) enthält nur relative Requestpfade, Antwortstatus und Demo-Kennzeichen. Keine Cookies, Tokens, Requestbodies oder personenbezogenen Rohdaten wurden exportiert. Ticketnummern sind zur Laufzeit zufällig simuliert; PNG-Hashes identifizieren diese konkreten Aufnahmen, nicht deterministische Wiederholungen.

## Offen ausgewiesene Anpassungen

Die isolierte App-Kopie erhielt einen gerenderten Demo-Banner mit „Synthetische Demo-Daten“, „Personio und Jira simuliert“ und der Nachweisgrenze. Im Dashboard wurden Beraterbehauptungen durch „Demo-Vorschlag“ und „vorgeschlagene Maßnahmen zur Prüfung“ ersetzt; Ticketaktionen sind als Simulation bezeichnet. Der Fußhinweis nennt ausdrücklich die fehlende Nachweisablage. Der Smoke-Test-Selektor wurde an den neuen Headingtext angepasst. Die erste Prüfung fand dadurch zwei veraltete Textselektoren; nach deren Anpassung bestanden alle 14 Browser-Tests.

Keine neue Evidence-Funktion, keine neue Maßnahmenlogik und kein erzwungenes Freigabegate wurden für die Bilder implementiert. Die vollständige private Quelle und die isolierte Laufkopie werden nicht mitveröffentlicht. Relative Quellpfade sowie Vorher-/Aufnahmehashes aller veränderten Laufdateien stehen in [PROVENANCE.json](../PROVENANCE.json).

## Aussagegrenzen

Marketplace-Texte und ISO-Control-Labels stammen aus dem Forschungsprototyp. „Aktiv“, „vorhandener Prozess erkannt“, Fortschrittsprozente und Demo-Ticketnummern belegen weder Live-Integrationen noch Wirksamkeit, Rechtskonformität oder geprüfte Nachweise. Manche ursprünglichen Marketplace-Texte formulieren weiterhin einen Produktanspruch; der sichtbare Demo-Hinweis und diese Einordnung begrenzen die Aussage auf Simulation. Die Bilder zeigen keinen fachlich freigegebenen Katalog und keine Kundenwirkung.
