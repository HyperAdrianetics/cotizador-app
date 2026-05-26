const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
    
    const html = await page.evaluate(() => {
        const orig = document.getElementById('quote-document');
        if (!orig) return "NO DOC";
        const clone = orig.cloneNode(true);
        
        // Inline styles
        const origElements = [orig, ...Array.from(orig.getElementsByTagName("*"))];
        const cloneElements = [clone, ...Array.from(clone.getElementsByTagName("*"))];
        for (let i = 0; i < origElements.length; i++) {
            const comp = window.getComputedStyle(origElements[i]);
            cloneElements[i].style.color = comp.color;
            cloneElements[i].style.backgroundColor = comp.backgroundColor;
            cloneElements[i].style.borderColor = comp.borderColor;
        }
        return clone.outerHTML;
    });
    
    console.log(html.substring(0, 1000));
    await browser.close();
  } catch (e) {
    console.error(e);
  }
})();
