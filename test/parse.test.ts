import { _parseVinVout } from '../src';
import { tx1, tx1_expectedVin, tx1_expectedVout, tx2, tx2_expectedVin, tx2_expectedVout } from './test_data';

describe('_parseVinVout', () => {
  it('tx1', () => {
    const r = _parseVinVout(tx1.vin, tx1.vout);
    expect(r.vin).toEqual(tx1_expectedVin);
    expect(r.vout).toEqual(tx1_expectedVout);
  });

  it('tx2', () => {
    const r = _parseVinVout(tx2.vin, tx2.vout);
    expect(r.vin).toEqual(tx2_expectedVin);
    expect(r.vout).toEqual(tx2_expectedVout);
  });
});
