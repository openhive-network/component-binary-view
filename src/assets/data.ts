import { type IBinaryView } from '../components/BinaryView/types';

export default {
  "binary": "16228a6f010ce09696e69746d696e6572046d61746",
  "offsets": [
    {
      "key": "expiration",
      "type": "pod",
      "value": "27.04.2021 4:39:18 PM GMT+02:00 DST",
      "offset": 0,
      "size": 8
    },
    {
      "key": "operations",
      "type": "array",
      "length": 1,
      "offset": 8,
      "size": 34,
      "value": [
        {
          "key": "type",
          "type": "pod",
          "value": "transfer_operation",
          "offset": 10,
          "size": 2
        },
        {
          "key": "value",
          "type": "object",
          "offset": 12,
          "size": 30,
          "value": [
            {
              "key": "from",
              "type": "pod",
              "value": "initminer",
              "offset": 12,
              "size": 20
            },
            {
              "key": "to",
              "type": "pod",
              "value": "mati",
              "offset": 32,
              "size": 10
            }
          ]
        }
      ]
    }
  ]
} satisfies IBinaryView;
