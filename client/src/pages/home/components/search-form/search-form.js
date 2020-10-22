import React, { useState } from 'react';
import ReactGA from 'react-ga';
import classNames from 'classnames';
import moment from 'moment';
import { Link, useLocation } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { addDays } from 'date-fns';
import { useMediaQuery } from 'react-responsive';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { Button } from '../common';
import { SearchFieldInput, CalendarForm, Checkbox, CloseButton, Input } from './components';
import { ScreenModal } from '../modal';
import { NotDesktopContactForm } from '../../service/mediaQuery';

import { FormWrapper, StyledForm } from './search-form.style';

const getDateString = (startDate, endDate, todayText) => {
  const today = moment().format("YYYY MM DD");
  const startDay = moment(startDate).format("YYYY MM DD");
  const endDay = moment(endDate).format("YYYY MM DD");
  const startMonth = moment(startDate).format("YYYY MM");
  const endMonth = moment(endDate).format("YYYY MM");
  const isSameDay = startDay === endDay;
  const isSameMonth = startMonth === endMonth;
  const isToday = isSameDay && today === startDay;

  if (isToday) {
    return todayText;
  }

  if (isSameDay) {
    return `${moment(startDate).format("MMMM D")}`;
  }

  if (isSameMonth) {
    return `${moment(startDate).format("MMMM D")}-${moment(endDate).format("D")}`;
  }

  return `${moment(startDate).format("MMMM D")}-${moment(endDate).format("MMMM D")}`;
}

let validationSchema = yup.object().shape({
  date: yup.object().shape({
    endDate: yup.date(),
    key: yup.string(),
    startDate: yup.date()
  }).required(),
  email: yup.string().email().required(),
  hospitalName: yup.string().required(),
  name: yup.string().required(),
  phone: yup.string().required(),
  isAgreed: yup.boolean().required()
})

