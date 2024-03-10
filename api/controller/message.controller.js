import Message from "../model/messages.model.js";

// add new message

export const message1 = async (req, res, next) => {
  const message = new Message(req.body);
  try {
    const newMessages = await message.save();
    res.status(201).json(newMessages);
  } catch (error) {
    res.status(404).send("some things went wrong");
  }
};

// get messages

export const getmessage = async (req, res, next) => {
  try {
    const message = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).send("somethings went wrong");
  }
};
