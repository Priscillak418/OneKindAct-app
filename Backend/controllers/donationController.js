import asyncHandler from 'express-async-handler';


// @desc GET donations
// @route GET /api/donations
// @access private
const getDonations = asyncHandler (async (req, res) => {
    res.status(200).json({ message:'These are the donations that are available!'});
  });

// @desc POST donations
// @route POST /api/donations
// @access private
const setDonations = asyncHandler (async (req, res) => {
    // res.status(200).json({ message:'These are the donations that have been added!'});
    if(!req.body.text){
        res.status(400)
        throw new Error ('Please enter a donation')
    }
    res.status(200).json({ message: 'set donation'});
    
  });

// @desc PUT donations
// @route PUT /api/donations/:id
// @access private
const updateDonations = asyncHandler (async (req, res) => {
    res.status(200).json({ message:`Donation with id ${req.params.id} has been updated!`});
  });

// @desc DELETE donations
// @route DELETE /api/donations/:id
// @access private
const deleteDonations = asyncHandler (async (req, res) => {
    res.status(200).json({ message:`Donation with id ${req.params.id} has been deleted!`});
  });


export { getDonations, setDonations, updateDonations, deleteDonations};