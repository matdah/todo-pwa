# Övningsuppgift - PWA
Progressive Web Apps (PWA) kombinerar det bästa av webb och mobila applikationer. I denna övning ska du skapa en enkel todo-lista som demonstrerar grundläggande PWA-funktionalitet, utan att använda en service worker.

## Lärandemål
Efter denna övning kommer du att förstå:
- Hur man skapar en installerbar webbapplikation
- Grundläggande offline-funktionalitet
- Användning av Web App Manifest
- Lokal datalagring i webbläsaren
- Hantering av online/offline-status

## Uppgiftsbeskrivning

### Del 1: HTML-struktur
Skapa en HTML-fil med följande komponenter:
- En header med titeln "Todo PWA"
- Ett inputfält för nya todos
- En "Lägg till"-knapp
- En lista där todos ska visas
- En statusrad som visar online/offline-status

### Del 2: Web App Manifest
Skapa ett manifest (inbäddat i HTML-filen) som innehåller:
- App-namn och kort namn
- Start-URL
- Display-läge (standalone)
- Bakgrundsfärg och temafärg
- Minst en ikon (kan vara SVG eller PNG)

### Del 3: Styling
Styla applikationen för att:
- Vara responsiv och användarvänlig
- Ha tydlig visuell feedback för todo-items
- Visa tydlig skillnad mellan färdiga och ofärdiga todos
- Se bra ut på både mobila enheter och desktop

### Del 4: JavaScript-funktionalitet
Implementera följande funktioner:
1. Lägga till nya todos
2. Markera todos som färdiga
3. Spara todos i localStorage
4. Visa online/offline-status
5. Hantera installation av PWA:n

## Krav
- Appen ska fungera utan internet efter första laddningen
- Todos ska sparas mellan sessioner
- Användaren ska kunna installera appen på sin enhet
- Appen ska vara responsiv
- Allt ska vara i en enda HTML-fil (inline CSS och JavaScript)

## Tips
- Använd `localStorage` för att spara todos
- Lyssna på `online` och `offline` events för statusindikatorn
- Använd `beforeinstallprompt` event för installationsfunktionalitet
- Testa regelbundet i olika webbläsare och på olika enheter

## Utmaningar för vidare utveckling
1. Lägg till möjlighet att ta bort todos
2. Implementera dragbar ordning på todos
3. Lägg till kategorier/taggar för todos
4. Implementera deadlines för todos
5. Lägg till filter för att visa/dölja färdiga todos

## Testning
För att testa din lösning:
1. Öppna appen i en modern webbläsare
2. Testa följande scenarion:
   - Lägg till några todos
   - Markera några som färdiga
   - Stäng webbläsaren och öppna igen - todos ska finnas kvar
   - Stäng av internet - appen ska fortfarande fungera
   - På en mobil enhet - testa installation
   - Verifiera att allt fungerar i olika webbläsare

## Vanliga utmaningar och lösningar
- **Problem med ikon som inte visas?** Kontrollera manifest-formateringen.
- **Todos försvinner?** Verifiera `localStorage`-implementationen.
- **Installationsprompt visas inte?** Säkerställ att manifest är korrekt.
- **Styling ser konstig ut på mobil?** Kontrollera viewport-meta-taggen.


## Av
Mattias Dahlgren, Mittuniversitetet, 2025