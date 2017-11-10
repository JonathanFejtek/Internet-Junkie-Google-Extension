module.exports = function($q) {
  var getData = function () {
    var deferred = $q.defer();
    chrome.storage.local.get(function( data ) {
			if (!data) {
				deferred.reject();
			} else {
				deferred.resolve(data);
			}
		});
		return deferred.promise;
  };
  return {
    getData : getData
  };
};
