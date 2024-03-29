var userservice = require('./userservice');
var getData = async (req, res) => {
    console.log(req.body);
    var details = await userservice.getData();
    res.send({ "status": true, "data": details });
}

var createData = async (req, res) => {
    console.log(req.body);
        var status = await userservice.createData(req.body);
        if (status) {
            res.send({ "status": true, "message": " Data created Successfully !! " });
        } else {
            res.send({ "status": false, "message": " Error in creating Data !!" });
        }}

 var updateData = async (req, res) => {
        var result = await userservice.updateData(req.params.id, req.body);
        if (result) {
            res.send({ "status": true, "message": " Data updated Successfully !! " });
        } else {
            res.send({ "status": false, "message": " Error in updating Data !! " });
        }
    }
    var deleteData = async (req, res) => {
        var result = await userservice.deleteData(req.params.id, req.query.index);
        if (result) {
            res.send({ "status": true, "message": " Data deleted Successfully !! " });
        } else {
            res.send({ "status": false, "message": " Error in deleting Data !! " });
        }
    }
    module.exports = {
        getData,
        createData,
        updateData,
        deleteData,
    };
