const { join } = require('path')
const cheerio = require('cheerio')
const logger = require('@/logger')
const { setup, get } = require('@nuxtjs/module-test-utils')
const rootDir = join(__dirname, '..', 'example', 'windicss')
const nuxtConfig = require(join(rootDir, 'nuxt.config.js'))

logger.mockTypes(() => jest.fn())

describe('windicss fixture', () => {
  let nuxt
  beforeAll(async () => {
    const config = {
      rootDir,
      dev: true,
      ...nuxtConfig
    }

    nuxt = (await setup(config)).nuxt
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  beforeEach(() => {
    logger.clear()
  })

  test('can render the home page', async () => {
    const html = await get('/')
    const $ = cheerio.load(html)
    expect($('[data-testid="hello"]').text().trim()).toEqual('Hello Windi CSS')
    // @todo verify data-testid data-v-* value has had the correct styles applied
  })
})