import {FullConfig} from '@playwright/test'
import dotenv from 'dotenv'

async function globalSetup (config: FullConfig) {
  if (process.env.test_env) {
    dotenv.config({
      path: `data/envs/.env.${process.env.test_env}`,
      override: true
    })
  }
  console.log('Config file not found')
}
export default globalSetup
