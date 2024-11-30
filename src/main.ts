import * as core from '@actions/core'
import { Properties } from './types'
import { rustdoc_coverage } from './rustdoc'

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

    const properties = new Properties(
      features,
      toolchain,
      targets.split(' '),
      build_target
    )

    await rustdoc_coverage(properties)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
