# Ausgewählte Originalauszüge

Drei Dateien wurden bytegleich aus dem privaten Lotse-Projekt übernommen:

| Datei | Zweck |
| --- | --- |
| `src/actions/ticket-export.ts` | Reine Abbildung von Maßnahmen auf Exportdatensätze; aggregierter Fortschritt. |
| `src/compliance/types.ts` | Typdefinitionen für Assessment, Maßnahmen, Export und Berichtsmodelle. |
| `src/types/index.ts` | Gemeinsame Typen und Kategorie-Konstanten; keine Zugangsdaten oder Datensätze. |

Die Implementierung umfasst 60 Zeilen; die beiden unveränderten Typabhängigkeiten werden mitgeliefert, damit die Herkunft und Typbezüge vollständig bleiben. Token-/Credential-Feldnamen in Typdeklarationen sind keine gespeicherten Secrets und keine Empfehlung für eine sichere Tokenarchitektur.

Die Originalimporte bleiben unverändert. Node entfernt `import type` beim Ausführen; deshalb benötigt `npm test` weder eine private Quelldatei noch TypeScript-Pakete. Die Dateien sind außerdem gemeinsam mit TypeScript streng typprüfbar. Es wird keine vollständige Anwendung und kein SDK veröffentlicht.

## Grenzen

- Exportobjekte sind weder erzeugte Remote-Tickets noch CSV-Dateien; `generic_csv` bezeichnet nur ein Ziel im Modell.
- Kein Auth-, Autorisierungs-, Idempotenz-, Netz- oder Review-Gate.
- `calculateProgress` zählt vorhandene Statuswerte; `in_progress` zählt halb, `done` ganz. Es prüft keinen Nachweis und keine Wirksamkeit.
- Eingaben werden als gültige interne TypeScript-Daten vorausgesetzt. Die Funktionen sind keine Eingabevalidierung für nicht vertrauenswürdige HTTP-Requests.
- `sourceCategories` und Rechtsreferenzen werden aus der Eingabe übernommen, nicht fachlich verifiziert.

Die acht [Tests](../tests/ticket-export.test.mjs) sind neue synthetische Charakterisierungstests, keine Übernahme einer privaten Testsuite. [PROVENANCE.json](../PROVENANCE.json) enthält relative Quellpfade und Hashes. Alle Auszüge unterliegen der proprietären [Lizenz](../LICENSE).
