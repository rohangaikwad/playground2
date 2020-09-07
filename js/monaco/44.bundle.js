(self.webpackJsonp=self.webpackJsonp||[]).push([[44],{"./node_modules/monaco-editor/esm/vs/basic-languages/redis/redis.js":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conf", function() { return conf; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "language", function() { return language; });\n/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\nvar conf = {\r\n    brackets: [\r\n        [\'{\', \'}\'],\r\n        [\'[\', \']\'],\r\n        [\'(\', \')\']\r\n    ],\r\n    autoClosingPairs: [\r\n        { open: \'{\', close: \'}\' },\r\n        { open: \'[\', close: \']\' },\r\n        { open: \'(\', close: \')\' },\r\n        { open: \'"\', close: \'"\' },\r\n        { open: \'\\\'\', close: \'\\\'\' },\r\n    ],\r\n    surroundingPairs: [\r\n        { open: \'{\', close: \'}\' },\r\n        { open: \'[\', close: \']\' },\r\n        { open: \'(\', close: \')\' },\r\n        { open: \'"\', close: \'"\' },\r\n        { open: \'\\\'\', close: \'\\\'\' },\r\n    ]\r\n};\r\nvar language = {\r\n    defaultToken: \'\',\r\n    tokenPostfix: \'.redis\',\r\n    ignoreCase: true,\r\n    brackets: [\r\n        { open: \'[\', close: \']\', token: \'delimiter.square\' },\r\n        { open: \'(\', close: \')\', token: \'delimiter.parenthesis\' }\r\n    ],\r\n    keywords: [\r\n        "APPEND", "AUTH", "BGREWRITEAOF", "BGSAVE", "BITCOUNT", "BITFIELD", "BITOP", "BITPOS", "BLPOP", "BRPOP", "BRPOPLPUSH",\r\n        "CLIENT", "KILL", "LIST", "GETNAME", "PAUSE", "REPLY", "SETNAME", "CLUSTER", "ADDSLOTS", "COUNT-FAILURE-REPORTS",\r\n        "COUNTKEYSINSLOT", "DELSLOTS", "FAILOVER", "FORGET", "GETKEYSINSLOT", "INFO", "KEYSLOT", "MEET", "NODES", "REPLICATE",\r\n        "RESET", "SAVECONFIG", "SET-CONFIG-EPOCH", "SETSLOT", "SLAVES", "SLOTS", "COMMAND", "COUNT", "GETKEYS", "CONFIG", "GET",\r\n        "REWRITE", "SET", "RESETSTAT", "DBSIZE", "DEBUG", "OBJECT", "SEGFAULT", "DECR", "DECRBY", "DEL", "DISCARD", "DUMP", "ECHO",\r\n        "EVAL", "EVALSHA", "EXEC", "EXISTS", "EXPIRE", "EXPIREAT", "FLUSHALL", "FLUSHDB", "GEOADD", "GEOHASH", "GEOPOS", "GEODIST",\r\n        "GEORADIUS", "GEORADIUSBYMEMBER", "GETBIT", "GETRANGE", "GETSET", "HDEL", "HEXISTS", "HGET", "HGETALL", "HINCRBY", "HINCRBYFLOAT",\r\n        "HKEYS", "HLEN", "HMGET", "HMSET", "HSET", "HSETNX", "HSTRLEN", "HVALS", "INCR", "INCRBY", "INCRBYFLOAT", "KEYS", "LASTSAVE",\r\n        "LINDEX", "LINSERT", "LLEN", "LPOP", "LPUSH", "LPUSHX", "LRANGE", "LREM", "LSET", "LTRIM", "MGET", "MIGRATE", "MONITOR",\r\n        "MOVE", "MSET", "MSETNX", "MULTI", "PERSIST", "PEXPIRE", "PEXPIREAT", "PFADD", "PFCOUNT", "PFMERGE", "PING", "PSETEX",\r\n        "PSUBSCRIBE", "PUBSUB", "PTTL", "PUBLISH", "PUNSUBSCRIBE", "QUIT", "RANDOMKEY", "READONLY", "READWRITE", "RENAME", "RENAMENX",\r\n        "RESTORE", "ROLE", "RPOP", "RPOPLPUSH", "RPUSH", "RPUSHX", "SADD", "SAVE", "SCARD", "SCRIPT", "FLUSH", "LOAD", "SDIFF",\r\n        "SDIFFSTORE", "SELECT", "SETBIT", "SETEX", "SETNX", "SETRANGE", "SHUTDOWN", "SINTER", "SINTERSTORE", "SISMEMBER", "SLAVEOF",\r\n        "SLOWLOG", "SMEMBERS", "SMOVE", "SORT", "SPOP", "SRANDMEMBER", "SREM", "STRLEN", "SUBSCRIBE", "SUNION", "SUNIONSTORE", "SWAPDB",\r\n        "SYNC", "TIME", "TOUCH", "TTL", "TYPE", "UNSUBSCRIBE", "UNLINK", "UNWATCH", "WAIT", "WATCH", "ZADD", "ZCARD", "ZCOUNT", "ZINCRBY",\r\n        "ZINTERSTORE", "ZLEXCOUNT", "ZRANGE", "ZRANGEBYLEX", "ZREVRANGEBYLEX", "ZRANGEBYSCORE", "ZRANK", "ZREM", "ZREMRANGEBYLEX",\r\n        "ZREMRANGEBYRANK", "ZREMRANGEBYSCORE", "ZREVRANGE", "ZREVRANGEBYSCORE", "ZREVRANK", "ZSCORE", "ZUNIONSTORE", "SCAN", "SSCAN",\r\n        "HSCAN", "ZSCAN"\r\n    ],\r\n    operators: [\r\n    // NOT SUPPORTED\r\n    ],\r\n    builtinFunctions: [\r\n    // NOT SUPPORTED\r\n    ],\r\n    builtinVariables: [\r\n    // NOT SUPPORTED\r\n    ],\r\n    pseudoColumns: [\r\n    // NOT SUPPORTED\r\n    ],\r\n    tokenizer: {\r\n        root: [\r\n            { include: \'@whitespace\' },\r\n            { include: \'@pseudoColumns\' },\r\n            { include: \'@numbers\' },\r\n            { include: \'@strings\' },\r\n            { include: \'@scopes\' },\r\n            [/[;,.]/, \'delimiter\'],\r\n            [/[()]/, \'@brackets\'],\r\n            [/[\\w@#$]+/, {\r\n                    cases: {\r\n                        \'@keywords\': \'keyword\',\r\n                        \'@operators\': \'operator\',\r\n                        \'@builtinVariables\': \'predefined\',\r\n                        \'@builtinFunctions\': \'predefined\',\r\n                        \'@default\': \'identifier\'\r\n                    }\r\n                }],\r\n            [/[<>=!%&+\\-*/|~^]/, \'operator\'],\r\n        ],\r\n        whitespace: [\r\n            [/\\s+/, \'white\']\r\n        ],\r\n        pseudoColumns: [\r\n            [/[$][A-Za-z_][\\w@#$]*/, {\r\n                    cases: {\r\n                        \'@pseudoColumns\': \'predefined\',\r\n                        \'@default\': \'identifier\'\r\n                    }\r\n                }],\r\n        ],\r\n        numbers: [\r\n            [/0[xX][0-9a-fA-F]*/, \'number\'],\r\n            [/[$][+-]*\\d*(\\.\\d*)?/, \'number\'],\r\n            [/((\\d+(\\.\\d*)?)|(\\.\\d+))([eE][\\-+]?\\d+)?/, \'number\']\r\n        ],\r\n        strings: [\r\n            [/\'/, { token: \'string\', next: \'@string\' }],\r\n            [/"/, { token: \'string.double\', next: \'@stringDouble\' }]\r\n        ],\r\n        string: [\r\n            [/[^\']+/, \'string\'],\r\n            [/\'\'/, \'string\'],\r\n            [/\'/, { token: \'string\', next: \'@pop\' }],\r\n        ],\r\n        stringDouble: [\r\n            [/[^"]+/, \'string.double\'],\r\n            [/""/, \'string.double\'],\r\n            [/"/, { token: \'string.double\', next: \'@pop\' }]\r\n        ],\r\n        scopes: [\r\n        // NOT SUPPORTED\r\n        ]\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack:///./node_modules/monaco-editor/esm/vs/basic-languages/redis/redis.js?')}}]);