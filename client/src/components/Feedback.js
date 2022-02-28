import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Feedback({ loading, error, eventsLength }) {
	if (loading) {
		return (
			<Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', padding: 5 }}>
				<CircularProgress />;
			</Box>
		);
	}

	if (error) {
		return (
			<Typography align='center' padding={5}>
				Some error occurred! Please try again later.
			</Typography>
		);
	}

	if (eventsLength === 0) {
		return (
			<Typography align='center' padding={5}>
				No events found! Please adjust the filters or try again later.
			</Typography>
		);
	}

	return null;
}

export default Feedback;
