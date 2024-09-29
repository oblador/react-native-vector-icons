// import { beforeAll, beforeEach, describe, it } from '@jest/globals';
//
// import { execSync } from 'node:child_process';
// import { cpSync, mkdirSync } from 'node:fs';

import { press, scrollToEnd, takeScreenshot, toExist } from 'react-native-owl';

describe('App.tsx', () => {
  it('show home top', async () => {
    await toExist('AntD');
    const screen = await takeScreenshot('home-top');

    expect(screen).toMatchBaseline();
  });

  it('show home bottom', async () => {
    await scrollToEnd('scrollview');

    const screen = await takeScreenshot('home-bottom');

    expect(screen).toMatchBaseline();
  });

  // it('should load AntD font', async () => {
  //   await expect(element(by.id('AntD'))).toBeVisible();
  //   await element(by.id('AntD')).tap();
  //
  //   await expect(element(by.text('calculator'))).toBeVisible();
  //   await takeAndCheckScreenshot('antd');
  // });
  //
  // it('should load FontAwesome5 font', async () => {
  //   await expect(element(by.id('FontAwesome5'))).toBeVisible();
  //   await element(by.id('FontAwesome5')).tap();
  //
  //   await expect(element(by.id('regular'))).toBeVisible();
  //   await element(by.id('regular')).tap();
  //
  //   await expect(element(by.text('bell'))).toBeVisible();
  //   await takeAndCheckScreenshot('fontawesome5');
  // });
  //
  // it('should load Fontello font', async () => {
  //   await expect(element(by.id('Fontello'))).toBeVisible();
  //   await element(by.id('Fontello')).tap();
  //
  //   await expect(element(by.text('emo-devil'))).toBeVisible();
  //   await takeAndCheckScreenshot('fontello');
  // });
});

// const takeAndCheckScreenshot = async (name: string) => {
//   const screenshot = await device.takeScreenshot(name);
//   const file = `${name}.png`;
//   mkdirSync('e2e/output/diff', { recursive: true });
//   cpSync(screenshot, `e2e/output/${file}`);
//
//   const platform = device.getPlatform();
//
//   const pixels = execSync(
//     // Shave top to ignore lock
//     // Shave right side to ignore scrollbar
//     // Shave bottom to ignore buttons
//     `compare -crop 1340x2850+0+100 -metric AE -fuzz 2% e2e/snapshot/${platform}/${file} e2e/output/${file} e2e/output/diff/${file} 2>&1 || true`,
//   );
//
//   if (pixels.toString().trim() !== '0') {
//     throw new Error(`Image ${name} has changed by ${pixels} pixels!`);
//   }
// };
