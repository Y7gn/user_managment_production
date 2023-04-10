import express from 'express'
const router = express.Router()
import {
    createCustomer,
    getAllCustomers,
    showStatsCustomer,
    deleteCustomer,
    updateCustomer,
} from '../controllers/CustomersController.js'


router.route('/').post(createCustomer).get(getAllCustomers)
//place before id
router.route('/stats').get(showStatsCustomer)
router.route('/:id').delete(deleteCustomer).patch(updateCustomer)

export default router