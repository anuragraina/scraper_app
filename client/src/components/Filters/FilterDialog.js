import { useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import FilterTabs from './FilterTabs';
import { FilterContext } from '../EventsTable';

export default function FilterDialog({ open, setOpen }) {
	const { filters, setFilters, setFilterString } = useContext(FilterContext);

	const handleClose = () => {
		setFilters(prevFilters => {
			const newFilters = {};

			for (let filter in prevFilters) {
				newFilters[filter] = {
					...prevFilters[filter],
					tempValue: prevFilters[filter].value,
				};
			}

			return newFilters;
		});
		setOpen(false);
	};

	const onApply = () => {
		setFilters(prevFilters => {
			const newFilters = {};

			for (let filter in prevFilters) {
				newFilters[filter] = {
					...prevFilters[filter],
					value: prevFilters[filter].tempValue,
				};
			}

			return newFilters;
		});

		let newFilterString = '';

		for (let filter in filters) {
			newFilterString = newFilterString.concat(
				filters[filter].getSearchString(filters[filter].tempValue)
			);
		}

		setFilterString(newFilterString);

		setOpen(false);
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby='filter-dialog-title'
			aria-describedby='filter-dialog-description'
		>
			<DialogTitle id='filter-dialog-title'>Filter List</DialogTitle>
			<DialogContent>
				<FilterTabs />
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={onApply}>Apply</Button>
			</DialogActions>
		</Dialog>
	);
}
