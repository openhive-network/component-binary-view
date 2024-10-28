export const opHf26 = {
  binary:
    '02086f6e65706c7573370b6b727970746f67616d6573e0930400000000002320bcbe1b526f6c6c20756e6465722035302034643433346264393433363136',
  offsets: [
    { key: 'type', type: 'scalar', offset: 0, size: 1, value: 'transfer_operation' },
    {
      key: 'value',
      type: 'object',
      offset: 1,
      size: 61,
      value: '',
      children: [
        { key: 'from', type: 'scalar', offset: 1, size: 9, value: 'oneplus7' },
        { key: 'to', type: 'scalar', offset: 10, size: 12, value: 'kryptogames' },
        {
          key: 'amount',
          type: 'object',
          offset: 22,
          size: 12,
          value: '',
          children: [
            {
              key: 'amount',
              type: 'object',
              offset: 22,
              size: 8,
              value: '',
              children: [{ key: 'value', type: 'scalar', offset: 22, size: 8, value: '300000' }]
            },
            {
              key: 'symbol',
              type: 'scalar',
              offset: 30,
              size: 4,
              value: '@@000000021'
            }
          ]
        },
        { key: 'memo', type: 'scalar', offset: 34, size: 28, value: 'Roll under 50 4d434bd943616' }
      ]
    }
  ]
}

export const opLegacy = {
  binary:
    '02086f6e65706c7573370b6b727970746f67616d6573e09304000000000003535445454d00001b526f6c6c20756e6465722035302034643433346264393433363136',
  offsets: [
    { key: 'type', type: 'scalar', offset: 0, size: 1, value: 'transfer_operation' },
    {
      key: 'value',
      type: 'object',
      offset: 1,
      size: 65,
      value: '',
      children: [
        { key: 'from', type: 'scalar', offset: 1, size: 9, value: 'oneplus7' },
        { key: 'to', type: 'scalar', offset: 10, size: 12, value: 'kryptogames' },
        {
          key: 'amount',
          type: 'object',
          offset: 22,
          size: 16,
          value: '',
          children: [
            {
              key: 'amount',
              type: 'object',
              offset: 22,
              size: 8,
              value: '',
              children: [{ key: 'value', type: 'scalar', offset: 22, size: 8, value: '300000' }]
            },
            {
              key: 'symbol',
              type: 'scalar',
              offset: 30,
              size: 8,
              value: 'HIVE'
            }
          ]
        },
        { key: 'memo', type: 'scalar', offset: 38, size: 28, value: 'Roll under 50 4d434bd943616' }
      ]
    }
  ]
}
