import { press, scrollToEnd, takeScreenshot, toExist } from 'react-native-owl';

describe('App.tsx', () => {
  it('show home top', async () => {
    await toExist('AntD');

    const screen = await takeScreenshot('home-top');
    expect(screen).toMatchBaseline();
  });

  it('show home bottom', async () => {
    await toExist('AntD');

    await scrollToEnd('scrollview');

    const screen = await takeScreenshot('home-bottom');
    expect(screen).toMatchBaseline();
  });

  it('should load AntD font', async () => {
    await toExist('AntD');
    await press('AntD');

    await toExist('search');

    const screen = await takeScreenshot('antd');
    expect(screen).toMatchBaseline();

    await press('back');
  });

  it('should load FontAwesome6 font', async () => {
    await toExist('FontAwesome6');
    await press('FontAwesome6');

    await toExist('search');

    await press('solid');

    await toExist('search');

    const screen = await takeScreenshot('fontawesome6');
    expect(screen).toMatchBaseline();

    await press('back');
    await press('back');
  });

  it('should load Fontello font', async () => {
    await toExist('Fontello');
    await press('Fontello');

    await toExist('search');

    const screen = await takeScreenshot('fontello');
    expect(screen).toMatchBaseline();

    await press('back');
  });
});
