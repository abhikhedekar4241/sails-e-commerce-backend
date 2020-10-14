module.exports = {

  auditLog: function (req, callback) {

    try {

      var url = req.url;

      Logger.info('Request Time : ' + new Date() + ' : ' + url);

      req.connection.setTimeout(3 * 60 * 1000);

      var method = req.method;
      Logger.info('Request Method : ' + method);


      var userAgent = req.headers['user-agent'];
      var contentType = req.headers['content-type'];

      var userId = '';
      var userType = '';
      var fullName = '';
      var mobile = '';
      var userEmail = '';

      if (req.user && req.user !== undefined) {
        userId = req.user.id;
        userEmail = req.user.email;
        fullName = req.user.fullName;
        mobile = req.user.mobile;
        userType = req.user.type;
      } else {
        userId = 'Guest';
        userType = 'Guest';
        fullName = 'Guest';
        mobile = 'Guest';
        userEmail = 'Guest';
      }

      var enterDate = new Date();
      var remoteAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

      var index = url.indexOf('?');

      if (index > -1) {
        url = url.substring(0, index);
      }
      if (url === '') {
        url = '/index';
      }

      var source;


      if (url.indexOf('/app/') === 0) {
        source = 'App';
      } else {
        source = 'Web';
      }

      var queryParams = req.query;
      var auditLog = {
        requestTime: enterDate,
        userId: userId,
        mobile: mobile,
        userType: userType,
        fullName: fullName,
        userEmail: userEmail,
        action: url,
        remoteAddress: remoteAddress,
        method: method,
        source: source,
        userAgent: userAgent,
        queryParams: queryParams,
        contentType: contentType
      };

      if (contentType !== 'multipart/form-data' && method === 'POST' && req.body) {
        var bodyParams = JSON.parse(JSON.stringify(req.body));
        delete bodyParams.password;
        auditLog.bodyParams = bodyParams;
      }
      AuditLog.create(auditLog, (err) => {
        if (err) {
          Logger.error(err, 'AuditLogService.auditLog at AuditLog.create: audit logging failed');
          return callback(err);
        }
        callback(null);
      });

    } catch (e) {
      Logger.error(e, 'AuditLogService.auditLog at catch block: audit logging failed');
      // eslint-disable-next-line callback-return
      callback(e);
    }
  }
};
