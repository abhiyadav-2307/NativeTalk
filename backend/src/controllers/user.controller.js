import FriendsRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user._id;
    const currentUser = req.user;
    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } },
        { _id: { $nin: currentUser.friends } },
        { isOnboarded: true },
      ],
    });

    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.log("Error in getRecommendedUsers controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user._id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage"
      );

    res.status(200).json(user.friends);
  } catch (error) {
    console.log("Error in getMyFriends controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user._id;
    const { id: recipientId } = req.params;

    //don't send req to myself
    if (myId === recipientId) {
      return res
        .status(400)
        .json({ mesage: "You can't send friend request to yourself" });
    }
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(400).json({ message: "Recipient not found" });
    }

    //check if both are already friends
    if (recipient.friends.includes(myId)) {
      return res
        .status(400)
        .json({ message: "Recipient is already your friend" });
    }

    //check if request already sent
    const exixtingRequest = await FriendsRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });

    if (exixtingRequest) {
      return res.status(400).json({ message: "This Request already exixts" });
    }

    const friendRequest = await FriendsRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(201).json(friendRequest);
  } catch (error) {
    console.log("Error in sendFriendRequest controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function acceptFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;

    const friendRequest = await FriendsRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    //check if current user is recipient
    if (friendRequest.recipient.toString() !== req.user._id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to accept this request" });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    //add each user to other's friends list
    //$addToSet: adds elements to array if they do not exist
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });
    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });

    res.status(200).json({ message: "Request accepted" });
  } catch (error) {
    console.log("Error in acceptFrientRequest controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getFriendRequest(req, res) {
  try {
    const incommingReqs = await FriendsRequest.find({
      recipient: req.user._id,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    const acceptedReqs = await FriendsRequest.find({
      sender: req.user._id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");

    res.status(200).json({
      incommingReqs,
      acceptedReqs,
    });
  } catch (error) {
    console.log("Error in getFriendRequest controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getOutgoingFriendReqs(req, res) {
  try {
    const outgoingReqs = await FriendsRequest.find({
      sender: req.user._id,
      status: "pending",
    }).populate(
      "recipient",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    res.status(200).json(outgoingReqs);
  } catch (error) {
    console.log("Error in getOutgoingFriendReqs controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}
