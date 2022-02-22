import { useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import FilterTabs from './FilterTabs';
import { FilterContext } from '../EventsTable';

export default function FilterDialog({ open, setOpen }) {
	const { filters } = useContext(FilterContext);

	console.log(filters);

	const handleClose = () => {
		setOpen(false);
	};

	const onApply = () => {};

	return (
		<div>
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
					<Button onClick={handleClose} autoFocus>
						Apply
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
