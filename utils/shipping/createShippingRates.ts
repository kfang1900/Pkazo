import axios from 'axios';
import { ShippingRate } from '../../pages/api/shipping/create-rates';

export default async function createShippingRates(): Promise<ShippingRate[]> {
  const resp = await axios.post(
    '/api/shipping/create-rates',
    {
      address: {
        name: 'Jeffrey Meng',
        streetOne: '22562 Alcalde Rd',
        streetTwo: '',
        city: 'Cupertino',
        state: 'CA',
        zip: '95014',
        country: 'US',
      },
      workId: '00k4izBvuWiVzJSZA5x0',
    },
    {}
  );
  const data = resp.data;
  if (data.success) {
    return (data.rates as ShippingRate[]).sort(
      (a, b) => parseFloat(a.amount) - parseFloat(b.amount)
    );
  } else {
    console.log(data);
    throw new Error('Unable to fetch shipping rates. Please try again later.');
  }
}
