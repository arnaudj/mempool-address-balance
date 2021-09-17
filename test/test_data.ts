import { Tx } from '@mempool/mempool.js/lib/interfaces/bitcoin/transactions';

export const address = '1Pxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

// https://blockstream.info/tx/53xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Address is 2 times in vin (372+1152), sending 1500 to 1Fz (c0inbase) and change back to itself (24.95)
export const tx1: Tx = {
  txid: '53xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  version: 1,
  locktime: 0,
  vin: [
    {
      txid: '585fxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      vout: 0,
      prevout: {
        scriptpubkey: '76a914f22f55xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        scriptpubkey_asm: 'OP_DUP OP_HASH160 OP_PUSHBYTES_20 redacted OP_EQUALVERIFY OP_CHECKSIG',
        scriptpubkey_type: 'p2pkh',
        scriptpubkey_address: '1Pxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        value: 37200000000,
      },
      scriptsig: 'redacted',
      scriptsig_asm: 'OP_PUSHBYTES_72 redacted OP_PUSHBYTES_33 redacted',
      is_coinbase: false,
      sequence: '4294960000',
    },
    {
      txid: 'a19dfxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      vout: 0,
      prevout: {
        scriptpubkey: '76a914f22f55xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        scriptpubkey_asm:
          'OP_DUP OP_HASH160 OP_PUSHBYTES_20 f22f55xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxe OP_EQUALVERIFY OP_CHECKSIG',
        scriptpubkey_type: 'p2pkh',
        scriptpubkey_address: '1Pxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        value: 115300000000,
      },
      scriptsig: 'redacted',
      scriptsig_asm: 'OP_PUSHBYTES_71 redacted OP_PUSHBYTES_33 redacted',
      is_coinbase: false,
      sequence: '4294960000',
    },
  ],
  vout: [
    {
      scriptpubkey: '76a91xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      scriptpubkey_asm: 'OP_DUP OP_HASH160 OP_PUSHBYTES_20 redacted OP_EQUALVERIFY OP_CHECKSIG',
      scriptpubkey_type: 'p2pkh',
      scriptpubkey_address: '1FzWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      value: 150000000000,
    },
    {
      scriptpubkey: '76a914f22f55xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      scriptpubkey_asm:
        'OP_DUP OP_HASH160 OP_PUSHBYTES_20 f22f55xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxe OP_EQUALVERIFY OP_CHECKSIG',
      scriptpubkey_type: 'p2pkh',
      scriptpubkey_address: '1Pxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      value: 2499500000,
    },
  ],
  size: 373,
  weight: 1492,
  fee: 500000,
  status: {
    confirmed: true,
    block_height: 694507,
    block_hash: '00000000000000000007a000redacted',
    block_time: 1628389000,
  },
};

export const tx1_expectedVin = [
  { scriptpubkey_address: '1Pxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', value_btc: 372 },
  { scriptpubkey_address: '1Pxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', value_btc: 1153 },
];

export const tx1_expectedVout = [
  { scriptpubkey_address: '1FzWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', value_btc: 1500 },
  { scriptpubkey_address: '1Pxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', value_btc: 24.995 },
];

// https://blockstream.info/tx/7d5f7xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// c0inbase to destination and change back to c0inbase
export const tx2: Tx = {
  txid: '7d5f7xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  version: 1,
  locktime: 0,
  vin: [
    {
      txid: 'f45408xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      vout: 0,
      prevout: {
        scriptpubkey: '76a91xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        scriptpubkey_asm: 'OP_DUP OP_HASH160 OP_PUSHBYTES_20 redacted OP_EQUALVERIFY OP_CHECKSIG',
        scriptpubkey_type: 'p2pkh',
        scriptpubkey_address: '1FzWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        value: 10842233768,
      },
      scriptsig: 'redacted',
      scriptsig_asm: 'OP_PUSHBYTES_71 redacted OP_PUSHBYTES_33 redacted',
      is_coinbase: false,
      sequence: '4294960000',
    },
  ],
  vout: [
    {
      scriptpubkey: '76a914f22f55xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      scriptpubkey_asm:
        'OP_DUP OP_HASH160 OP_PUSHBYTES_20 f22f55xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxe OP_EQUALVERIFY OP_CHECKSIG',
      scriptpubkey_type: 'p2pkh',
      scriptpubkey_address: '1Pxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      value: 8800000000,
    },
    {
      scriptpubkey: '76a91xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      scriptpubkey_asm: 'OP_DUP OP_HASH160 OP_PUSHBYTES_20 redacted OP_EQUALVERIFY OP_CHECKSIG',
      scriptpubkey_type: 'p2pkh',
      scriptpubkey_address: '1FzWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      value: 2041733768,
    },
  ],
  size: 225,
  weight: 900,
  fee: 500000,
  status: {
    confirmed: true,
    block_height: 697806,
    block_hash: '00000000000000000008f5480xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    block_time: 1630119000,
  },
};

export const tx2_expectedVin = [
  { scriptpubkey_address: '1FzWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', value_btc: 108.42233768 },
];

export const tx2_expectedVout = [
  { scriptpubkey_address: '1Pxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', value_btc: 88 },
  { scriptpubkey_address: '1FzWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', value_btc: 20.41733768 },
];
