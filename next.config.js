module.exports =
{
    webpack(config) {
        config.module.rules.push(
            {
                test: /\.svg$/,
                use: ['svgr/webpack'],
            },
            {
                test: /\.(jpg|JGP|jpeg|png|gif|mp3|svg|ttf|woff2|woff|eot)$/gi,
                use: ['file-loader'],
            }
        )
        return config;
    },
}