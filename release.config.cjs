module.exports = {
  repositoryUrl: "https://github.com/Tureckiy-zart/tenerife-ui.git",
  branches: ["main", "develop"],
  plugins: [
    ["@semantic-release/commit-analyzer", { preset: "conventionalcommits" }],
    ["@semantic-release/release-notes-generator", { preset: "conventionalcommits" }],
    ["@semantic-release/changelog", { changelogFile: "CHANGELOG.md" }],
    ["@semantic-release/npm", { npmPublish: true }],
    [
      "@semantic-release/github",
      {
        assets: ["storybook-static/**/*"],
        // Explicitly set repository owner and name to avoid parsing issues
        repositoryUrl: "https://github.com/Tureckiy-zart/tenerife-ui.git",
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md", "package.json"],
        message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
  ],
};
