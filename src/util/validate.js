export const isNotEmpty = (val) => {
	return String(val).length > 0;
};

export const isNumber = (val) => {
    return !isNaN(val);
};
