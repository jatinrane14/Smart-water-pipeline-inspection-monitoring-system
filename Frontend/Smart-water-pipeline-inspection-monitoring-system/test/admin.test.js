import  { Builder, By, until,Browser } from "selenium-webdriver"
import  assert from "node:assert/strict";

describe("Navigation test", function () {
  this.timeout(15000);

  let driver;

  before(async function () {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
  });

  after(async function () {
    if (driver) await driver.quit();
  });

  it("should navigate to dashboard on button click", async function () {
    await driver.get("http://localhost:5173");

    await driver.findElement(
      By.xpath("//button[text()='Login']")
    ).click();

    await driver.wait(
      until.urlContains("/admin"),
      5000
    );

    assert.ok(
      (await driver.getCurrentUrl()).endsWith("/admin"),
      "Navigation to dashboard failed"
    );
  });
});