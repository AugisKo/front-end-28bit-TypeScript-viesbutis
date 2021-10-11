function spausdintiHead(tekstas, tagas = 'p') {
    const p = document.createElement(tagas);
    p.textContent = tekstas;
    document.getElementById('left-column').appendChild(p);
}
function spausdinti(tekstas, tagas = 'p') {
    const p = document.createElement(tagas);
    p.textContent = tekstas;
    document.getElementById('right-column').appendChild(p);
}
class Hotel {
    constructor(name, address, stars, setComfort) {
        this.name = name;
        this.address = address;
        this.stars = stars;
        this.rooms = [];
        this.setComfort = setComfort;
    }
    addRoom(room) {
        this.rooms.push(room);
    }
    printRooms(miniComfort) {
        for (let room of this.rooms) {
            if (miniComfort !== undefined) {
                if (room.comfort > miniComfort) {
                    room.printData();
                }
            }
            else {
                room.printData();
            }
        }
    }
    starLable() {
        let star = '';
        for (let s = 1; s <= this.stars; s++) {
            star += '⭐';
        }
        return star;
    }
    printData(onlyComfort) {
        console.log('Welcome to', this.name);
        console.log('Our address:', this.address);
        console.log('Our hotel has:', this.stars, 'stars');
        console.log('In our hotel we have', this.rooms.length, 'rooms');
        spausdintiHead('Welcome to ' + this.name, 'h1');
        spausdintiHead(this.starLable());
        spausdintiHead(this.address, 'h5');
        if (onlyComfort === true) {
            console.log('--------------------------------------------------------------');
            console.log('Below you will find the list of our most comfortable rooms:');
            spausdinti('Below you will find the list of our most comfortable rooms:', 'h4');
            this.printRooms(this.setComfort);
        }
        else {
            console.log('---------------------------------------------------------------');
            console.log('Here you can see the list of all our rooms:');
            spausdinti('Here you can see the list of all our rooms:', 'h4');
            this.printRooms();
        }
    }
}
class Room {
    constructor(size, capacity) {
        this.size = size;
        this.capacity = capacity;
        this.roomNumber = hotel1.rooms.length;
    }
    get comfort() {
        return parseFloat((this.size / this.capacity).toFixed(2));
    }
    printData(comfortString = 'Comfort level: ', roomName = 'Room') {
        console.log('---------------------------------------------------------------');
        console.log(roomName);
        console.log('Room number', this.roomNumber + 1);
        console.log('Room size:', this.size, 'm2');
        console.log('Places in the room:', this.capacity);
        console.log(comfortString, this.comfort);
        spausdinti(roomName, 'h4');
        spausdinti('Room number ' + (this.roomNumber + 1));
        spausdinti('Room size: ' + this.size + ' m2');
        spausdinti('Places in the room: ' + this.capacity);
        spausdinti(comfortString + this.comfort);
    }
}
class Spa extends Room {
    constructor(size, capacity, poolSize, poolTemperature) {
        super(size, capacity);
        this.poolSize = poolSize;
        this.poolTemperature = poolTemperature;
    }
    get comfort() {
        return parseFloat(((this.size - this.poolSize) / this.capacity).toFixed(2));
    }
    printData() {
        super.printData('SPA confort level: ', 'SPA');
        console.log('Spa poole size', this.poolSize, 'm2');
        console.log('Spa pool temperature', this.poolTemperature, 'oC');
        spausdinti('Spa poole size ' + this.poolSize + ' m2');
        spausdinti('Spa pool temperature ' + this.poolTemperature + ' oC');
    }
}
const hotel1 = new Hotel('Holiday Inn', 'Šeimyniškių g. 1, Vilnius', 5, 14);
const room1 = new Room(44, 2);
hotel1.addRoom(room1);
const room2 = new Room(20, 3);
hotel1.addRoom(room2);
const room3 = new Room(30, 3);
hotel1.addRoom(room3);
const room4 = new Room(15, 2);
hotel1.addRoom(room4);
const spa1 = new Spa(70, 3, 25, 24);
hotel1.addRoom(spa1);
hotel1.printData(false);
const form = document.querySelector('#myform');
form.onsubmit = () => {
    const formData = new FormData(form);
    console.log(formData);
    const hotelname = formData.get('hotelname');
    console.log(hotelname);
    return false;
};
