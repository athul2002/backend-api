const express=require('express')
const {registerUser, availableSessions, bookSession, createSession,mySessions}=require('../controller/userController');
const { isAuthenticatedUser, authorizeRoles, isAuthenticatedDean } = require('../middleware/auth');

const router=express.Router();

router.route('/register').post(registerUser);
router.route('/available-sessions').get(isAuthenticatedUser,availableSessions);
router.route('/sessions').get(isAuthenticatedUser,mySessions);
router.route('/pending-sessions-dean').get(isAuthenticatedDean,mySessions);
router.route('/book').post(isAuthenticatedUser,bookSession);
router.route('/create').post(isAuthenticatedUser,authorizeRoles("admin"),createSession);

module.exports=router