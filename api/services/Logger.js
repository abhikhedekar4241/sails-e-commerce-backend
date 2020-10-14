/**
 * Logger.js
 *
 * @description :: This is a native logging service for e-commerce Application
 *
 */
var winston = require("winston");
var assert = require("assert");
var appRoot = require("app-root-path");
var options = {
  file: {
    level: "info",
    name: "file.info",
    filename: `${appRoot}/Logs/app.log`,
    timestamp: true,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 100,
    colorize: true,
  },
  errorFile: {
    level: "error",
    name: "file.error",
    timestamp: true,
    filename: `${appRoot}/Logs/error.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 100,
    colorize: true,
  },
};
var levelColor = {
  verbose: "green",
  debug: "cyan",
  info: "white",
  warn: "yellow",
  error: "red",
};

var logLevels = {
  verbose: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
};

var fileLoggers = {};
var util = require("util");

var channelConfigValidation = {
  // email: function(loggerConfig, channel) {
  //   assert.ok(loggerConfig.channels[channel].toEmail, 'No toEmail specified for Email channel ' + channel);
  //   assert.ok(loggerConfig.channels[channel].subject, 'No subject specified for Email channel ' + channel);
  // },
  file: function (loggerConfig, channel) {
    assert.ok(
      loggerConfig.channels[channel].fileName,
      "No fileName specified for File channel " + channel
    );
  },
};

var channelDefinition = {
  console: function (msg, level) {
    var method = levelColor[level];
    console.log(msg[method]);
  },
  file: function (msg, channel, channelConfig, level) {
    if (fileLoggers[channel]) {
      fileLoggers[channel][level](msg);
    } else {
      var logger = new winston.createLogger({
        transports: [
          new winston.transports.Console(options.console),
          new winston.transports.File(options.errorFile),
          new winston.transports.File(options.file),
        ],
        exitOnError: false, // do not exit on handled exceptions
        datePattern: "-dd-MM-yyyy",
        handleExceptions: true,
      });
      fileLoggers[channel] = logger;
      logger[level](msg);
    }
  },
};

module.exports = {
  log: function (msg) {
    log(msg, "verbose");
  },

  verbose: function (msg) {
    log(msg, "verbose");
  },

  debug: function (msg) {
    log(msg, "debug");
  },

  info: function (msg) {
    log(msg, "info");
  },

  warn: function (msg) {
    log(msg, "warn");
  },

  error: function (err, errMsg) {
    try {
      var msg;
      if (err instanceof Error) {
        msg = errMsg ? errMsg + "\n" + err.stack : err.stack;
      } else {
        if (errMsg) {
          msg = err + " " + errMsg;
        } else {
          msg = err;
        }
      }
      log(msg, "error");
    } catch (err) {
      sails.log.error(err);
    }
  },

  setup: function () {
    var loggerConfig = sails.config.log.logger;

    var levels = sails.config.log.logger.logLevelConfig;
    assert.ok(loggerConfig, "Nearme Services Logger not configured.");

    for (let level in logLevels) {
      assert.ok(
        levels[level] && Array.isArray(levels[level].channels),
        "Log Level " + level + " not configured."
      );

      levels[level].channels.forEach((channel) => {
        for (var level1 in logLevels) {
          if (logLevels[level1] > logLevels[level]) {
            assert.ok(
              levels[level1].channels.indexOf(channel) > -1,
              "Channel " +
                channel +
                " configured for lower log level " +
                level +
                " but not for higher log level " +
                level1
            );
          }
        }

        if (channel === "console") {
          return;
        }

        assert.ok(loggerConfig.channels, "No Log Channels configured.");

        assert.ok(
          loggerConfig.channels[channel],
          "Log Channel " + channel + " not configured."
        );

        assert.ok(
          loggerConfig.channels[channel].type,
          "No channel type specified for " + channel
        );

        assert.ok(
          channelConfigValidation[loggerConfig.channels[channel].type],
          "No validation method specified in channelConfigValidation for " +
            loggerConfig.channels[channel].type +
            " channel."
        );

        channelConfigValidation[loggerConfig.channels[channel].type](
          loggerConfig,
          channel
        );
      });
    }
  },
};

function log(msg, level) {
  try {
    var channels = sails.config.log.logger.logLevelConfig[level].channels;

    if (typeof msg === "string") {
      msg = level + ": " + msg;
    } else {
      msg = level + ": " + util.inspect(msg);
    }

    channels.forEach((channel) => {
      if (channel === "console") {
        return channelDefinition["console"](msg, level);
      }

      var channelConfig = sails.config.log.logger.channels[channel];

      channelDefinition[channelConfig.type](msg, channel, channelConfig, level);
    });
  } catch (err) {
    sails.log.error(err);
  }
}
