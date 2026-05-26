const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  try {
    const downloadPath = path.resolve(__dirname, 'downloads');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    const client = await page.target().createCDPSession();
    await client.send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: downloadPath
    });

    await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
    
    // Evaluate the export function
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const exportBtn = buttons.find(b => b.textContent.includes('PDF'));
      if (exportBtn) exportBtn.click();
    });
    
    console.log("Waiting for PDF...");
    for(let i=0; i<20; i++) {
        await new Promise(r => setTimeout(r, 1000));
        const files = fs.readdirSync(downloadPath);
        if(files.find(f => f.endsWith('.pdf'))) {
            console.log("PDF generated:", files.find(f => f.endsWith('.pdf')));
            break;
        }
    }
    await browser.close();
  } catch (e) {
    console.error(e);
  }
})();
