import express from 'express';

const router = express.Router();

router.get ("/donation", (req, res) => {
    res.send("Donation submitted");
    
})

export default router;