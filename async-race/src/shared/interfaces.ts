export interface CarInfo {
  success: boolean,
  id: string,
  animationTime: number,
}

export interface RenderCar {
  id: number,
  name: string,
  color: string,
  isEngineStarted?: boolean,
}

export interface RaceBodyCar {
  success: boolean,
  animationTime: number,
  id: string,
}

export interface BodyCar {
  name: string,
  color: string,
}

export interface SaveWinners {
  id: number,
  time: number,
}

export interface Winner {
  id: number,
  wins: number,
  time: number,
  car: BodyCar,
}

export interface ReturnValue {
  items: Winner,
  count: number,
}

export interface GetWinners {
  page: number,
  limit: number,
}

export interface GetWinnersReturn {
  items: Winner[],
  count: string | null,
}

export interface GetCarsReturn {
  items: RenderCar[],
  count: string | null,
}

export interface CarSpeed {
  distance: number,
  velocity: number,
}

export interface WinnerInfo {
  id: number,
  wins: number,
  time: number,
}
