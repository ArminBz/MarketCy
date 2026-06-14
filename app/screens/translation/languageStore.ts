import {action, makeObservable, observable} from 'mobx';

type Languages = {[code: string]: {nativeName: string}};

class LanguageStore {
  constructor() {
    makeObservable(this, {
      lngs: observable,
      count: observable,

      setLngs: action,
      setCounter: action,
    });
  }

  lngs: Languages = {
    en: {nativeName: 'English'},
    tr: {nativeName: 'Türkçe'},
    uk: {nativeName: 'Україна'},
    fa: {nativeName: 'فارسی'},
  };
  count = 0;

  setLngs = (value: Languages) => {
    this.lngs = value;
  };
  setCounter = (value: number) => {
    this.count = value;
  };
}

export default LanguageStore;
