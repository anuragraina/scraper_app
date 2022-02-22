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
	};
};
