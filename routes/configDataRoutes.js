const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const fetch = require('node-fetch');

const Configdata = mongoose.model('Configdata');

module.exports = app => {
  /*app.get('/api/blogs/:id', requireLogin, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id
    });

    res.send(blog);
  });
*/

app.get('/api/getDataFromOpServer', requireLogin, async (req, res) => {
    //user url provided by operator to fetch data from operator server
    fetch('http://10.221.31.36:5000/api/allConfigData').then(response => {
        return response.json();
    }).then(data => {
        // Work with JSON data here
        console.log(data);
        res.send(data);
    }).catch(err => {
        // Do something for an error here
    });
});


  app.get('/api/allConfigData', requireLogin, async (req, res) => {
    const data = await Configdata.find({});

    res.send(data);
  });

  app.post('/api/ConfigData', requireLogin, async (req, res) => {
    //const data = await Configdata.find({});
    const { configType, operatorID, tableName, paramName, domain } = req.body;
    console.log('req.body: '+req.body);
    console.log('configTypeVal: '+configType);
    console.log('operatorIDVal: '+operatorID);

    const data = new Configdata({
        configType: configType,
        operatorID: operatorID,
        tableName: tableName,
        paramName: paramName,
        domain:domain
    });

    try {
        await data.save();
        res.send("data saved to db");
    } catch (err) {
        res.send(400, err);
    }

    //res.send("done");
  });

};
