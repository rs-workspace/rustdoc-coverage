import * as core from '@actions/core'
import { exec } from '@actions/exec'
import { Properties } from './types'
import { rustdoc_coverage } from './rustdoc'
import { delay } from './utils'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const features = core.getInput('features')
    const toolchain = core.getInput('toolchain', { required: true })
    const targets = core.getInput('targets')
    const build_target = core.getInput('build_target')
    const working_directory = core.getInput('working_directory')

    const properties = new Properties(
      features,
      toolchain,
      targets.split(' '),
      build_target
    )

    if (working_directory !== '') {
      await delay(1000)
      await exec(`cd ${working_directory}`)
    }

    await rustdoc_coverage(properties)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
