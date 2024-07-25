import { build } from "esbuild";
import { copyFileSync } from "fs";
import { rimraf } from "rimraf";

let args = process.argv[2]
rimraf('dist')

if (args === '--tests') {
    await build({
        entryPoints: ["tests/index.js"],
        bundle: true,
        outfile: "tests/dist/filer.min.js",
        minify: true,
        sourcemap: false
    })
} else if (args === '--prebuild') {
    await build({
        entryPoints: ["src/index.js"],
        bundle: true,
        outfile: "dist/filer.js",
        minify: false,
        globalName: 'Filer',
        sourcemap: false
    })
} else if (args === '--ptest') {
    await copyFileSync('tests/index.html', 'tests/dist/index.html')
} else {
    await build({
        entryPoints: ["src/index.js"],
        bundle: true,
        outfile: "dist/filer.min.js",
        minify: true,
        sourcemap: true,
        globalName: 'Filer'
    })
}

if (args === undefined) args = "Main"
console.log(`${args}'s Build was successfull`)
