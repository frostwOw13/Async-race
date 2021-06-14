export const MAX_CARS_ON_PAGE = 7;

export const MAX_WINNERS_ON_PAGE = 10;

export interface RenderCar {
  id: number,
  name: string,
  color: string,
  isEngineStarted?: boolean
}

export const enum PageIds {
  GaragePage  ='garage',
  WinnersPage = 'winners'
}

export const buttons = [
  {
    id: PageIds.GaragePage,
    text: 'to garage'
  },
  {
    id: PageIds.WinnersPage,
    text: 'to winners'
  }
]

export interface RaceBodyCar {
  success: any,
  animationTime: number,
  id: string
}

export interface BodyCar {
  name: string,
  color: string
}

export interface saveWinners {
  id: number,
  time: number
}

export interface Winner {
  id: number,
  wins: number,
  time: number,
  car: BodyCar
}

export interface ReturnValue {
  items: Winner,
  count: number
}

export const carBrands = [
  'Lada',
  'Kia',
  'Hyundai',
  'Renault',
  'Toyota',
  'VW',
  'Skoda',
  'Nissan',
  'BMW',
  'Mercedes',
  'Mazda',
  'Mitsubishi',
  'Lexus',
  'Datsun',
  'Haval',
  'Audi',
  'Geely',
  'Suzuki',
  'Chery',
  'Volvo',
  'Porsche',
  'Subaru',
  'Peugeot',
  'Citroёn',
  'MINI',
  'Honda',
  'FAW',
];

export const carModels = [
  'Rio',
  'Granta',
  'Vesta',
  'Solaris',
  'Creta',
  'Polo',
  'Daster',
  'Largus',
  'Xray',
  'Rav 4',
  'Niva',
  'Captur',
  'Logan',
  'Sandero',
  'Rapid',
  'Camry',
  'Tiguan',
  'Sportage',
  'Octavia'
];

export const randomColor = '0123456789abcdef';
