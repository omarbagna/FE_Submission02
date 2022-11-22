import React, { useState } from 'react';
import { Input } from '@material-tailwind/react';

import { useAsyncDebounce } from 'react-table';

export const GlobalFilter = ({ columns, setFilter }) => {
	const [value, setValue] = useState('');

	const columnToSearch = columns[0]?.accessor;

	const onChange = useAsyncDebounce((value) => {
		setFilter(columnToSearch, value);
	}, 500);

	return (
		<div className="flex flex-col md:flex-row justify-center items-center w-fit gap-2">
			<div className="w-52">
				<Input
					label="Search Table"
					variant="outlined"
					type="text"
					size="md"
					color="orange"
					value={value}
					onChange={(e) => {
						setValue(e.target.value);
						onChange(e.target.value);
					}}
				/>
			</div>
		</div>
	);
};
