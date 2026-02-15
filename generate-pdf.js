const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1587, height: 800 });
  await page.goto("http://127.0.0.1:4000/asporea-cv/");
  await page.emulateMedia({ media: "screen" });

  // Force skill bar widths from data-level attributes (normally set by JS animation)
  await page.evaluate(() => {
    document.querySelectorAll(".level-bar-inner").forEach((el) => {
      el.style.width = el.getAttribute("data-level");
    });
  });

  const height = await page.evaluate(() => document.body.scrollHeight);
  await page.pdf({
    path: "cv.pdf",
    width: "297mm",
    height: height + "px",
    printBackground: true,
    margin: { top: "0", bottom: "0", left: "0", right: "0" },
  });

  console.log("cv.pdf generated successfully");
  await browser.close();
})();