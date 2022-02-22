export const getFiltersConfig = () => {
	return {
		'Location Type': {
			value: [],
			tempValue: [],
			getSearchString: locationTypes => {
				if (locationTypes.length > 0) {
					return '&locationType='.concat(locationTypes.join(','));
				}
				return '';
			},
		},
		Date: {
			value: [null, null],
			tempValue: [null, null],
			getSearchString: dates => {
				if (dates.length > 0) {
					return '&date='.concat(dates.join(','));
				}
				return '';
			},
		},
	};
};
