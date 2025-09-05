import {action, makeObservable, observable} from 'mobx';
import {Stores} from '../../store';
import {getOffersApi} from '../../api/api';

class offerStore {
  constructor() {
    makeObservable(this, {
      offer: observable,

      setOffer: action,
    });
  }
  offer = [
    {
      id: 1,
      image:
        'https://img.freepik.com/free-vector/gradient-local-market-sale-banner_23-2149462019.jpg?w=2000',
    },
    {
      id: 2,
      image:
        'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/christmas-market-sale-banner-design-template-611f7a7922d6b11d2899f5d00047189f_screen.jpg?ts=1561432239',
    },
    {
      id: 3,
      image:
        'https://img.freepik.com/premium-psd/vegetable-facebook-cover-template_349013-44.jpg?w=2000',
    },
  ];

  setOffer = value => {
    this.offer = value;
  };

  getOffers = async () => {
    try {
      let data = await getOffersApi();
      // this.offer(data,)

      console.log('offers', this.offer);
    } catch (err) {
      console.log('offers err', err);
    }
  };
}

export default offerStore;
