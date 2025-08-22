const Profile = require("../modal/profileModel");
const User = require("../modal/userModel");

// GET profile
async function getProfileController(req, res) {
	// try {
		// if admin and :id param exists → fetch that user’s profile
		// else → fetch own profile
	
	const userId = req.user.id;
	console.log("user id => ",userId)

		const profile = await Profile.findOne({user : userId});
		if (!profile) {
			return res.status(400).json({ message: "Profile not found" });
		}
		return res.status(200).json(profile);
	// } catch (error) {
	// 	return res.status(500).json({ message: "Server error", error: error.message });
	// }
}

// UPDATE profile
async function updateProfileController(req, res) {
	// try {
		const updates = req.body;
		const userId = req.user.id; // Assuming user ID is stored in req.user after validation middleware

		const profile = await Profile.findOneAndUpdate(
			{ user : userId },
			updates,
			{ new: true, upsert: true } // create if not exists
		);
	
	const newUserData = {
		name: req.body.name,
		
	}
	
	const user = await User.findByIdAndUpdate(userId,
			newUserData,
			{ new: true, upsert: true } // create if not exists
		);
	
	
	
		res.status(200).json(profile);
	// } catch (error) {
	// 	res.status(500).json({ message: error.message });
	// }
}

module.exports = {
	getProfileController,
	updateProfileController,
};
