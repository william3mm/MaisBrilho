import multer from "multer";

import {extname, resolve} from 'path';

const aleatorio = () =>{

  return Math.floor(Math.random() * (20000-100000) + 10000);
}

export default {

  storage:  multer.diskStorage({ // Vamos dizer que vamos salvar dentro de alguma pasta

    // Vamos dizer onde o arquivo vai ser salvo
    destination: (req,file, cb)=> {

      cb(null, resolve(__dirname, '..', '..', 'Uploads')) // Caso ocorra um erro receberiamos na nossa funcao callback no primeiro argumento e no segundo passamos onde vamos salvar a nossa imagem




    },

    filename: (req,file, cb) => {
                              // A funcao extname vai extrar apenas a extensao do arquvo
      cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`)

    }


  })
}
