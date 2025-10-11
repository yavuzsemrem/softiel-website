const config = {
  plugins: [
    "@tailwindcss/postcss",
    // CSS minification için production'da cssnano kullan
    process.env.NODE_ENV === 'production' ? [
      'cssnano',
      {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          normalizeWhitespace: true,
          colormin: true,
          minifyFontValues: true,
          minifyGradients: true,
          minifySelectors: true,
          reduceTransforms: true,
          svgo: true,
          calc: true,
        }],
      }
    ] : null,
  ].filter(Boolean),
};

export default config;
