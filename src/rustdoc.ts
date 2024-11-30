import { Properties } from './types'
import * as core from '@actions/core'
import * as exec from '@actions/exec'

export async function rustdoc_coverage(
  properties: Properties
): Promise<void | never> {
  try {
    // TODO: Install rust if not installed on the machine
    let coverage = ''
    let coverageError = ''
    const options = {
      listeners: {
        stdout: (data: Buffer) => {
          coverage += data.toString()
        },
        stderr: (data: Buffer) => {
          coverageError += data.toString()
        }
      }
    }

    const args = [`+${properties.toolchain}`, 'rustdoc']
    properties.targets.forEach(target => {
      args.push(`--${target}`)
    })

    if (properties.features.length > 0) {
      args.push('--features')
      args.push(...properties.features)
    }
    if (properties.build_target !== '') {
      args.push(...['--target', properties.build_target])
    }

    await exec.exec('cargo', args, options)

    if (coverageError !== '') {
      return core.setFailed(`Unexpected error occurred: ${coverageError}`)
    }

    core.summary.addRaw(coverage)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
