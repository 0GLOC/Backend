const registerSession = async (req, res) => {
    const {name, password} = req.body;

    req.session.user = {
        name: name,
        role: "user"
    }

    res.send({status: "success", payload: req.user.name});
}

const loginSession = async (req, res) => {
    const {name, password} = req.body;

    req.session.user = {
        name: name,
        role: "user"
    }

    res.send({status: "success", payload: req.session.user});
}

export default {
    registerSession,
    loginSession
}