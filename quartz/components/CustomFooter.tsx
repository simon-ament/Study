import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { resolveRelative } from "../util/path"

import { FileNode, Options } from "./ExplorerNode"
import { QuartzPluginData } from "../plugins/vfile"

// Options interface defined in `ExplorerNode` to avoid circular dependency
const defaultOptions = {
  folderClickBehavior: "collapse",
  folderDefaultState: "collapsed",
  useSavedState: true,
  mapFn: (node) => {
    return node
  },
  sortFn: (a, b) => {
    // Sort order: folders first, then files. Sort folders and files alphabetically
    if ((!a.file && !b.file) || (a.file && b.file)) {
      // numeric: true: Whether numeric collation should be used, such that "1" < "2" < "10"
      // sensitivity: "base": Only strings that differ in base letters compare as unequal. Examples: a ≠ b, a = á, a = A
      return a.displayName.localeCompare(b.displayName, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    }

    if (a.file && !b.file) {
      return 1
    } else {
      return -1
    }
  },
  filterFn: (node) => node.name !== "tags",
  order: ["filter", "map", "sort"],
} satisfies Options

export default ((userOpts?: Partial<Options>) => {
  // Parse config
  const opts: Options = { ...defaultOptions, ...userOpts }

  // memoized
  let fileTree: FileNode
  let prevFile: FileNode | null
  let nextFile: FileNode | null

  function constructFileTree(allFiles: QuartzPluginData[]) {
    if (fileTree) {
      return
    }

    // Construct tree from allFiles
    fileTree = new FileNode("")
    allFiles.forEach((file) => fileTree.add(file))

    // Execute all functions (sort, filter, map) that were provided (if none were provided, only default "sort" is applied)
    if (opts.order) {
      // Order is important, use loop with index instead of order.map()
      for (let i = 0; i < opts.order.length; i++) {
        const functionName = opts.order[i]
        if (functionName === "map") {
          fileTree.map(opts.mapFn)
        } else if (functionName === "sort") {
          fileTree.sort(opts.sortFn)
        } else if (functionName === "filter") {
          fileTree.filter(opts.filterFn)
        }
      }
    }
  }

  function getPrev(file: QuartzPluginData) {
    prevFile = getPrevOverload(fileTree, file)
  }

  function getPrevOverload(tree: FileNode, file: QuartzPluginData) {
    let childrenPaths = tree.children.map(child => child.file?.filePath);
    if (childrenPaths.includes(file.filePath)) {
      let index = childrenPaths.indexOf(file.filePath)
      return tree.children[index - 1]
    }

    for (let child of tree.children) {
      if (getPrevOverload(child, file)) {
        return getPrevOverload(child, file);
      }
    }

    return null;
  }

  function getNext(file: QuartzPluginData) {
    nextFile = getNextOverlaod(fileTree, file)
  }

  function getNextOverlaod(tree: FileNode, file: QuartzPluginData): FileNode | null {
    let childrenPaths = tree.children.map(child => child.file?.filePath);
    if (childrenPaths.includes(file.filePath)) {
      let index = childrenPaths.indexOf(file.filePath)
      return tree.children[index + 1]
    }

    for (let child of tree.children) {
      if (getNextOverlaod(child, file)) {
        return getNextOverlaod(child, file);
      }
    }

    return null;
  }

  const Footer: QuartzComponent = ({ allFiles, fileData, displayClass, cfg }: QuartzComponentProps) => {
    constructFileTree(allFiles)
    getPrev(fileData)
    getNext(fileData)
    const year = new Date().getFullYear()
    
    return (
      <footer class={`${displayClass ?? ""}`}>
        {(prevFile?.file || nextFile?.file) && (
          <div style="display: flex; flex-direction: row; justify-content: space-between">
            <div>
              {prevFile?.file && (
                <a href={resolveRelative(fileData.slug!, prevFile.file.slug!)} class="internal">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="5 8 14 8"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    style="transform: rotate(90deg); margin-right: 0.5rem;"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                  {prevFile.displayName}
                </a>
              )}
            </div>
            <div>
              {nextFile?.file && (
                <a href={resolveRelative(fileData.slug!, nextFile.file.slug!)} class="internal">
                {nextFile.displayName}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="5 8 14 8"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  style="transform: rotate(-90deg); margin-left: 0.5rem;"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </a>
              )}
            </div>
          </div>
        )}

        {!prevFile?.file && !nextFile?.file && (
          <p>
            Keine benachbarten Seiten
          </p>
        )}
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
