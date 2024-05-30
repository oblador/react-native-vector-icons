/* eslint-disable import/no-extraneous-dependencies */

import { beforeAll, beforeEach, describe, it } from '@jest/globals';
import { by, device, element, expect, waitFor } from 'detox';

import { execSync } from 'node:child_process';
import { cpSync, mkdirSync } from 'node:fs';

const takeAndCheckScreenshot = async (name: string) => {
  const screenshot = await device.takeScreenshot(name);
  const file = `${name}.png`;
  mkdirSync('e2e/output/diff', { recursive: true });
  cpSync(screenshot, `e2e/output/${file}`);

  const platform = device.getPlatform();

  const pixels = execSync(
    // Shave top to ignore lock
    // Shave right side to ignore scrollbar
    `compare -crop 1340x3120+0+100 -metric AE -fuzz 2% e2e/snapshot/${platform}/${file} e2e/output/${file} e2e/output/diff/${file} 2>&1 || true`,
  );

  if (pixels.toString().trim() !== '0') {
    // Wierd thing with older RN Remove after we drop 0.70 and 0.71 support
    if (name === 'home-bottom') {
      const pixels2 = execSync(
        `compare -crop 1340x3120+0+100 -metric AE -fuzz 2% e2e/snapshot/${platform}/home-bottom-old.png e2e/output/${file} e2e/output/diff/${file} 2>&1 || true`,
      );
      if (pixels2.toString().trim() !== '0') {
        throw new Error(`Image ${name} has changed by ${pixels2} pixels!`);
      }

      return;
    }

    throw new Error(`Image ${name} has changed by ${pixels} pixels!`);
  }
};

describe('RNVI', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show home', async () => {
    await expect(element(by.id('AntD'))).toBeVisible();
    await takeAndCheckScreenshot('home-top');

    await element(by.id('scroll')).tap();

    // Make sure scrolling fully complete before taking the screenshot
    await waitFor(element(by.id('footer')))
      .toBeVisible()
      .withTimeout(2000);
    await takeAndCheckScreenshot('home-bottom');
  });

  it('should load AntD font', async () => {
    await expect(element(by.id('AntD'))).toBeVisible();
    await element(by.id('AntD')).tap();

    await expect(element(by.text('calculator'))).toBeVisible();
    await takeAndCheckScreenshot('antd');
  });

  it('should load FontAwesome5 font', async () => {
    await expect(element(by.id('FontAwesome5'))).toBeVisible();
    await element(by.id('FontAwesome5')).tap();

    await expect(element(by.id('regular'))).toBeVisible();
    await element(by.id('regular')).tap();

    await expect(element(by.text('bell'))).toBeVisible();
    await takeAndCheckScreenshot('fontawesome5');
  });

  it('should load Fontello font', async () => {
    await expect(element(by.id('Fontello'))).toBeVisible();
    await element(by.id('Fontello')).tap();

    await expect(element(by.text('emo-devil'))).toBeVisible();
    await takeAndCheckScreenshot('fontello');
  });
});
