var _ = require('lodash');

import { Tx, Vout } from '@mempool/mempool.js/lib/interfaces/bitcoin/transactions';
type VinArray = Tx['vin']; // hack to simulate missing type export
export type VoutArray = Vout[];

interface BusinessTxIoRecord {
  scriptpubkey_address: string;
  value_btc: number;
}

interface BusinessTxData {
  parsed: boolean; // success/error
  txid: string;
  vin?: BusinessTxIoRecord[];
  vout?: BusinessTxIoRecord[];
  adress_balance_change?: number;
  block_time?: string;
  block_height?: number;
}

/**
 * @param address The address for which to watch balance changes
 * @param txs As provided by https://mempool.host-here.notld/api/address/${address}/txs/chain or any similar data source
 * @returns parsed transactions ordered by recency (block height DESC)
 */
export const processTransactions = (address: string, txs: Tx[]): BusinessTxData[] => {
  let utxos: BusinessTxData[] = [];
  for (const tx of txs) {
    const ret = processTransaction(address, tx);
    utxos = _.concat(utxos, ret);
  }

  const validTxs = utxos.filter(item => item.parsed);
  const sortedValidTxs: BusinessTxData[] = _.orderBy(validTxs, ['block_height'], ['desc']);
  if ('development' === process.env.NODE_ENV) {
    console.info(`* Found last valid utxos`, JSON.stringify(sortedValidTxs));
  }

  return sortedValidTxs;
};

/**
 * @param address Address to track transactions for
 * @param tx transaction under processing
 * @returns business view of the transaction
 */
export const processTransaction = (address: string, tx: Tx): BusinessTxData => {
  const txid = tx.txid;
  if ('development' === process.env.NODE_ENV) {
    console.info(`Scanning txid: ${txid} for transactions by scriptpubkey_address=${address}`);
  }
  const tx_vin: VinArray = _.get(tx, 'vin', []);
  const tx_vout: VoutArray = _.get(tx, 'vout', []);
  const block_time = new Date(_.get(tx, 'status.block_time', 0) * 1000).toISOString();
  const block_height = _.get(tx, 'status.block_height', 0);
  if (!txid || _.isEmpty(tx_vin) || _.isEmpty(tx_vout) || !_.get(tx, 'status.confirmed', false) || !block_height) {
    if ('development' === process.env.NODE_ENV) {
      console.info(`Skipping: empty invalid transaction: ${JSON.stringify(tx)}`);
    }
    return { parsed: false, txid };
  }

  const { vin, vout } = _parseVinVout(tx_vin, tx_vout);
  const adress_balance_change = _computeBalanceChangeForAddress(address, vin, vout);

  return {
    parsed: true,
    txid,
    vin: vin,
    vout: vout,
    adress_balance_change,
    block_time,
    block_height,
  };
};

export const _parseVinVout = (
  vin: VinArray,
  vout: VoutArray
): { vin: BusinessTxIoRecord[]; vout: BusinessTxIoRecord[] } => {
  const extractVin = (arr: VinArray) =>
    arr.map(v => ({
      scriptpubkey_address: _.get(v, 'prevout.scriptpubkey_address', ''),
      value_btc: _.get(v, 'prevout.value', 0) / 100000000,
    }));

  const extractVout = (arr: VoutArray) =>
    arr.map(v => ({
      scriptpubkey_address: _.get(v, 'scriptpubkey_address', ''),
      value_btc: _.get(v, 'value', 0) / 100000000,
    }));

  return {
    vin: extractVin(vin),
    vout: extractVout(vout),
  };
};

export const _computeBalanceChangeForAddress = (
  address: string,
  normalizedVin: BusinessTxIoRecord[],
  normalizedVout: BusinessTxIoRecord[]
): number => {
  const sumIt = (arr: BusinessTxIoRecord[]) =>
    arr
      .filter((item: BusinessTxIoRecord) => item.scriptpubkey_address === address) // prettier-ignore
      .reduce((acc: number, item: BusinessTxIoRecord) => acc + item.value_btc, 0);
  const b = sumIt(normalizedVout);
  const a = sumIt(normalizedVin);
  return b - a;
};
