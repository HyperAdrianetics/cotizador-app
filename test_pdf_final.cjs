const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Catch the error to see if html2canvas crashes!
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
    
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
    
    const success = await page.evaluate(async () => {
      try {
        const buttons = Array.from(document.querySelectorAll('button'));
        const exportBtn = buttons.find(b => b.textContent.includes('PDF'));
        if (exportBtn) {
            exportBtn.click();
            // wait a bit for html2canvas
            await new Promise(r => setTimeout(r, 4000));
            return true;
        }
        return false;
      } catch(e) {
        console.error(e.message);
        return false;
      }
    });
    
    console.log("Success:", success);
    await browser.close();
  } catch (e) {
    console.error(e);
  }
})();
