export enum Status {
  Starting,
  Started,
  Stopping,
  Stopped,
  Error,
}

export interface CommonNode {
  // TODO: change id to a uuid
  id: number;
  networkId: number;
  name: string;
  type: 'bitcoin' | 'lightning';
  version: string;
  status: Status;
  errorMsg?: string;
  docker: {
    image: string;
    command: string;
  };
}

export interface LightningNode extends CommonNode {
  type: 'lightning';
  implementation: 'LND' | 'c-lightning' | 'eclair';
  backendName: string;
  ports: Record<string, number | undefined>;
}

export interface LndNode extends LightningNode {
  paths: {
    tlsCert: string;
    adminMacaroon: string;
    readonlyMacaroon: string;
  };
  ports: {
    rest: number;
    grpc: number;
    p2p: number;
  };
}

export interface CLightningNode extends LightningNode {
  paths: {
    macaroon: string;
  };
  ports: {
    rest: number;
    p2p: number;
  };
}

export interface BitcoinNode extends CommonNode {
  type: 'bitcoin';
  implementation: 'bitcoind' | 'btcd';
  peers: string[];
  ports: {
    rpc: number;
    zmqBlock: number;
    zmqTx: number;
  };
}

export type NodeImplementation =
  | BitcoinNode['implementation']
  | LightningNode['implementation'];
