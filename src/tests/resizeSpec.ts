import resize from '../utility/resize';

describe('Testing the resize functionality', () => {
  it('Calling resize function with the correct paramaters should return correct img name', async () => {
    const imgName = await resize('fjord', 200, 200);
    expect(imgName).toEqual('fjord_200_200');
  });

  it('Calling resize function with the incorrect paramaters should return error message', async () => {
    const imgName = await resize('fjord', -200, 200);
    expect(imgName).toEqual('problem while resizing image');
  });
});
