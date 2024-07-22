const catchAsync = require('./../utils/catchAsync');

/* Get chatlist */
exports.getDoc = catchAsync(async (req, res, next) => {
  var db = req.app.get('db');
  var data = '';

  db.ref('/').once('value').then((snapshot) => {
    data = snapshot.val();

    res.status(200).json({
      msg: 'success',
      data
    });
  });
});

exports.updateDoc = catchAsync(async (req, res, next) => {
  var db = req.app.get('db');
  var keyName = req.query.subject;
  var front = req.query.front;
  var back = req.query.back;

  var dataToSave = {
    'front': front,
    'back': back
  };

  // Write data to Firebase Realtime Database
  if(keyName){
    db.ref(`/${keyName}`).push(dataToSave).then(() => {
      res.status(203).json({
        msg: 'Update Successful!'
      });
    });
  }else{
    res.status(403).json({
      msg: 'Failed: no subject param'
    });
  }
});

exports.resetDoc = catchAsync(async (req, res, next) => {
  var db = req.app.get('db');
  // Write data to Firebase Realtime Database
  db.ref('/').set({}).then(() => {
    res.status(203).json({
      msg: 'Removed all records'
    });
  });
});