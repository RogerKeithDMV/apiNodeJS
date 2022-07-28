const axios = require("axios").default;
const log = require('../../helpers/logger');
const rabbitmq = require('rabbitmqcg-nxg-oih');

module.exports.process = async function processTrigger(msg, cfg, snapshot = {}){
    try {

        log.info("Inside processTrigger()");
        log.info("Msg=" + JSON.stringify(msg));
        log.info("Config=" + JSON.stringify(cfg));
        log.info("Snapshot=" + JSON.stringify(snapshot));

        let properties = {
            auth:null,
            method:null,
            api:null
        };

        let{data}=msg;

        if(!data){
          this.emit('', '${ERROR_PROPERTY} data');
          throw new Error('${ERROR_PROPERTY} data');
        }

        Object.keys(properties).forEach((value) => {

          if (data.hasOwnProperty(value)) {

              properties[value] = data[value];

          } else if (cfg.hasOwnProperty(value)) {

              properties[value] = cfg[value];

          } else {

              log.error(`${ERROR_PROPERTY} ${value}`);

              throw new Error(`${ERROR_PROPERTY} ${value}`);

          }

      });

        if(!data){
          this.emit('', '${ERROR_PROPERTY} data');
          throw new Error('${ERROR_PROPERTY} data');
        }

        Object.keys(properties).forEach((value) => {

          if (data.hasOwnProperty(value)) {

              properties[value] = data[value];

          } else if (cfg.hasOwnProperty(value)) {

              properties[value] = cfg[value];

          } else {

              log.error(`${ERROR_PROPERTY} ${value}`);

              throw new Error(`${ERROR_PROPERTY} ${value}`);

          }

      });

        const token = properties.auth.toString();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
        let _data=await axios({
            method: properties.method.toString(),
            url: properties.api.toString()
        }).then(function (response) {
            return response;
          });

        _data={"text": _data.data};
              
        this.emit('data',  {data: _data});
        console.log("respuesta: ", {data: _data});
        this.emit('snapshot', snapshot);

        log.info('Finished api execution');
        this.emit('end');
    } catch (e) {
        log.error(`ERROR: ${e}`);
        this.emit('error', e);
        await rabbitmq.producerErrorMessage(e);
    }
};