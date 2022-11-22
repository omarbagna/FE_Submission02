import { Input, Typography } from '@material-tailwind/react';
import React from 'react';

const InputBox = React.forwardRef((props, ref) => {
	const { onChange, name, type, rules, helpertext, error } = props;

	return (
		<div className="flex flex-col gap-1 w-full justify-start items-start">
			<Input
				{...rules}
				{...props}
				ref={ref}
				name={name}
				type={type}
				color="orange"
				error={error}
				onChange={onChange}
				variant="outlined"
				size="md"
			/>
			{error && (
				<Typography className="text-xs text-red-400">{helpertext}</Typography>
			)}
		</div>
	);
});

export default InputBox;
