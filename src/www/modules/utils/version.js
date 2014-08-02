/**
 * Created by jvecchioli on 7/31/2014.
 */
var config = require('app-config');

console.log('Version Module loaded...');

var getFormattedVersion = function(){
    var formattedVersion = config.settings.version.major +
        "." + config.settings.version.minor +
        "." + config.settings.version.build;
    return formattedVersion;
};

module.exports.getFormattedVersion = getFormattedVersion;