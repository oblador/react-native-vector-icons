#!/use/bin/env node
/* eslint-disable no-console */

const FreeAll = require('../temp/free_all.json');
const ProAll = require('../temp/pro_all.json');

const complete = {
  free: FreeAll,
  pro: ProAll,
};

console.log(JSON.stringify(complete, null, 2));
