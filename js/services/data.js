angular.module('dataServiceModule', [])
    .service("dataService", function(){

		var dataServiceScope = this;

		// local storage data
		dataServiceScope.storage = JSON.parse(localStorage.getItem('discBeatsLocalStorage'));
		if (dataServiceScope.storage != null) {
			if ('active' in dataServiceScope.storage) {
				if (!dataServiceScope.storage.active){ dataServiceScope.storage = false}
			}
			else {
				dataServiceScope.storage = false;
			}
		}
		else {
			dataServiceScope.storage = false;
		}

	});
