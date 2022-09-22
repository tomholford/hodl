import Urbit, {
  PokeInterface,
  Scry,
  SubscriptionRequestInterface,
  Thread,
} from '@urbit/http-api';

let client = undefined as unknown as Urbit;

async function setupAPI() {
  if (!client) {
    const api = new Urbit('', '', window.desk);
    api.ship = window.ship;
    api.verbose = true;
    client = api;
  }
}

const api = {
  async scry<T>(params: Scry) {
    if (!client) {
      await setupAPI();
    }

    return client.scry<T>(params);
  },
  async poke<T>(params: PokeInterface<T>) {
    if (!client) {
      await setupAPI();
    }

    return client.poke<T>(params);
  },
  async subscribe(params: SubscriptionRequestInterface) {
    if (!client) {
      await setupAPI();
    }

    return client.subscribe(params);
  },
  async thread<Return, T>(params: Thread<T>) {
    if (!client) {
      await setupAPI();
    }

    return client.thread<Return, T>(params);
  },
  async unsubscribe(id: number) {
    if (!client) {
      await setupAPI();
    }

    return client.unsubscribe(id);
  },
} as Urbit;

export default api;
