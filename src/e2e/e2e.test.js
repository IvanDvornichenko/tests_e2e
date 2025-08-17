import puppetteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(30000);

describe("Credit Card Validator form", () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = "http://localhost:9000";

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    browser = await puppetteer.launch({
      headless: false,
      slowMo: 250,
      devtools: true,
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  describe("changing payment system", () => {
    beforeEach(async () => {
      await page.goto(baseUrl);
    });

    test("change visa payment", async () => {
      await page.type(".input", "4");
      const card = await page.$eval(".visa-card", (el) => el.className);
      expect(card).toContain("active-card");
    });
    test("change master card payment", async () => {
      await page.type(".input", "5");
      const card = await page.$eval(".mastercard-card", (el) => el.className);
      expect(card).toContain("active-card");
    });
    test("change amex payment", async () => {
      await page.type(".input", "37");
      const card = await page.$eval(".amex-card", (el) => el.className);
      expect(card).toContain("active-card");
    });
    test("change discover payment", async () => {
      await page.type(".input", "6");
      const card = await page.$eval(".discover-card", (el) => el.className);
      expect(card).toContain("active-card");
    });
    test("change jcb payment", async () => {
      await page.type(".input", "35");
      const card = await page.$eval(".jcb-card", (el) => el.className);
      expect(card).toContain("active-card");
    });
    test("change dinners club payment", async () => {
      await page.type(".input", "30");
      const card = await page.$eval(".dinners-club-card", (el) => el.className);
      expect(card).toContain("active-card");
    });
    test("change mir payment", async () => {
      await page.type(".input", "2");
      const card = await page.$eval(".mir-card", (el) => el.className);
      expect(card).toContain("active-card");
    });
    test("valid card number", async () => {
      await page.type(".input", "4532257567326942");
      const submit = await page.$(".validate-btn");
      await submit.click();
      const validMarker = await page.$eval(
        ".valid-marker",
        (el) => el.className,
      );
      expect(validMarker).toContain("valid-marker");
    });

    test("invalid card number", async () => {
      await page.type(".input", "090909");
      const submit = await page.$(".validate-btn");
      await submit.click();
      const validMarker = await page.$eval(
        ".invalid-marker",
        (el) => el.className,
      );
      expect(validMarker).toContain("invalid-marker");
    });
  });
});
