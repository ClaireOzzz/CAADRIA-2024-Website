module.exports = function override(config, env) {
    console.log("React app rewired works!")
    config.resolve.fallback = {
        "fs": false,
        "tls": false,
        "net": false,
        "path": false,
        "zlib": false,
        "http": false,
        "https": false,
        "stream": false,
        "crypto": false,
        "crypto-browserify": require.resolve('crypto-browserify'),
    };
    return config;
  };


//   module.exports = function override (config, env) {
//     console.log('override')
//     let loaders = config.resolve
//     loaders.fallback = {
//         "fs": false,
//         "path": require.resolve("path-browserify")
//     }
    
//     return config
// }