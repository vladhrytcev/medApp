import { useState, useEffect } from 'react';
import api from '../services/api';
import {
  isPushNotificationSupported,
  askUserPermission,
  registerServiceWorker,
  createNotificationSubscription,
  getUserSubscription
} from '../push-notifications';
import * as ENDPOINTS from '../constants/endpoints';

const pushNotificationSupported = isPushNotificationSupported();

export default function usePushNotifications() {
  const [userConsent, setUserConsent] = useState(Notification.permission);
  const [userSubscription, setUserSubscription] = useState(null);
  const [pushServerSubscriptionId, setPushServerSubscriptionId] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pushNotificationSupported) {
      setLoading(true);
      setError(false);
      registerServiceWorker().then(() => {
        setLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(false);
    const getExistingSubscription = async () => {
      const existingSubscription = await getUserSubscription();
      setUserSubscription(existingSubscription);
      setLoading(false)
    };
    getExistingSubscription();
  }, []);

  const onClickAskUserPermission = () => {
    setLoading(true);
    setError(false);
    askUserPermission().then(consent => {
      setUserConsent(consent);
      if (consent !== 'granted') {
        setError({
          name: 'Consent denied',
          message: 'You denied the consent to receive notifications',
          code: 0
        });
      }
      setLoading(false);
    })
  };

  const onClickSubscribeToPushNotification = () => {
    setLoading(true);
    setError(false);
    createNotificationSubscription()
      .then(subscription => {
        setUserSubscription(subscription);
        setLoading(false);
      })
      .catch(err => {
        console.error(`Could not create the notification subscription ${err} name: ${err.name} message: ${err.message} code: ${err.code}`);
        setError(err);
        setLoading(false);
      })
  };

  const onClickSendSubscriptionToPushServer = () => {
    setLoading(true);
    setError(false);
    api
      .post(ENDPOINTS.SUBSCRIPTION, userSubscription)
      .then(response => {
        setPushServerSubscriptionId(response.id);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError(err);
      })
  };

  const onClickSendNotification = async () => {
    setLoading(true);
    setError(false);
    await api.get(`${ENDPOINTS.SUBSCRIPTION}${pushServerSubscriptionId}`).catch(err => {
      setLoading(false);
      setError(err);
    });
    setLoading(false);
  }

  return {
    onClickAskUserPermission,
    onClickSubscribeToPushNotification,
    onClickSendSubscriptionToPushServer,
    pushServerSubscriptionId,
    onClickSendNotification,
    userConsent,
    pushNotificationSupported,
    userSubscription,
    error,
    loading,
  };
}
