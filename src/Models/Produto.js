import Sequelize, {Model} from 'sequelize'



export default class Produto extends Model{


  static associate(models){

    this.belongsTo(models.Categoria, {foreignKey: 'CATEGORIA_ID', })

    this.hasMany(models.Fotos_Dos_Produtos, {foreignKey: 'PRODUTO_ID'})
  }

  // Vamos criar um metodo de instancia para gerar um codigo para o produto

  GerarCodigo(nome_produto, categoria_produto, sequencial = 1) {
    // Garantir que os parâmetros sejam strings e tratar espaços em excesso
    const nome = nome_produto.trim().toUpperCase();
    const categoria = categoria_produto.trim().toUpperCase();

    // Abreviação da categoria (primeiras 3 letras ou menos, caso seja curta)
    const abreviacaoCategoria = categoria.slice(0, 3);

    // Abreviação do nome (primeiras 3 letras do nome do produto)
    const abreviacaoNome = nome.replace(/\s+/g, "").slice(0, 3);

    // Ano e mês (formato AAAA-MM)
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, "0");

    const segundos = dataAtual.getMilliseconds();

    // Sequencial formatado (com 4 dígitos)
    const sequenciaFormatada = String(sequencial).padStart(6, "0");

    // Gera o código final
    const codigoFinal = `${abreviacaoCategoria}-${abreviacaoNome}-${ano}${mes}-${segundos}-${sequenciaFormatada}`;
    return codigoFinal;
  }

  static init(sequelize){



    super.init({


      NOME: {

        type: Sequelize.STRING,

        allowNull: false,



        validate: {

          len:{

            args: [3,100],

            msg: "O NOME DEVE TER ENTRE 3 E 20CARACTERES"
          },

          notEmpty:{

            msg: "O CAMPO NOME NÃO PODE ESTAR VAZIO"
          }
        },
      },

        PRECO:{

          type: Sequelize.DECIMAL(10,2),

          allowNull: false,

          validate: {

            isInt:{

              msg: "O CAMPO PRECO NÃO PODE CONTER LETRAS OU SÍMBOLOS"
            },

            notEmpty:{

              msg: "O CAMPO SENHA NÃO PODE ESTAR VAZIO"
            }
          }
     },

        QUANTIDADE:{

          type: Sequelize.INTEGER,

          allowNull: false,

          validate:{


            isDecimal:{

              msg: "O CAMPO QUANTIDADE NÃO PODE CONTER LETRAS OU SÍMBOLOS"
            },

            notEmpty:{

              msg: "O CAMPO QUANTIDADE NÃO PODE ESTAR VAZIO"
            }
          }

        },

        CODIGO_VIRTUAL:{

          type: Sequelize.VIRTUAL,

          allowNull:true
        },

        CODIGO:{

          type: Sequelize.STRING,

          allowNull: false,

          unique:{

            msg: "CODIGO JÁ REGISTRADO"

          },

          validate: {


            notEmpty:{

              msg: "O CAMPO CODIGO NÃO PODE ESTAR VAZIO"
            }
          }

        },

        DESCRICAO:{

          type: Sequelize.STRING,

          allowNull: false,

          validate:{

            notEmpty:{

              msg: "O CAMPO QUANTIDADE NÃO PODE ESTAR VAZIO"
            }
          }



        },

        CATEGORIA_ID:{

          type: Sequelize.INTEGER,

          allowNull: false,

          references:{

            model: "CATEGORIA",

            key: "id"
          }
        }

    },{

      sequelize,

      tableName: 'Produto'

    });


    /* Antes de salvar o produto poderiamos adicionar um hook para gerar um codigo com base ao nome do produto e

    a sua categoria
    */

    this.addHook('beforeSave', async Produto=>{


      // if(Produto.CODIGO_VIRTUAL){

      //   const categoria = await sequelize.models.Categoria.findByPk(produto.CATEGORIA_ID);
      //   if (!categoria) {
      //     throw new Error("Categoria não encontrada para o ID fornecido.");
      //   }

      // }





        Produto.CODIGO = Produto.GerarCodigo(Produto.NOME, Produto.CATEGORIA_ID)






    })

    return this
  }




}
