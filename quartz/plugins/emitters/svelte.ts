import { FilePath, joinSegments } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { glob } from "../../util/glob"
import DepGraph from "../../depgraph"
import esbuild from "esbuild"
import sveltePlugin from "esbuild-svelte"

export const Svelte: QuartzEmitterPlugin = () => ({
  name: "Svelte",
  getQuartzComponents() {
    return []
  },
  async getDependencyGraph({ argv, cfg }, _content, _resources) {
    const graph = new DepGraph<FilePath>()

    const staticPath = "svelte/elements"
    const fps = await glob("**/*.svelte", staticPath, cfg.configuration.ignorePatterns)
    for (const fp of fps) {
      graph.addEdge(
        joinSegments("svelte", fp) as FilePath,
        joinSegments(argv.output, "svelte", fp) as FilePath,
      )
    }

    return graph
  },
  async emit({ argv, cfg }, _content, _resources): Promise<FilePath[]> {
    const staticPath ="svelte/elements"
    const fps = await glob("**/*.svelte", staticPath, cfg.configuration.ignorePatterns)

    await esbuild.build({
      entryPoints: fps.map(fp => joinSegments(staticPath, fp)),
      outdir: joinSegments(argv.output, "svelte"),
      conditions: ["svelte"],
      bundle: true,
      minify: true,
      format: "esm",
      plugins: [sveltePlugin(
        { compilerOptions: { customElement: true } },
      )],
    })

    return fps.map((fp) => joinSegments(argv.output, "svelte", fp)) as FilePath[]
  },
})
