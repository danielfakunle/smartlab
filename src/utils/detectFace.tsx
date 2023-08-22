type BoundingBox = {
  top_row: number;
  bottom_row: number;
  left_col: number;
  right_col: number;
};

type DataRegions = {
  data: {};
  id: string;
  region_info: {
    bounding_box: BoundingBox;
  };
  value: number;
}[];

export default async function detectFace(imageUrl: string) {
  const PAT = 'e7a10e61e24e4e3f97eb5e713d08d5d1';
  const USER_ID = 'dfakunl';
  const APP_ID = 'smart-brain';
  const MODEL_ID = 'face-detection';
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Key ' + PAT,
    },
    body: raw,
  };

  try {
    const response = await fetch(
      'https://api.clarifai.com/v2/models/' + MODEL_ID + '/outputs',
      requestOptions
    );
    const data = await response.json();
    const dataRegions: DataRegions = await data.outputs[0].data.regions;
    return dataRegions;
  } catch {
    return null;
  }
}
