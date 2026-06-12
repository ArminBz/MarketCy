import {makeObservable} from 'mobx';

class UserLocationStore {
  constructor() {
    makeObservable(this, {});
  }
}

export default UserLocationStore;
