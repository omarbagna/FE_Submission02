import React, { createContext, useContext, useState } from 'react';

const Context = createContext();

export const StateContext = ({ children }) => {
	const [expanded, setExpanded] = useState(false);

	const handleExpansion = () => {
		setExpanded(!expanded);
	};

	return (
		<Context.Provider
			value={{
				expanded,
				handleExpansion,
			}}>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
