# Lokale Verifikation

## Tatsächlich ausgeführt

Umgebung dieses Laufs: Node.js **v26.7.0**, npm **11.19.0**. Kein Paketdownload, keine externen APIs, kein Browser-/Deploymenttest und keine Veränderung des privaten Projekts waren Teil des Laufs.

### Öffentlicher Auszug

```bash
npm test
```

Der Node-Test-Runner meldete:

```text
tests 8
suites 0
pass 8
fail 0
cancelled 0
skipped 0
todo 0
```

Bestandene Testfälle:

1. Export erhält Herkunft, Verantwortliche und Zielprojekt.
2. Alle vier Prioritäten werden in Exportlabels abgebildet.
3. Fehlende optionale Felder und leere Referenzen bleiben erlaubt.
4. Batchexport erhält Reihenfolge ohne die Eingabe zu verändern.
5. Leere Eingabe erzeugt weder Tickets noch Fortschritt.
6. Fortschritt zählt Status und gewichtet `in_progress` zur Hälfte.
7. Bekannte Grenze: `done` wird ohne Nachweis- oder Freigabeprüfung gezählt.
8. Exportziel ist ein Datenfeld, keine bestätigte Live-Integration.

Die Tests wurden zuerst vor Übernahme des Auszugs aufgerufen und scheiterten erwartbar am fehlenden Modul. Nach bytegleicher Übernahme bestanden alle acht Fälle. Es wurde keine Produktlogik neu implementiert oder für Tests verändert.

### Zusätzliche lokale Typprüfung

Mit dem bereits vorhandenen TypeScript-Compiler des privaten Schwesterprojekts, ohne Installation oder Ausgabe-Dateien:

```bash
node ../Cyber-Security-SaaS/node_modules/typescript/bin/tsc --noEmit --strict --target ES2022 --module ESNext --moduleResolution bundler components/src/actions/ticket-export.ts components/src/compliance/types.ts components/src/types/index.ts
```

Ergebnis: Exitcode **0**, keine Diagnosen. Dieser zusätzliche Befehl setzt den lokalen Compiler voraus und gehört nicht zur unabhängigen öffentlichen Testvoraussetzung. `npm test` benötigt ausschließlich Node.

## Integrität und Auswahl

- Alle drei übernommenen Dateien wurden bytegleich mit der Quelle verglichen; SHA-256-Werte stehen in [PROVENANCE.json](../PROVENANCE.json).
- Alle Markdown-Dateiverweise wurden lokal auf vorhandene Ziele geprüft. Private Quellreferenzen sind bewusst keine anklickbaren Links.
- Das vollständige öffentliche Dateiinventar wurde auf unerwartete Dateien, Symlinks, absolute Benutzerpfade, verbreitete Secretmuster und Konfigurations-/Datenartefakte geprüft. Kein Muster-Scan beweist vollständige Geheimnisfreiheit.
- Die 21 für die Einordnung erfassten Quellhashes und der Git-Status des privaten Projekts wurden nach der Vorbereitung unverändert bestätigt.
- Whitespace-Prüfung mit `git diff --no-index --check /dev/null <Datei>` über jede öffentliche Datei; nötig, weil in einem neuen, nicht gestagten Repository `git diff --check` allein neue Dateien nicht erfasst.
- Das Manifest erfasst alle öffentlichen Dateien außer sich selbst; Git-Metadaten sind ausgeschlossen. Prüfung:

```bash
shasum -a 256 -c MANIFEST.sha256
```

## Git- und Freigabegrenze

Eigenständig initialisiert auf `docs/initial-showcase`. Keine Commits, keine gestagten Dateien, keine Remotes und keine Veröffentlichung. Eine spätere Veröffentlichung benötigt Inhalts-/Rechtefreigabe und gesonderte Anweisung.

## Was dieser Lauf nicht beweist

Keine vollständige Anwendungsausführung, Live-OAuth-/Connectorfunktion, Auth-/Mandantensicherheit, Datenbankmigration, Rechtskonformität, Penetrationstest, produktive Betriebsfähigkeit oder Kundenwirkung. Die statische Inspektion ist assistentengestützte technische Sichtung, keine unabhängige fachliche oder menschliche Freigabe.
