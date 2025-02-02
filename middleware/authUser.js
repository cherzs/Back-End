const { User } = require("../config/model/index");

const verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Mohon Login ke akun anda" });
  }
  const user = await User.findOne({
    where: {
      id_user: req.session.userId,
    },
  });
  if (!user) {
    return res.status(404).json({ message: "User tidak ditemukan" });
  }
  req.userId = user.id;
  req.role = user.role;
  next();
};

const verifyAdmin = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      id_user: req.session.userId,
    },
  });
  if (!user) {
    return res.status(404).json({ message: "User tidak ditemukan" });
  }
  if (user.role !== "admin") {
    return res.status(403).json({ message: "Anda tidak memiliki akses" });
  }
  next();
};

(module.exports = verifyUser), verifyAdmin;
