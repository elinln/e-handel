# e-handel

#Parfymeriet

Vi har skapat en webshop som heter Parfymeriet som är byggd med NodeJS, ExpressJS, samt med Stripe som betalningsmetod. Vi har inte använt några andra ramverk, men för styling har vi använt oss lite av Bootstrap.

För att starta applikationen behöver du navigera dig in i rotmappen och öppna terminalen, där i skriver du följande:
1. npm init  
2. npm install express
3. npm install dotenv
4. npm install stripe --save

För att köra projektet smidigt och inte behöva starta om servern varje gång en ändring i koden görs så kan man även installera nodemon (kör: npm install nodemon),  det är frivilligt men underlättar. Något man också behöver göra är att skapa en '.env'-fil där man skriver in sin "STRIPE_SECRET_KEY"-variabel som innehåller den hemliga nyckeln från Stripe. 

Sista steget är att skriva 'npm start' i terminalen och sedan kan du gå in på valfri webbläsare och skriva in http://localhost:3000 i adressen (URL) för att komma till webshopen. 
