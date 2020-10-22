import styled from 'styled-components';

export const CalendarFormWrapper = styled.div`
  border-radius: 6px;
  background-color: #ffffff;
	box-shadow: 0 15px 40px 0 rgba(51, 60, 77, 0.2);
  overflow: hidden;

  .calendar-form__close-btn {
    position: fixed;
    top: 46px;
    right: 40px;

    @media(max-width: 480px) {
      top: 12px;
      right: 12px;
    }
  }

  .calendar-form__input {
    flex-shrink: 0;
    margin-bottom: 25px;
    border: 1px solid rgba(125, 148, 227, 0.6);
    border-radius: 4px;
    box-shadow: 0 20px 60px 0 rgba(51, 60, 77, 0.1), inset 0 1px 3px 1px rgba(51, 60, 77, 0.06);
  }

  .calendar-form__calendar {
    max-width: 100%;
    
    @media(max-width: 840px) {
      height: 100%;
      overflow: auto;
    }
  }

  .calendar-form__controls {
    display: flex;
    justify-content: space-between;
    padding: 15px 30px;
    border-top: 1px solid #e3e5e8;

    @media(max-width: 840px) {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 12px 25px;
      border-top: none;
      box-shadow: 0 5px 40px 0 rgba(51, 60, 77, 0.2);
      background-color: #ffffff;
    }
  }

  .calendar-form__controls-clear-btn {
    color: #828898;
  }

  .calendar-form__controls-save-btn {
    &.MuiButton-root {
      min-width: 120px;

      @media(max-width: 840px) {
        min-width: 106px;
        font-size: 1.0625rem;
        padding: 0.8125rem 1.375rem 0.625rem;
      }
    }
  }
`;
