# ALBÉRLETHIRDETŐ PORTÁL MEGVALÓSÍTÁSA MIKROSZOLGÁLTATÁS ARCHITEKTÚRÁVAL
## A projekt bemutatása
A szakdolgozat célja a mikroszolgáltatás architektúra alapjainak bemutatása egy albérlethirdető portálon keresztül. 

## Futtatás
### Követelmények
A projekt futtatásához a Docker Desktop telepítése szükséges, én is ezt használtam a fejlesztés során. Másik lehetőségként használhatunk Docker Engine-t, viszont ebben az esetben külön fel kell telepítenünk a Docker Composet is. 

Bővebb információ a telepítésről: https://docs.docker.com/compose/install/

### Lépések (Windows)
- Telepítsük az előző részben bemutatott függőségeket
- Indítsuk el a Docker Desktopot, vagy Docker Engine-t
- Navigáljunk a projekt főkönyvtárába, ahol a *docker-compose.yaml* fájlt is találjuk (*ApartmentFinder/*)
- Nyissunk ebből a mappából egy parancssort (cmd)
- Adjuk ki a **docker compose up** parancsot

## Kipróbálási tippek
Az első indítás hosszadalmas lehet, hiszen ilyenkor a Docker elkészíti a komponensek image-eit, és letölti az ehhez szükséges függőségeket. 

Az indítást követően az alkalmazás felhasználói felületét a böngészőből a http://localhost:80 címen érhetjük el.

Az alkalmazás adatbázisai tartalmaznak néhány előre regisztrált felhasználót és hozzáadott hirdetést is, így a funkciók könnyebben kipróbálhatók.

Regisztrált felhasználók, és bejelentkezési adataik:

**John Doe**

- felhasználónév: johndoe
- jelszó: Password1

**Bob Smith**

- felhasználónév: bobsmith
- jelszó: Password1
