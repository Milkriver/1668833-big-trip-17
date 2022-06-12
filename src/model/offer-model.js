import { UpdateType } from '../const.js';
import Observable from '../framework/observable.js';

export default class OfferModel extends Observable{
  #offerApiService = null;
  #offers = [];

  constructor(offerApiService) {
    super();
    this.#offerApiService = offerApiService;
  }

  get offers() {
    return this.#offers;
  }

  init = async () => {
    try {
      this.#offers = await this.#offerApiService.offers;
    } catch(err) {
      this.#offers = [];
    }
    this._notify(UpdateType .INIT);
  };

}
