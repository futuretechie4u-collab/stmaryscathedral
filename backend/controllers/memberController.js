const Member = require('../models/Member');

exports.getAllMembers = async (req, res) => {
  const members = await Member.find();
  res.json(members);
};

exports.createMember = async (req, res) => {
  const newMember = new Member(req.body);
  const saved = await newMember.save();
  res.status(201).json(saved);
};
