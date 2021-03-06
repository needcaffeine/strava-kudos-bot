const puppeteer = require('puppeteer')

try {
    (async () => {
        const browser = await puppeteer.launch({ headless: false, slowMo: 10 })
        const page = await browser.newPage()

        await page.setViewport({ width: 1280, height: 1024 })
        await page.goto('https://www.strava.com/')
        await page.click('a.btn-login')
        await page.waitForSelector('form')

        // Login to the site.
        await page.type('input#email', process.env.STRAVA_EMAIL)
        await page.type('input#password', process.env.STRAVA_PASSWORD)
        await page.click('button#login-button')
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        await page.waitFor(3000)

        // Find and click all the unclicked kudos buttons.
        await page.$$eval('button[title="Give Kudos"]', buttons => {
            buttons.map(button => {
                button.click()
            })
        })

        await browser.close()
    })()
} catch (err) {
    console.error(err)
}
