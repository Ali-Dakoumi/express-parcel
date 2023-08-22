import ViteImagemin from 'vite-plugin-imagemin';
import path from 'path';
import fs from 'fs';
// vite.config.js

export default {
    plugins: [
        ViteImagemin()
    ],
    build: {
        rollupOptions: {
            input: getEntryPoints('assets/scripts'),
            output: {
                entryFileNames: `assets/[name].js`,
                chunkFileNames: `assets/[name].js`,
                assetFileNames: `assets/[name].[ext]`
            }
        }
    }
};

const DEFAULT_OPTIONS = {
    test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
    exclude: undefined,
    include: undefined,
    includePublic: true,
    logStats: true,
    ansiColors: true,
    svg: {
        multipass: true,
        plugins: [
            {
                name: 'preset-default',
                params: {
                    overrides: {
                        cleanupNumericValues: false,
                        removeViewBox: false, // https://github.com/svg/svgo/issues/1128
                    },
                    cleanupIDs: {
                        minify: false,
                        remove: false,
                    },
                    convertPathData: false,
                },
            },
            'sortAttrs',
            {
                name: 'addAttributesToSVGElement',
                params: {
                    attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
                },
            },
        ],
    },
    png: {
        // https://sharp.pixelplumbing.com/api-output#png
        quality: 100,
    },
    jpeg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 100,
    },
    jpg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 100,
    },
    tiff: {
        // https://sharp.pixelplumbing.com/api-output#tiff
        quality: 100,
    },
    // gif does not support lossless compression
    // https://sharp.pixelplumbing.com/api-output#gif
    gif: {},
    webp: {
        // https://sharp.pixelplumbing.com/api-output#webp
        lossless: true,
    },
    avif: {
        // https://sharp.pixelplumbing.com/api-output#avif
        lossless: true,
    },
    cache: false,
    cacheLocation: undefined,
};

function getEntryPoints(directory) {
    const entryPoints = {};
    const files = fs.readdirSync(directory);

    files.forEach(file => {
        if (file.endsWith('.js')) {
            const name = path.basename(file, '.js');
            entryPoints[name] = path.join(directory, file);
        }
    });

    return entryPoints;
}