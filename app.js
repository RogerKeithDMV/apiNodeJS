const ApiClient = require('./helpers/helper');

const processTrigger = async (msg, cfg, snapshot = {}) => {
  try {
    console.log("Iniciando proceso Api Client...");
    console.log("Config=" + cfg);

    snapshot.lastUpdated = snapshot.lastUpdated || new Date();

      const result = await ApiClient(cfg);

        if(boolFile){
          this.emit('data', {filename:fileReq, text:result.toString()});
        }
        else{
          this.emit('data', result);
        }
      
      this.emit('data', result);
      snapshot.lastUpdated = new Date();
      console.log(`New snapshot: ${snapshot.lastUpdated}`);
      this.emit('snapshot', snapshot);
      this.emit('end');
  } catch (e) {
    console.log(`ERROR: ${e}`);
    this.emit('error', e);
  }
}

module.exports={process:processTrigger}