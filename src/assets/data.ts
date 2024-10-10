import { type IBinaryView } from '../components/BinaryView/types';

export default {
  "binary": "3d35b69068fe6c8807670202046d61746909696e69746d696e657288130000000000002320bcbe1753656e64696e67206c6f76652028616e6420686976652900046d61746909696e69746d696e6572047465737410270001205da0a7aa93c80ac3131e5bc6f897878fa1ae8adcf80facfc54b3d7e658f2dee9042952b8e9023c4a9662d0197c9787b30a1a35ead9669ab4f0e5ac7fdc5b9148",
  "offsets": [
    {
      key: 'ref_block_num',
      type: 'pod',
      offset: 0,
      size: 2,
      value: '15669'
    },
    {
      key: 'ref_block_prefix',
      type: 'pod',
      offset: 2,
      size: 4,
      value: '4268265654'
    },
    {
      key: 'expiration',
      type: 'pod',
      offset: 6,
      size: 4,
      value: 'Thu Oct 10 2024 07:55:24 GMT+0000'
    },
    {
      key: 'operations',
      type: 'array',
      offset: 10,
      size: 76,
      length: 2,
      value: [{
        key: '0',
        type: 'object',
        offset: 11,
        size: 52,
        value: [{
          key: 'type',
          type: 'pod',
          offset: 11,
          size: 1,
          value: 'transfer_operation'
        }, {
          key: 'value',
          type: 'object',
          offset: 12,
          size: 51,
          value: [{
            key: 'from',
            type: 'pod',
            offset: 12,
            size: 5,
            value: 'mati'
          }, {
            key: 'to',
            type: 'pod',
            offset: 17,
            size: 10,
            value: 'initminer'
          }, {
            key: 'amount',
            type: 'object',
            offset: 27,
            size: 12,
            value: [{
              key: 'amount',
              type: 'pod',
              offset: 27,
              size: 8,
              value: '5000'
            }, {
              key: 'symbol',
              type: 'pod',
              offset: 35,
              size: 4,
              value: 'HIVE'
            }]
          }, {
            key: 'memo',
            type: 'pod',
            offset: 37,
            size: 24,
            value: 'Sending love (and hive)'
          }]
        }]
      },
      {
        key: '1',
        type: 'object',
        offset: 63,
        size: 23,
        value: [{
          key: 'type',
          type: 'pod',
          offset: 63,
          size: 1,
          value: 'vote_operation'
        }, {
          key: 'value',
          type: 'object',
          offset: 64,
          size: 22,
          value: [{
            key: 'voter',
            type: 'pod',
            offset: 64,
            size: 5,
            value: 'mati'
          }, {
            key: 'author',
            type: 'pod',
            offset: 69,
            size: 10,
            value: 'initminer'
          }, {
            key: 'permlink',
            type: 'pod',
            offset: 79,
            size: 5,
            value: 'test'
          }, {
            key: 'weight',
            type: 'pod',
            offset: 84,
            size: 2,
            value: '10000'
          }]
        }]
      }]
    },
    {
      key: 'extensions',
      type: 'array',
      offset: 86,
      size: 1,
      length: 0,
      value: []
    },
    {
      key: 'signatures',
      type: 'array',
      offset: 87,
      size: 1,
      length: 1,
      value: [{
        key: '0',
        type: 'pod',
        offset: 88,
        size: 65,
        value: '(binary)'
      }]
    }
  ]
} satisfies IBinaryView;
