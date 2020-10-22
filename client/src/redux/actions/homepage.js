import * as c from '../constants/homepage';

export const specialistSearchRequest = () => ({
  type: c.SPECIALIST_SEARCH_REQUEST,
});

export const organisationSearchRequest = () => ({
  type: c.ORGANISATION_SEARCH_REQUEST,
});

export const sendForm = ({ date, hospitalName, name, email, phone }) => ({
  type: c.SEND_EMAIL_REQUEST,
  date,
  hospitalName,
  name,
  email,
  phone
})