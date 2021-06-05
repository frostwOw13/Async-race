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

export const KILOMETER = 1000;
