module.exports = {
    apps: [
        {
            name: "server",
            script: "./server.js",
            watch: true,
            ignore_watch: ["node_modules"],
            watch: true,
        },
        {
            name: "vision",
            script: "./visionServer.js",
            watch: true,
            ignore_watch: ["node_modules"],
            watch: true,
        },
        {
            name: "costco",
            script: "./costcoServer.js",
            watch: true,
            ignore_watch: ["node_modules"],
            watch: true,
        },
        {
            name: "processImage",
            script: "./imageServer.js",
            watch: true,
            ignore_watch: ["node_modules"],
            watch: true,
        },
        {
            name: "gateway",
            script: "./gateway.js",
            watch: true,
            ignore_watch: ["node_modules"],
            watch: true,
        },
    ]
}