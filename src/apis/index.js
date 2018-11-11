import request from 'request';

export const HOST = 'http://10.75.203.25:5000';
const IMAGE_ENDPOINT = HOST + '/image';
const POST_ENDPOINT = HOST + '/asset_report';

/**
 *
 * interface Image {
 *    id: string,
 *   url: string,
 *  }
 *
 */
export const getImage = async () => (
  await fetch(IMAGE_ENDPOINT)
    .then(res => res.json())
    .catch(err => {
      console.log(err);
      return null;
    })
);

export const sendResults = async (results) => {
  request.post({
    url: POST_ENDPOINT,
    json: results,
  }, (err, res, body) => {
    if (err) {
      console.log(err);
    }
  });
};