export const SearchForm = ({ classes, specialitiesList, searchHead, sendForm }) => {
  const TRANSLATION_PATH = `${searchHead}.search-form`;
  const { t } = useTranslation();
  let location = useLocation();
  const chkbox_label = t(`${TRANSLATION_PATH}.checkbox-link-name`);
  const joblist = Object.keys(specialitiesList);
  const quals = joblist.map((index) => specialitiesList[index].qual);
  const isDesktop = useMediaQuery({ minDeviceWidth: 841 });

  const initialDateRange = [
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: 'selection'
    }
  ];

  const [specialists, setValue] = useState({});
  const [dateRange, setDateRange] = useState(initialDateRange);
  const [isDateRangeOpen, setDateRangeOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [shouldShowContactFieldSet, setShowContactFieldSet] = useState(false);

  const formik = useFormik({
    initialValues: {
      specialistValue: '',
      fieldValue: '',
      dateString: 'From now',
      hospitalName: '',
      name: '',
      email: '',
      phone: '',
      isAgreed: false
    },
    validationSchema,
    onSubmit: values => {
      sendForm(values);
      setModalOpen(true);
    }
  })

  const valueOnChange = (value) => {
    if (specialitiesList.hasOwnProperty(value)) {
      setValue({
        specialist: value,
        fields: specialitiesList[value].fields
      });
      if (specialitiesList[value].fields.length == 1) {
        formik.setFieldValue('fieldValue', specialitiesList[value].fields[0]);;
      }
    } else {
      setValue({
        specialist: value,
        fields: []
      });
    }
    formik.setFieldValue('specialistValue', value)
  }

  const trackSpecialist = (value) => {
    valueOnChange(value);
    ReactGA.event({
      category: 'Search',
      action: 'Select Specialist',
      label: value
    });
  };

  const trackField = (value) => {
    formik.setFieldValue('fieldValue', value);
    ReactGA.event({
      category: 'Search',
      action: 'Select Field',
      label: value
    });
  };

  const handleOnCloseButton = () => {
    setShowContactFieldSet(!shouldShowContactFieldSet);
  };

  const handleOnSearchButton = (event) => {
    ReactGA.event({
      category: 'Search',
      action: 'Click Search Button'
    })
    setShowContactFieldSet(!shouldShowContactFieldSet);
  };

  const handleClose = () => {
    setModalOpen(false);
    setShowContactFieldSet(!shouldShowContactFieldSet);
    ReactGA.event({
      category: 'Submit',
      action: 'Submit Contact Form'
    });
  };

  const handleDateRangeOnChange = (item) => {
    setDateRange([item.selection]);
  }

  const handleCalendarOnSave = () => {
    const { startDate, endDate } = dateRange[0];
    const newDateString = getDateString(startDate, endDate, t(`${TRANSLATION_PATH}.date-placeholder`));

    formik.setFieldValue('dateString', newDateString);
    closeDateSelector();
  }

  const handleCalendarOnClear = () => {
    setDateRange(initialDateRange);
  }

  const openDateSelector = () => {
    setDateRangeOpen(true);
  }

  const closeDateSelector = () => {
    setDateRangeOpen(false);
  }

  return (
    <FormWrapper className={classNames(classes, { 'opened': shouldShowContactFieldSet })}>
      <NotDesktopContactForm>
        <CloseButton className="form__close-btn" onClick={handleOnCloseButton} />
      </NotDesktopContactForm>
      <StyledForm onSubmit={formik.handleSubmit}>
        <ScreenModal sectionHead='global.contact' handleClose={handleClose} open={isModalOpen} />
        <div className="search-field-set">
          <SearchFieldInput
            name='specialist'
            label={t(`${TRANSLATION_PATH}.specialist`)}
            placeholder={t(`${TRANSLATION_PATH}.specialist_placeholder`)}
            value={formik.values.specialistValue}
            autocompleteList={joblist}
            onChange={trackSpecialist}
          />
          <SearchFieldInput
            name='fields'
            label={t(`${TRANSLATION_PATH}.organisation`)}
            placeholder={t(`${TRANSLATION_PATH}.organisation_placeholder`)}
            value={formik.values.fieldValue}
            autocompleteList={specialists.fields}
            onChange={trackField}
          />
          <Button classes="search-btn" type="button" label={t(`${TRANSLATION_PATH}.search-button`)} size="large" onClick={handleOnSearchButton} />
        </div>
        <div className={classNames("contact-field-set", { "opened": shouldShowContactFieldSet })}>
          <div className="contact-field-set__wrapper">
            <div className="form__intro">
              <div className="form__item">
                <h3 className="form__title">{t(`${TRANSLATION_PATH}.title`)}</h3>
                <p className="form__sub-title">{t(`${TRANSLATION_PATH}.subtitle`)}</p>
              </div>
              <Input
                className="form__item"
                id="date"
                name="date"
                type="text"
                value={formik.values.dateString}
                placeholder={t(`${TRANSLATION_PATH}.date-placeholder`)}
                isReadOnly={true}
                onClick={openDateSelector}
                isInvalid={false}
                error={t('')}
              />
              <CalendarForm
                className={classNames("form__date-selector", { "opened": isDateRangeOpen })}
                months={isDesktop ? 2 : 4}
                ranges={dateRange}
                inputValue={formik.values.dateString}
                onChange={handleDateRangeOnChange}
                onSave={handleCalendarOnSave}
                onClear={handleCalendarOnClear}
                onClose={closeDateSelector}
                onBlur={formik.handleBlur}
                error={t('')}
              />
            </div>
            <div className="form__contact">
              <Input
                className="form__item form__contact-item"
                id="hospitalName"
                name="hospitalName"
                type="text"
                value={formik.values.hospitalName}
                placeholder={t(`${TRANSLATION_PATH}.hospital-name-placeholder`)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.errors.hospitalName ? true : false}
                error={t('')}
              />
              <Input
                className="form__item form__contact-item"
                id="name"
                name="name"
                type="text"
                value={formik.values.name}
                placeholder={t(`${TRANSLATION_PATH}.name-placeholder`)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.errors.name ? true : false}
                error={t('')}
              />
              <Input
                className="form__item form__contact-item"
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                placeholder={t(`${TRANSLATION_PATH}.email-placeholder`)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.errors.email ? true : false}
                error={t('')}
              />
              <Input
                className="form__item form__contact-item"
                id="phone"
                name="phone"
                type="tel"
                value={formik.values.phone}
                placeholder={t(`${TRANSLATION_PATH}.phone-placeholder`)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.errors.phone ? true : false}
                error={t('')}
              />
              <div className="form__contact-submit">
                <Checkbox className="form__agreement form__item" name="isAgreed" isChecked={formik.values.isAgreed} onChange={formik.handleChange}>
                  <Trans t={t} i18nKey={`${TRANSLATION_PATH}.checkbox`} values={{ dlink: chkbox_label }}>
                    <Link to={`${location.pathname}/privacy`}>{{ chkbox_label }}</Link>
                  </Trans>
                </Checkbox>
                <Button
                  classes="form__item"
                  type="submit"
                  label={t(`${TRANSLATION_PATH}.submit-button`)}
                  size="large"
                />
              </div>
            </div>
            <h4 className="form__callback form__item">
              {t(`${TRANSLATION_PATH}.call`)}
              <a href={t('global.phone.ref')}>{t('global.phone.number')}</a>
            </h4>
          </div>
        </div>
      </StyledForm>
    </FormWrapper>
  )
}
