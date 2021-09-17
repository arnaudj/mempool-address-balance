import { processTransaction } from '../src';
import { address, tx1, tx1_expectedVin, tx1_expectedVout, tx2, tx2_expectedVin, tx2_expectedVout } from './test_data';

describe('processTransaction', () => {
  it('tx1', () => {
    const r = processTransaction(address, tx1);
    expect(r.parsed).toBe(true);
    expect(r.txid).toBe('53xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    expect(r.vin).toEqual(tx1_expectedVin);
    expect(r.vout).toEqual(tx1_expectedVout);
    expect(r.adress_balance_change).toEqual(-1500.005);
    expect(r.block_time).toEqual('2021-08-08T02:16:40.000Z');
    expect(r.block_height).toEqual(694507);
  });

  it('tx2', () => {
    const r = processTransaction(address, tx2);
    expect(r.parsed).toBe(true);
    expect(r.txid).toBe('7d5f7xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    expect(r.vin).toEqual(tx2_expectedVin);
    expect(r.vout).toEqual(tx2_expectedVout);
    expect(r.adress_balance_change).toEqual(88);
    expect(r.block_time).toEqual('2021-08-28T02:50:00.000Z');
    expect(r.block_height).toEqual(697806);
  });
});
