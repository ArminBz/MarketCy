import {action, makeObservable, observable} from 'mobx';

class languageStore {
  constructor() {
    makeObservable(this, {
      lngs: observable,
      count: observable,

      setLngs: action,
      setCounter: action,
    });
  }

  lngs = {
    en: {nativeName: 'English'},
    tr: {nativeName: 'Türkçe'},
    uk: {nativeName: 'Україна'},
    fa: {nativeName: 'فارسی'},
  };
  count = 0;

  setLngs = value => {
    this.lngs = value;
  };
  setCounter = value => {
    this.count = value;
  };
}

export default languageStore;
