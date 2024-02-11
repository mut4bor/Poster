export const isDataNotEmpty = (
	data: unknown[] | undefined
): data is Array<unknown> => {
	if (!data) return false;
	return !!data.length;
};
