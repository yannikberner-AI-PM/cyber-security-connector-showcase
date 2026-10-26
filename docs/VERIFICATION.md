# Verifikation und Aussagegrenzen

## Öffentlicher Showcase

Mit Node.js v26.7.0 und npm 11.19.0 ausgeführt:

```bash
npm test
shasum -a 256 -c MANIFEST.sha256
git diff --check
```

12 Tests: acht unveränderte Charakterisierungstests des Originalauszugs und vier neue Screenshot-/Dokumentprüfungen. Die neuen Prüfungen prüfen drei PNG-Dateien mit 1440 Pixeln Breite, SHA-256 gegen Provenienz, README-Bildverweise, tatsächliche Demo-API-Ergebnisse, das vollständige Dateimanifest sowie lokale Links und deutsche Dokumentzeichen. Sie reproduzieren die private App nicht aus dem öffentlichen Showcase und beweisen keine Bildinhalte oder Compliance. Die Sichtung der Bilder erfolgte separat assistentengestützt.

Die neuen Prüfungen wurden vor Ergänzung der Provenienz und Dokumentation ausgeführt: drei erwartete Fehler wegen fehlender Screenshot-Metadaten, unvollständigem Manifest und alter Dokumentation. Nach Ergänzung bestehen alle zwölf Tests. Der ursprüngliche Codeauszug bleibt bytegleich zur privaten Quelle; seine acht Tests prüfen Exportfelder, Prioritäten, optionale Werte, Eingabeerhalt und Statuszählung. `done` zählt ohne Nachweisprüfung: kein Compliance-Score.

## Tatsächlich ausgeführte App-Demo

Siehe [Aufnahmeprotokoll](SCREENSHOTS.md) und [maschinenlesbaren Browserlauf](screenshots/capture-report.json).

In der isolierten Kopie nach offen dokumentiertem Dependency-Patch: frisches `npm ci` und `CI=true NEXT_TELEMETRY_DISABLED=1 npm run release:gate` erfolgreich. Enthalten: 25 Security-Tests, frischer Audit mit null bekannten Befunden, 9 Core-Tests, sechs Lint-Tasks, vier Build-Tasks ohne Cachetreffer und 14 Chromium-Tests in Desktop-/schmalem Viewport. Core und beide Apps wurden tatsächlich gebaut. Warnungen: ESLint 9.39.5 nicht mehr unterstützt; Tailwind-TypeScript-Konfiguration meldet einen Package-Typ-Performancehinweis. Kein stilles Übergehen von Advisories.

Wichtig: Der unveränderte private Quellstand verwendet Next.js 16.4.0. Dessen frischer Audit meldete ein kritisches betroffenes Paket; sein Release-Gate blockierte korrekt. Nur die isolierte Screenshot-Kopie wurde auf 16.4.3 gebracht. Der private Originalbaum bleibt unverändert und ist durch diesen Lauf nicht freigegeben.

Der zusätzliche separate Browserlauf erzeugte 13 Maßnahmenvorschläge, 13 simulierte Tickets und einen Statuswechsel. Alle drei lokalen POST-Antworten: HTTP 200 und `mode: demo`. Keine Browserfehler oder externen Laufzeitanfragen. Bekannte Einschränkung: Maßnahmenstatus wird beim Reload zurückgesetzt, simulierte Ticketreferenzen bleiben erhalten. Eine Evidence-/Nachweisablage ist im gezeigten Dashboard nicht vorhanden.

## Integrität und Veröffentlichung

- Drei Originalauszüge unverändert; SHA-256 in [PROVENANCE.json](../PROVENANCE.json).
- Neu aufgenommene PNGs mit synthetischen Daten, Laufbeleg, Screenshotdokumentation und Validatoren ausdrücklich kuratiert.
- Keine private Git-Historie, Zugangskonfiguration oder Produktionsdaten kopiert. Der private Git-Status und alle 85 für den isolierten Lauf übernommenen Quelldateien wurden gegen ihre vorab erfassten Hashes geprüft.
- Manifest deckt alle öffentlichen Dateien außer sich selbst ab. Git-Metadaten sind ausgeschlossen.
- Lokale Markdown-Verweise, Dateiinventar und verbreitete Secretmuster werden vor Veröffentlichung geprüft. Ein Muster-Scan beweist keine vollständige Geheimnisfreiheit.
- Der Eigentümer hat Implementierung und Veröffentlichung dieses bestehenden Showcases autorisiert. Nur der Showcase-Commit wird veröffentlicht, nicht die private Laufkopie. Remote-Blobvergleich erfolgt gegen den freigegebenen lokalen Commit.

## Nicht bewiesen

Keine Live-OAuth-/Connectorfunktion, Auth-/Mandantensicherheit, Datenbankmigration, fachliche oder rechtliche Richtigkeit, Penetrationstest, sichere Produktion oder Kundenwirkung. Eine bestandene lokale Demo ist keine Freigabe des privaten Produkts.
