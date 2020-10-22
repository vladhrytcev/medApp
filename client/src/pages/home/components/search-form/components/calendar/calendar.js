import React from 'react';
import PropTypes from 'prop-types';
import { DateRange } from 'react-date-range';

import { CalendarWrapper } from './calendar.style';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export const Calendar = ({ className, ranges, months, onChange }) => {
	const options = {
		monthDisplayFormat: "MMMM yyyy",
		direction: "horizontal",
		showDateDisplay: false,
		showMonthAndYearPickers: false,
		rangeColors: ['#7d94e3'],
		weekdayDisplayFormat: "EEEEEE"
	}

	return (
		<CalendarWrapper className={className}>
			<DateRange
				ranges={ranges}
				months={months}
				onChange={item => onChange(item)}
				{...options}
			/>
		</CalendarWrapper>
	);
}

Calendar.propTypes = {
	className: PropTypes.string,
	ranges: PropTypes.arrayOf(
		PropTypes.shape({
			startDate: PropTypes.instanceOf(Date),
			endDate: PropTypes.instanceOf(Date),
			key: PropTypes.string
		})
	).isRequired,
	months: PropTypes.number,
	onChange: PropTypes.func.isRequired
};

Calendar.defaultProps = {
	months: 1
}
