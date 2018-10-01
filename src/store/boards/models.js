import mapKeys from "lodash/mapKeys";
import { Noise } from "../noises/models";
import router from "../../router";

export class Board {
  constructor() {
    (this.name = ""), (this.id = ""), (this.doc = null);
    this.deleting = false;
    this.editing = false;
    this.sourcesLoaded = false;
    this.keys = {
      "1": null,
      "2": null,
      "3": null,
      "4": null,
      "5": null,
      "6": null,
      "7": null,
      "8": null,
      "9": null,
      "0": null,
      a: null,
      b: null,
      c: null,
      d: null,
      e: null,
      f: null,
      g: null,
      h: null,
      i: null,
      j: null,
      k: null,
      l: null,
      m: null,
      n: null,
      o: null,
      p: null,
      q: null,
      r: null,
      s: null,
      t: null,
      u: null,
      v: null,
      w: null,
      x: null,
      y: null,
      z: null
    };
    document.addEventListener("BOARD_VIEW", this._handleView.bind(this));
  }

  _handleView(event) {
    this.loadSources(event.detail.boardId);
  }

  loadSources(id) {
    if (!this.sourcesLoaded && id === this.id) {
      mapKeys(this.keys, (value, key) => {
        const noise = this.keys[key];
        noise && noise.loadSource();
      });
    }
  }

  get saveData() {
    const keySaves = {};

    mapKeys(this.keys, (value, key) => {
      if (this.keys[key]) {
        keySaves[key] = this.keys[key].saveData;
      }
    });

    return Object.assign(
      {},
      {
        name: this.name,
        id: this.id,
        keys: keySaves
      }
    );
  }

  static fromData(data) {
    let board = new Board();

    mapKeys(data.keys, (value, key) => {
      data.keys[key] = Noise.fromData(data.keys[key]);
    });

    data.keys = Object.assign(board.keys, data.keys);
    board = Object.assign(board, data);

    // ugly place to do this but it's better than loading
    // all sounds up front.
    if (router && router.history.current.params.id === board.id) {
      board.loadSources(router.history.current.params.id);
    }

    return board;
  }
}
