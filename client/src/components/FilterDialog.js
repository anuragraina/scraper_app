import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';

export default function FilterDialog({ open, setOpen }) {
	const handleClose = () => {
		setOpen(false);
	};

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
					<Grid container spacing={2}>
						<Grid item xs={8}>
							xs=8
						</Grid>
						<Grid item xs={4}>
							xs=4
						</Grid>
					</Grid>
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
