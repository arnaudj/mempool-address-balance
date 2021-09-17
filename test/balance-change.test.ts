import { _computeBalanceChangeForAddress } from '../src';
import { address, tx1_expectedVin, tx1_expectedVout, tx2_expectedVin, tx2_expectedVout } from './test_data';

describe('computex balance change', () => {
  it('tx1', () => {
    const delta = _computeBalanceChangeForAddress(address, tx1_expectedVin, tx1_expectedVout);
    expect(delta).toEqual(-1500.005);
  });

  it('tx2', () => {
    const delta = _computeBalanceChangeForAddress(address, tx2_expectedVin, tx2_expectedVout);
    expect(delta).toEqual(88);
  });
});
