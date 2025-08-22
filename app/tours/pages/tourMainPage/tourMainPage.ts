import { TourServices } from '../../../../dist/tours/services/tour.service.js';

const tourService = new TourServices();



type TourStatus = 'u pripremi' | 'aktivna' | 'završena';

interface User {
  id: number;
  username: string;
  password: string;
  role?:string;
}

interface KeyPoint {
  id: number;
  order: number;
  name: string;
  description: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  tourId: number;
}


class Tour {
  id: number;
  name: string;
  description: string;
  dateTime: Date;
  maxGuests: number;
  status: TourStatus;
  guide?: User;
  guideId: number;
  keyPoints: KeyPoint[] = [];

  constructor(
    id: number,
    name: string,
    description: string,
    dateTime: Date,
    maxGuests: number,
    guideId: number,
    guide?: User,
    keyPoints: KeyPoint[] = []
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.dateTime = dateTime;
    this.maxGuests = maxGuests;
    this.status = 'u pripremi';
    this.guideId = guideId;
    this.guide = guide;
    this.keyPoints = keyPoints;
  }

  isValid(): boolean {
    return (
      this.name.trim().length > 0 &&
      this.description.trim().length > 0 &&
      this.maxTourists > 0
    );
  }
}

/*const tura1 = new Tour(
  1,
  'Turistička atrakcija 1',
  'Opis prve turističke atrakcije',
  new Date(),
  10,
  1
);
const tura2 = new Tour(
  2,
  'Turistička atrakcija 2',
  'Opis druge turističke atrakcije',
  new Date(),
  15,
  2
);
const tura3 = new Tour(
  3,
  'Turistička atrakcija 3',
  'Opis treće turističke atrakcije',
  new Date(),
  20,
  3
);
const tura4 = new Tour(
  4,
  'Turistička atrakcija 4',
  'Opis četvrte turističke atrakcije',
  new Date(),
  25,
  4
);
const tura5 = new Tour(
  5,
  'Turistička atrakcija 5',
  'Opis pete turističke atrakcije',
  new Date(),
  30,
  5
);
const tura6 = new Tour(
  6,
  'Turistička atrakcija 6',
  'Opis šeste turističke atrakcije',
  new Date(),
  35,
  6
);
const tura7 = new Tour(
  7,
  'Turistička atrakcija 7',
  'Opis sedme turističke atrakcije',
  new Date(),
  40,
  7
);
const tura8 = new Tour(
  8,
  'Turistička atrakcija 8',
  'Opis sedme turističke atrakcije',
  new Date(),
  40,
  8
);
const tura9= new Tour(
  9,
  'Turistička atrakcija 9',
  'Opis sedme turističke atrakcije',
  new Date(),
  40,
  9
);
const tura10 = new Tour(
  10,
  'Turistička atrakcija 10',
  'Opis sedme turističke atrakcije',
  new Date(),
  40,
  10
);
*/



document.addEventListener('DOMContentLoaded', () => {
  const tourListElement = document.getElementById('tourList');

  tourService.getAllTours(0, 1, 10, 'Name', 'ASC')
    .then((tourList: Tour[]) => {
      // tourList is guaranteed to be an array
      for (const tour of tourList) {
        console.log(1);
        const tourElement = document.createElement('div');
        tourElement.classList.add('tourCard');
        tourElement.innerHTML = `
          <h2>${tour.name}</h2>
          <p>${tour.description}</p>
          <p>Početak: ${new Date(tour.dateTime).toLocaleString()}</p>
          <p>Maksimalni broj putnika: ${tour.maxGuests}</p>
          <p>Status: ${tour.status}</p>
        `;

        const settingsDiv = document.createElement('div');
        settingsDiv.className = 'settingsDiv';

        const editButton = document.createElement('button');
        editButton.classList.add('editButton');
        editButton.textContent = '⚙️';
        editButton.addEventListener('click', () => {
          console.log(`Uredi turu: ${tour.name}`);
        });

        settingsDiv.appendChild(editButton);
        tourElement.appendChild(settingsDiv);
        tourListElement?.appendChild(tourElement);
      }
      console.log(tourList);
    })
    .catch(err => {
      console.error("Failed to load tours:", err);
    });
});