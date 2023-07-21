const semver = require("semver");

module.exports = {
  beforeCreate(event) {
    const versionData = semver.parse(event.params.data.minVersion);
    event.params.data.versionMajor = versionData.major;
    event.params.data.versionMinor = versionData.minor;
    event.params.data.versionPatch = versionData.patch;

    if (versionData.prerelease.length > 0) {
      event.params.data.isPrerelease = true;
      event.params.data.prereleaseData = versionData.prerelease;
    } else {
      event.params.data.prereleaseData = [];
    }
  },

  beforeUpdate(event) {
    console.log(event.params.data);
    if (event.params.data.minVersion) {
      const versionData = semver.parse(event.params.data.minVersion);
      console.log(versionData);
      event.params.data.versionMajor = versionData.major;
      event.params.data.versionMinor = versionData.minor;
      event.params.data.versionPatch = versionData.patch;

      if (versionData.prerelease.length > 0) {
        event.params.data.isPrerelease = true;
        event.params.data.prereleaseData = versionData.prerelease;
      } else {
        event.params.data.isPrerelease = false;
        event.params.data.prereleaseData = [];
      }
    }
  },
};
