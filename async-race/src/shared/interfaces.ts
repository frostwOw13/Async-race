export interface CarModel {
  id: number,
  name: string,
  color: string,
  isEngineStarted?: boolean,
}

export interface CarBodyModel {
  name: string,
  color: string,
}

export interface CarResponseModel {
  items: CarModel[],
  count: string | null,
}

export interface CarSpeedResponseModel {
  distance: number,
  velocity: number,
}

export interface Winner {
  id: number,
  wins: number,
  time: number,
  car: CarBodyModel,
}

export interface WinnerRequest {
  id: number,
  time: number,
}

export interface WinnerResponse {
  id: number,
  wins: number,
  time: number,
}

export interface WinnersRequest {
  page: number,
  limit: number,
}

export interface WinnersResponse {
  items: Winner[],
  count: string | null,
}
