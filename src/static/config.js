export const config = {
  'backendHost': 'https://portal.c3s-magic.eu:9001',
  'adagucServicesHost': 'https://portal.c3s-magic.eu:8888'
};

try {
  // eslint-disable-next-line no-undef
  xml2jsonrequestURL = config.backendHost + '/xml2json?';
} catch (e) {
  // console.log(e);
}
// export const config = { 'backendHost': 'https://compute-test.c3s-magic.eu:7777', 'adagucServicesHost': 'https://compute-test.c3s-magic.eu:8888' };
