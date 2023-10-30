const events = {
  LOGIN: "User Login",
  REGISTER: "Created a user",
  CREATE_TRANSACTION: "Created a transaction",
  DELETE_TRANSACTION: "Deleted a transaction",
  UPDATE_TRANSACTION: "Updated a transaction",
  VALIDATE_TRANSACTION: "Validate a transaction",
  UPDATE_USER: "Updated User information",
  DELETE_USER: "Deleted User",
};

const GetEventType = async (request, method) => {
  let event = "";

  if (request.path.includes("transaction")) {
    switch (method) {
      case "POST":
        event = events.CREATE_TRANSACTION;
        break;
      case "DELETE":
        event = events.DELETE_TRANSACTION;
        break;
      case "PUT":
        if (request.path.includes("validate")) {
          event = events.VALIDATE_TRANSACTION;
        } else {
          event = events.UPDATE_TRANSACTION;
        }
        break;
    }
  } else if (request.path.includes("register")) {
    event = events.REGISTER;
  } else if (request.path.includes("login")) {
    event = events.LOGIN;
  } else if (request.path.includes("users")) {
    switch (method) {
      case "PUT":
        event = events.UPDATE_USER;
        break;
      case "DELETE":
        event = events.DELETE_USER;
        break;
    }
  }

  return event;
};

module.exports = GetEventType;
