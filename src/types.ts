export class Properties {
  features: string[]
  toolchain: string
  targets: string[]
  build_target: string

  constructor(
    features: string,
    toolchain: string,
    targets: string[],
    build_target: string
  ) {
    targets.forEach(feature => {
      if (!allowed_build.includes(feature)) {
        throw new Error(
          `target '${feature}' is not allowed. See the list of allowed build values: ${allowed_build}`
        )
      }
    })

    this.features = features.split(' ')
    this.toolchain = toolchain
    this.targets = targets
    this.build_target = build_target
  }
}

const allowed_build = [
  'lib',
  'bin',
  'bins',
  'examples',
  'tests',
  'benches',
  'all-target'
]
