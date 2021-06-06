export const MAX_CARS_ON_PAGE = 7;

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

export interface BodyCar {
  name: string,
  color: string
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
