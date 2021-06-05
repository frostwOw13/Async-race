const base = 'http://127.0.0.1:3000';
const garage = `${base}/garage`;
const winners = `${base}/winners`;
const engine = `${base}/engine`;

export const getCars = async (page: number, limit: number = 7) => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);

  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count')
  }
}

export const getCar = async (id: number) => {
  await (await fetch(`${garage}/${id}`)).json();
}

export const createCar = async (body: object) => {
  (await fetch(garage, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })).json();
}

export const deleteCar = async (id: number) => {
  (await fetch(`${garage}/${id}`, { method: 'DELETE' })).json();
}

export const updateCar = async (id: number, body: object) => {
  (await fetch(`${garage}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
    })).json();
}

export const startEngine = async (id: number) => {
  (await fetch (`${engine}?id=${id}&status=started`)).json();
}

export const stopEngine = async (id: number) => {
  (await fetch (`${engine}?id=${id}&status=stopped`)).json();
}

export const drive = async (id: number) => {
  const res = await fetch (`${engine}?id=${id}&status=drive`).catch();
  return res.status !== 200 ? { succes: false } : { ...(await res.json()) };
}

const getSortOrder = async (sort: any, order: any) => {
  if (sort & order) return `&_sort=${sort}&_order${order}`;
  return '';
}

interface getWinners {
  page: number,
  limit: number,
  sort: any,
  order: any
}

export const getWinners = async ({ page, limit = 10, sort, order}: getWinners) => {
  const response = await fetch(`${winners}?_page=${page}&_limit=${limit}${getSortOrder(sort, order)}`);
  const items = await response.json();

  return {
    items: await Promise.all(items.map(async (winner: any) => ({ ...winner, car: await getCar(winner.id) }))),
    count: response.headers.get('X-Total-Count')
  }
}

export const getWinner = async (id: number) => {
  return (await fetch(`${winners}/${id}`)).json();
}

export const getWinnersStatus = async (id: number) => {
  return (await fetch(`${winners}/${id}`)).status;
}

export const deleteWinner = async (id: number) => {
  (await fetch(`${winners}/${id}`, { method: 'DELETE' })).json();
}

export const createWinner = async (body: object) => {
  (await fetch(winners, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })).json();
}

export const updateWinner = async (id: number, body: object) => {
  (await fetch(`${winners}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })).json();
}

interface saveWinners {
  id: number,
  time: number
}

export const saveWinner = async ({ id, time }: saveWinners) => {
  const winnerStatus = await getWinnersStatus(id);

  if (winnerStatus === 404) {
    await createWinner({
      id,
      wins: 1,
      time
    });
  } else {
    const winner = await getWinner(id);
    await updateWinner(id, {
      id,
      wins: winner.wins + 1,
      time: time < winner.time ? time : winner.time
    });
  }
}
