const errorHandling = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Quantum Database Failure Detected", details: err.message });
};

module.exports = errorHandling;
