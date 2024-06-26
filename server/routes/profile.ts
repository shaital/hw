import express from 'express';
import Profile from '../models/Profile';
import profileSchema from "../validation/profileSchema";
import profileNameSchema from "../validation/profileNameSchema";

const router = express.Router();

router.get('/profiles', async (req, res) => {
  const profiles = await Profile.find();
  res.json(profiles);
});

router.post('/profiles', async (req, res) => {
  try {
    const { error, value } = profileSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const newProfile = new Profile(value);
    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Server error' });
  }
});

router.get('/profiles/:uuid', async (req, res) => {
    try {
      const profile = await Profile.findOne({ 'login.uuid': req.params.uuid });
      if (!profile) {
        return res.status(404).send({ message: 'Profile not found' });
      }
      res.json(profile);
    } catch (error) {
      res.status(500).send({ message: 'Server error' });
    }
  });
  
  // Route to delete a profile by uuid
  router.delete('/profiles/:uuid', async (req, res) => {
    try {
      const profile = await Profile.findOneAndDelete({ 'login.uuid': req.params.uuid });
      if (!profile) {
        return res.status(404).send({ message: 'Profile not found' });
      }
      res.json({ message: 'Profile deleted' });
    } catch (error) {
      res.status(500).send({ message: 'Server error' });
    }
  });

  router.put('/profiles/:uuid', async (req, res) => {
    try {
      const { error, value } = profileNameSchema.validate(req.body, { abortEarly: false });
      if (error) {
        return res.status(400).send({ message: error.details.map(detail => detail.message).join(', ') });
      }
  
      const updatedProfile = await Profile.findOneAndUpdate(
        { 'login.uuid': req.params.uuid },
        value,
        { new: true }
      );
      if (!updatedProfile) {
        return res.status(404).send({ message: 'Profile not found' });
      }
      res.json(updatedProfile);
    } catch (error) {
      res.status(500).send({ message: 'Server error' });
    }
  });

export default router;
