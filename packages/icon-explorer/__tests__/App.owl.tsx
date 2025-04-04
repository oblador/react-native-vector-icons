import { press, scrollToEnd, takeScreenshot, toExist } from '@johnf/react-native-owl';

describe('App.tsx', () => {
  it('show home top', async () => {
    await takeScreenshot('home-top-before');

    await toExist('AntD');

    const screen = await takeScreenshot('home-top');

    // NOTE: Sometimes ios home bar has the wrong color so we crop the bottom
    expect(screen).toMatchBaseline({ bottomCrop: 20 });
  });

  it('show home bottom', async () => {
    await takeScreenshot('home-bottom-before');
    await toExist('AntD');

    await scrollToEnd('scrollview');

    const screen = await takeScreenshot('home-bottom');

    // NOTE: Sometimes ios home bar has the wrong color so we crop the bottom
    expect(screen).toMatchBaseline({ bottomCrop: 20 });
  });

  it('should load Test fonts', async () => {
    await takeScreenshot('tests-before');
    await toExist('TestMode');
    await press('TestMode');

    await toExist('TestScreen');

    const screen = await takeScreenshot('tests');

    // NOTE: Sometimes ios home bar has the wrong color so we crop the bottom
    expect(screen).toMatchBaseline({ bottomCrop: 20 });
  });
});
