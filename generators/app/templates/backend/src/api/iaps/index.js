import express from 'express';
import AuthService from '../../middlewares/auth';
import IAPCtrl from './iap.controller';
import * as iapValidation from './iap.validation'
import { celebrate } from 'celebrate';

const router = express.Router();

router.post('/', AuthService.required, AuthService.isAdmin(), IAPCtrl.create)
router.post(
  '/verify-receipt',
  celebrate({
    body: iapValidation.createValidationSchema
  }),
  AuthService.required,
  IAPCtrl.verifyReceipt
)
router.post(
  '/subscription',
  celebrate({
    body: iapValidation.createValidationSchema
  }),
  AuthService.required,
  IAPCtrl.subscription
)

router.get('/', IAPCtrl.findAll)
router.get('/:id', IAPCtrl.findOne)

router.put('/:id', AuthService.required, AuthService.isAdmin(), IAPCtrl.update)

router.delete('/:id', AuthService.required, AuthService.isAdmin(), IAPCtrl.remove)

export default router
