import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  page.setDefaultTimeout(20000);

  // Open app
  await page.goto('http://localhost:5173/');

  // Wait for search input, type query and submit
  await page.waitForSelector('#search-field');
  await page.click('#search-field');
  await page.type('#search-field', 'adele');
  await page.keyboard.press('Enter');

  // Wait for results (SongCard title link)
  await page.waitForSelector('.font-semibold a', { timeout: 15000 });

  // Collect up to 5 titles
  const titles = await page.$$eval('.font-semibold a', els => els.slice(0,5).map(e => e.textContent.trim()));

  console.log(JSON.stringify({ titles }, null, 2));

  await browser.close();
  process.exit(0);
})().catch(err => {
  console.error('Error during verification:', err);
  process.exit(1);
});
