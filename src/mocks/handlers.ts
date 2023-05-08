import { rest } from 'msw';
import URLConstants from 'models/URLConstants';
import Data from 'models/Data.type';

const mockData: Data[] = [
  {
    id: 1,
    name: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto',
    birthDate: '2018-03-09',
    age: 5,
    gender: 'male',
    breeds: 'Aegean',
    img: 'https://cdn2.thecatapi.com/images/ehc.jpg',
  },
];

const handlers = [
  rest.get(URLConstants.BASE_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockData));
  }),
];

export default handlers;
