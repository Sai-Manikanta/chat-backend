const Status = require('../models/Status');

// @desc get statuses by name
// @route GET /api/v1/statuses
// @access public
const getStatuses = async (req, res, next) => {
    try {
        const statuses = await Status.find();
        return res.status(200).json({
            success: true,
            data: statuses
        })
    } catch(err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })
    }
}

// @desc create status
// @route Post /api/v1/statuses
// @access public
const createStatus = async (req, res, next) => {
    try {
        const status = await Status.create(req.body);
        return res.status(201).json({
            success: true,
            data: status
        })
    } catch(err) {
        if(err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
      
            return res.status(400).json({
              success: false,
              error: messages
            });
        } else {
            return res.status(500).json({
              success: false,
              error: 'Server Error'
            });
        }
    }
}

// @desc delete status
// @route delete /api/v1/statuses/:id
// @access public
const deleteStatus = async (req, res, next) => {
    try {
        await Status.findByIdAndRemove(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'deleted'
        })
    } catch (err) {
        return res.status(417).json({
            success: false,
            error: err.message
        });
    }
}

const updateStatus = async (req, res, next) => {
    const { seenByPartner, seenByPartnerTime } = req.body;
    try {
        const updatedStatus = await Status.updateOne({ _id: req.params.id }, {
            seenByPartner,
            seenByPartnerTime
        });
        return res.status(200).json({
            success: true,
            status: updatedStatus
        })
    } catch (err) {
        return res.status(417).json({
            success: false,
            error: err.message
        });
    }
}

module.exports = { getStatuses, createStatus, deleteStatus, updateStatus }