const axios = require("axios").default;
const log = require('../../helpers/logger');
const rabbitmq = require('rabbitmqcg-nxg-oih');

module.exports.process = async function processTrigger(msg, cfg, snapshot = {}){
    try {

        log.info("Inside processTrigger()");
        log.info("Config=" + JSON.stringify(cfg));

        let {
            auth,
            method,
            api
        } = cfg;

        const token = auth.toString();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
        let {data} = await axios({
            method: method.toString(),
            url: api.toString()
        });
              
        this.emit('data', {data});
        console.log("respuesta: ",data);
        this.emit('snapshot', snapshot);

        log.info('Finished api execution');
        this.emit('end');
    } catch (e) {
        log.error(`ERROR: ${e}`);
        this.emit('error', e);
        await rabbitmq.producerMessage(e);
    }
};