import React from 'react';
import classNames from 'classnames';
import { modalStyles } from './modal.style';
import { useTranslation, Trans } from 'react-i18next';
import { ModalBlockItem } from './modal-item';
import { Button } from '../common/button';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Typography } from '@material-ui/core';

export const ScreenModal = ({ sectionHead, handleClose, open, ...rest }) => {
  const classes = modalStyles();
  const { t } = useTranslation();
  const subsectionHead = `${sectionHead}.modal`;
  const list = t(`${subsectionHead}.list`, { returnObjects: true}); 

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
			<div className={classes.content}>
				<img src="/static/img/icons/modal-close.svg" className={classes.closeModal} onClick={handleClose}/>
				<div className={classes.stepper}>
					{list.map(({ _id, title, content, isActive}, index) => {
						return (
							<div key={_id}>
								<ModalBlockItem
									key={_id}
									order={content}
									title={title}
									isActive={isActive === "true"}
								/>
							</div>
						);
					})}
				</div>
				<Typography variant='h3' className={classes.modalTitle}>
					{t(`${subsectionHead}.title`)}
				</Typography>
				<Typography variant='body1' className={classes.modalText}>
					{t(`${subsectionHead}.text`)}
				</Typography>
				<Button classes="search-btn" className={classes.button} onClick={handleClose} label={t(`${subsectionHead}.button`)} size="large" />
			  </div>
			</div>
        </Fade>
      </Modal>
    </div>
  );
};
