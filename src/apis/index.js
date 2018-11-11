export const HOST = 'http://10.75.203.25:5000';
const IMAGE_ENDPOINT = HOST + '/image';

/**
 *
 * interface Image {
 *    id: string,
 *   url: string,
 *  }
 *
 */
export const getImage = async () => (
  await fetch(IMAGE_ENDPOINT).then(res => res.json()).catch(err => {
    console.log(err);
    return null;
  })
);

export const sendLocations = async (locations) => {

};