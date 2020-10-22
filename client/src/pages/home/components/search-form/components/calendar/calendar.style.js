import styled from 'styled-components';

export const CalendarWrapper = styled.div`
	.rdrCalendarWrapper {
		position: relative;
		font-family: inherit;

		@media(max-width: 840px) {
			height: auto;
			background-color: transparent;
		}
	}

	.rdrMonthAndYearWrapper {
		position: absolute;
		width: 100%;
		height: 72px;
		padding-top: 0; 
	}
			
	.rdrMonthAndYearPickers {
		display: none;
	}

	.rdrNextPrevButton {
		margin: 0 30px;
	}

	.rdrMonths {
		flex-wrap: wrap;

		@media(max-width: 840px) {
			justify-content: center;
		}
	}

	.rdrMonth {
		width: 320px;
		padding: 0 30px 20px;
		box-sizing: border-box;

		:nth-child(2n) {
			border-left: 1px dashed #e3e5e8;
		}

		@media(max-width: 840px) {
			border-bottom: 1px dashed #e3e5e8;
		}

		@media(max-width: 719px) {

			:nth-child(2n) {
				border-left: none;
			}
		}

		@media(max-width: 480px) {
			width: 260px;
			padding: 0 0 20px;
		}
	}

	.rdrMonthName {
		padding: 29px 25px 26px;
		font-size: 1.0625rem;
		line-height: 1em;
		letter-spacing: -0.27px;
		text-align: center;
		text-transform: uppercase;
		color: inherit;
	}

	.rdrWeekDay {
		font-size: 0.75rem;
		line-height: 2em;
		color: #828898;
	}

	.rdrDays {
		font-family: "OpenSans", sans-serif;
		font-weight: 400;
		font-size: 0.9375rem;
	}

	.rdrDay {
		height: 2.5em;
		line-height: 2.5em;

		:not(.rdrDayPassive) {
			.rdrInRange ~ .rdrDayNumber span {
				color: #000000;
			}
			
			.rdrStartEdge ~ .rdrDayNumber {
				left: 2px;
				background-color: #eceffb;
				border-top-left-radius: 50%;
				border-bottom-left-radius: 50%;

				> span {
					z-index: 2;
					display: inline-block;
					margin-left: -2px;
				}
			}

			.rdrEndEdge ~ .rdrDayNumber {
				right: 2px;
				background-color: #eceffb;
				border-top-right-radius: 50%;
				border-bottom-right-radius: 50%;

				& span {
					z-index: 2;
					display: inline-block;
					margin-right: -2px;
				}
			}
		}

		.rdrDayStartPreview,
		.rdrDayInPreview,
		.rdrDayEndPreview {
			background-color: #eceffb;
			border: none;

			~ .rdrDayNumber span{
				z-index: 2;
			}
		}


		&.rdrDayHovered .rdrDayEndPreview {
			background-color: #7d94e3;
			border-radius: 50%;

			~ .rdrDayNumber {
				right: 2px;
				border-top-right-radius: 50%;
				border-bottom-right-radius: 50%;
				background-color: #eceffb;

				span {
					color: #ffffff;
				}
			}
		}

		&.rdrDayHovered .rdrDayStartPreview.rdrDayEndPreview{
			background-color: #7d94e3;

			~ .rdrDayNumber {
				background-color: transparent;

				span {
					color: #ffffff;
				}
			}
		}

		&.rdrDayStartOfMonth {
			.rdrEndEdge ~ .rdrDayNumber,
			.rdrDayEndPreview ~ .rdrDayNumber {
				background-color: transparent;
			}
		}


		&.rdrDayEndOfMonth {
			.rdrStartEdge ~ .rdrDayNumber {
				background-color: transparent;
			}
		}

		&.rdrDayStartOfWeek {
			.rdrDayEndPreview ~ .rdrDayNumber {
				background-color: transparent;
			}
		}

		&.rdrDayPassive > .rdrDayNumber span {
			visibility: hidden;
		}
	}

	.rdrDayToday .rdrDayNumber span:after {
		background-color: #7d94e3;
	}

	.rdrSelected, .rdrInRange,
	.rdrStartEdge, .rdrEndEdge,
	.rdrDayStartPreview, .rdrDayEndPreview,
	.rdrDayInPreview, .rdrDayNumber {
		top: 3px;
		bottom: 3px;
	}

	.rdrDayStartPreview, .rdrDayEndPreview {
		z-index: 1;
	}

	.rdrDayStartPreview {
		left: 2px;
	}

	.rdrDayEndPreview {
		right: 2px;
	}

	.rdrStartEdge, .rdrEndEdge {
		z-index: 2;
		border-radius: 50%;
	}

	.rdrStartEdge {
		right: 2px;
	}

	.rdrEndEdge {
		left: 2px;
	}

	.rdrInRange {
		background-color: #eceffb;
	}

`;
