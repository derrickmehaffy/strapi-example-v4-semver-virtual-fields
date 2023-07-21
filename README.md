# Virtual Fields (for example with Semver)

In this example we will use several virtual fields to deconstruct a semver string (for example 1.0.1 or 1.0.2-beta.0) and save each part into separate fields to be able to complex filtering on each part of the semver string.

## Concept

There is a content-type called "Feature Flags" that stores the following:

- featureName: string
- minVersion: string (uses regex to match semver requirements)
- osVersions: manyWay relationship (only added as an example)
- versionMajor: integer
- versionMinor: integer
- versionPatch: integer
- isPrerelease: boolean
- prereleaseData: JSON

Generally only featureName, minVersion, and osVersions should be visible within the Admin Panel but for this example I have left them visible to show how the virtual fields are being populated.

The way this work is by using [model lifecycles](https://docs.strapi.io/dev-docs/backend-customization/models#lifecycle-hooks) to parse the minVersion string and use the [semver package](https://www.npmjs.com/package/semver) to parse the string into the different parts.

In this example we use the beforeCreate and beforeUpdate lifecycles to set the virtual field values.

For example in [this file](src/api/feature-flag/content-types/feature-flag/lifecycles.js) we do this by parsing the data passed in and setting the virtual fields:

```js
const semver = require("semver");

module.exports = {
  beforeCreate(event) {
    // Parse the minVersion which should always exist since it's a required field
    const versionData = semver.parse(event.params.data.minVersion);

    // Set the virtual fields
    event.params.data.versionMajor = versionData.major;
    event.params.data.versionMinor = versionData.minor;
    event.params.data.versionPatch = versionData.patch;

    // If the semver parse has prerelease data then set the boolean to true and drop the pre-release data into the json field for easy access
    if (versionData.prerelease.length > 0) {
      event.params.data.isPrerelease = true;
      event.params.data.prereleaseData = versionData.prerelease;
    } else {
      // If there is no data we just set the json to an empty array
      event.params.data.prereleaseData = [];
    }
  },
};
```

Note: The pre-release json data can't be normally filtered on but you can use the `$contains` operator if needed.

## Example information

Included in this example is the SQLite database which already has some data in it, including an admin user.

Here are the example user's login information:

```
email: test@test.com
password: Test1234!
```

## Setting the virtual fields as hidden

To remove the virtual fields from the edit view, you should use the [configure the view](https://docs.strapi.io/user-docs/content-manager/configuring-view-of-content-type) to remove these from the view.

## Demo Video

Below is a small loom video showing some of the functionality mentioned in this read-me.

https://www.loom.com/share/153f351c937a49a6a918fc54b3ab8895?sid=6e4c65ec-5786-4650-b529-3dc27af54104
