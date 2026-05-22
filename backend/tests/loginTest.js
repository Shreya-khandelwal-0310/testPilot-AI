const { Builder, By } = require("selenium-webdriver");
require("chromedriver");

const fs = require("fs");

async function runLoginTest() {

  try {

    console.log("Selenium Started ✅");

    let driver = await new Builder()
      .forBrowser("chrome")
      .build();

    console.log("Chrome Opened ✅");

    // Open Website
    await driver.get(
      "https://practicetestautomation.com/practice-test-login/"
    );

    // Enter Username
    await driver.findElement(By.id("username"))
      .sendKeys("student");

    // Enter Password
    await driver.findElement(By.id("password"))
      .sendKeys("Password123");

    // Click Login
    await driver.findElement(By.id("submit"))
      .click();

    // Wait
    await driver.sleep(5000);

    // Screenshot
    let image = await driver.takeScreenshot();

    fs.writeFileSync(
      "./screenshots/login-success.png",
      image,
      "base64"
    );

    console.log("Screenshot Saved ✅");

    // Keep browser open for 10 sec
    await driver.sleep(10000);

    await driver.quit();

    console.log("Browser Closed ✅");

  } catch (error) {

    console.log("Automation Error ❌");

    console.log(error);

  }

}

module.exports = runLoginTest;