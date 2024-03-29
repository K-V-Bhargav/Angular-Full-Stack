var usermodel = require('./usermodel');

module.exports.getData = () => {
    return new Promise(function (resolve, reject) {
        usermodel.find({})
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            });
    });
};

module.exports.createData = (details) => {
    return new Promise(function myFunction(resolve, reject) {
        var detailsModelData =  new usermodel(details);
        detailsModelData.save()
            .then(result => {
                resolve(true);
            })
            .catch(error => {
                reject(error);
            });
    });
};

module.exports.updateData = async (id, details) => {
    try {
        let userData = await usermodel.findById(id);
        if (details.comments) {
            let data = userData.comments || [];
            data = data.concat(details.comments);
            let result = await usermodel.findByIdAndUpdate(id, { "$set": { comments: data } }, { new: true });
            return result;
        } else {
            let result = await usermodel.findByIdAndUpdate(id, details, { new: true });
            return result;
        }
    } catch (error) {
        throw error;
    }
};

module.exports.deleteData = async (id, index) => {
    try {
        console.log("id:",id);
        console.log("index:",index);
        if (!id) {
            console.log('Invalid parameters. Provide at least an id.');
            return { error: 'Invalid parameters. Provide at least an id.', status: 400 };
        }
        if (index === undefined) {
            let result = await usermodel.findOneAndDelete({ _id: id });
            return result;
        }
        let user = await usermodel.findById(id);
        console.log('User:', user);
        if (!user) {
            console.log('User not found');
            return { error: 'User not found', status: 404 };
        }
        console.log('User comments:', user.comments);
        if (user.comments && index >= 0 && index < user.comments.length) {
            user.comments.splice(index, 1);
            let result = await user.save();
            return result;
        }
        console.log('Invalid index or comments array does not exist.');
        return { error: 'Invalid index or comments array does not exist.', status: 400 };
    } catch (error) {        
        throw error;
    }
};

  