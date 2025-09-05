import {action, makeObservable, observable} from 'mobx';
import {Stores} from '../../store';

class userLocationStore {
  constructor() {
    makeObservable(this, {});
  }
}

export default userLocationStore;
