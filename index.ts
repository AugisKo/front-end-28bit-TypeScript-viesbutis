/*
Panaudodami TypeScript parašykite programą viešbučių tinklui.

- Sukurkite viešbutį ir jam pridėkite bent du paprastus kambarius ir vieną baseiną.

- Atspausdinkite visus viešbučio duomenis (panaudodami viešbučio printData() metodą) ir paskui dar kartą atspausdinkite viešbučio duomenis, tik šįkartą į printData metodo parametrą onlyComfort nurodykite true.

- Klasė HotelAtributai:
  - name (string) -viešbučio pavadinimas, priskiriamas sukuriant objektą.
  - address (string) -viešbučio adresas, priskiriamas sukuriant objektą.
  - stars (number) -viešbučio žvaigždučiųskaičius, priskiriamas sukuriant objektą.
  - rooms (Room tipo elementųmasyvas) -masyvas, kuris saugo viešbutyje esančias patalpas.

- Sukuriant objektą yra tuščias.

- Metodai:
  - addRoom(room: Room) - metodas, kuris leidžia pridėti prie viešbučio patalpą.
  - printRooms(minComfort?: number) (void) - privatus metodas, kuris atspausdina (panaudojant patalpos printData() metodą) visas viešbutyje esančias patalpas.
  - MinComfort parametras nebūtinas perduoti, bet jei jis perduodamas, atspausdinamos tik tos patalpos, kurių komforto sąntykis yra didesnis už minComfort.
  - printData(onlyComfort?: boolean) (void) -public metodas, kurio pagalba atspausdinami visi viešbučio duomenys, įskaitant ir patalpas.
  - OnlyComfort parametras nėra būtinas, bet jei jis nurodomas spausdinamos patalpos, kurių komforto santykis yra didesnis už 15.


- KlasėRoomAtributai:
  - size (number) - kambario dydis, priskiriamas sukuriant objektą.
  -capacity (number) - galimas žmonių kiekis telpantis patalpoje, priskiriamas sukuriant objektą.

- Metodai:
  - comfort() (number) - metodas, kuris grąžina komforto santykį, kiek patalpoje vienam žmogui tenka erdvės. T.y. size/capacity.
  - printData() (void) - public metodas, kurio pagalba atspausdinami visi patalpos duomenys (size, capacity, comfort).

- Klasė Spa. Ši klasė paveldi klasę Room, tačiau turi papildomų atributų:
  - poolSize (number) - nurodo baseino dydį, priskiriamas sukuriant objektą.
  - poolTemperature (number) - nurodo baseino vandens šilumą, priskiriamas sukuriant objektą.
  - Metodai:
    - comfort (number) - kaip ir tėvinės klasės (superklasės) identiškas metodas grąžina komforto santykį, kiek patalpoje vienam žmogui tenka erdvės. Tik skaičiuojamas pagal formulę(size - poolSize) / capacity.
    - printData (void) - atspausdina visus patalpos duomenis panaudodamas superklasės metodątuo pačiu pavadinimu ir papildomai atspausdina baseino dydįir vandens temperatūrą.
*/

// Hotel klasės aprašymas
class Hotel {
  // Hotel klasės atributai ir konstruktorius
  public readonly name: string; //Viešbučio pavadinimas
  public readonly address: string; //Viešbučio adresas
  public readonly stars: number; //Viešbučio vertinimas žvaigždutėmis
  // public readonly onlyComfort: boolean;
  public readonly setComfort: number;
  public readonly rooms: Room[]; //Viešbučio kambarių masyvas

  public constructor(
    name: string,
    address: string,
    stars: number,
    setComfort: number
  ) {
    this.name = name;
    this.address = address;
    this.stars = stars;
    //this.onlyComfort = onlyComfort;
    this.rooms = [];
    this.setComfort = setComfort;
  }

  // Hotel klasės metodų aprašymas

  //Metodas, viešbučiui prideda kambarį suformuojamą klasės Room
  public addRoom(room: Room): void {
    this.rooms.push(room);
  }

  // Privatus metodas, atrenkantis kambarius, kurie yra aukstesnes komforto klases nei nurodyta miniComfort kintamajame, ir juos atspausdinantis naudodamas Room klases printData metoda
  private printRooms(miniComfort?: number): void {
    for (let room of this.rooms) {
      if (room.comfort > miniComfort) {
        room.printData();
      }
    }
  }

  //Metodas, spausdinantis pagrindinę informaciją apie viešbutį
  public printData(onlyComfort?: boolean): void {
    console.log('Welcome to', this.name);
    console.log('Our address:', this.address);
    console.log('Our hotel has', this.stars, 'stars');
    console.log('In our hotel we have', this.rooms.length, 'rooms');
    /* if salyga, kuri atspausdina visus kambarius (this.printRooms(0)) ar tik tuos, kurie yra aukstesnes komforto klases nei nurodyta kintamajame this.setComfort ir imestame i (this.printRooms(this.setComfort)). Si klase ijungiama kai onlyComfort yra True.*/
    if (onlyComfort === true) {
      this.printRooms(this.setComfort);
    } else {
      this.printRooms(0);
    }
  }
}

//Kambariu registravimo klasė
class Room {
  //Room klasės atributai ir konstruktorius
  public readonly size: number; //Kambario dydis
  public readonly capacity: number; //Miegamųjų vietų skaičius
  public readonly roomNumber: number; //Kambario numeris, priskiriamas automatiškai

  constructor(size: number, capacity: number) {
    this.size = size;
    this.capacity = capacity;
    this.roomNumber = hotel1.rooms.length;
  }

  //Metodas, skaičiuojantis kambario komforto lygį
  get comfort(): number {
    return parseFloat((this.size / this.capacity).toFixed(2));
  }

  //Kambario duomenų išvedimo į konsole metodas
  public printData(
    comfortString: string = 'Comfort level: ', //Stringas, kurį, extend'inus šį metodą į Spa klasę, pakeičiamas kitu.
    roomName: string = '<<Room>>' //Analogiška, kaip ir comfortString
  ): void {
    console.log('-------------------------');
    console.log(roomName);
    console.log('Room number', this.roomNumber + 1);
    console.log('Room size:', this.size, 'm2');
    console.log('Places in the room:', this.capacity);
    console.log(comfortString, this.comfort); //comfortString paduodamas kaip metodo kintamasis
  }
}
//Spa klasė, suformuojanti Spa kambarį.
class Spa extends Room {
  //Spa klasės atributai ir konstruktorius. Dalis atributų atkeliauja iš klasės Room.
  public readonly poolSize: number;
  public readonly poolTemperature: number;

  public constructor(
    size: number,
    capacity: number,
    poolSize: number,
    poolTemperature: number
  ) {
    super(size, capacity);
    this.poolSize = poolSize;
    this.poolTemperature = poolTemperature;
  }
  //Metodas, skaičiuojantis Spa kambario komforto lygį ir overraidinantis comfort(), kuris ateina iš tėviės klasės Room
  get comfort(): number {
    return parseFloat(((this.size - this.poolSize) / this.capacity).toFixed(2));
  }

  //Spa kambario duomenų išvedimo į konsole metodas, papildantis Room klasės printData metodą.
  public printData(): void {
    super.printData('SPA confort level:', '<<SPA>>'); // Pušina abu tringus į Room PrintData kintamuosius ComfortString ir roomName
    console.log('Spa poole size', this.poolSize, 'm2');
    console.log('Spa pool temperature', this.poolTemperature, 'oC');
  }
}

const hotel1 = new Hotel('Holiday Inn', 'Šeimyniškių g. 1, Vilnius', 3, 40);

const room1 = new Room(44, 2);
hotel1.addRoom(room1);

const room2 = new Room(20, 3);
hotel1.addRoom(room2);

const spa1 = new Spa(45, 3, 25, 24);
hotel1.addRoom(spa1);

hotel1.printData(true);

/*
room1.printData();
room2.printData();
spa1.printData();
*/
