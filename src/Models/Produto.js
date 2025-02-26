import Sequelize, {Model} from 'sequelize'

import Categoria from '../Models/Categoria'

export default class Produto extends Model{


  // static associate(models){

  //   this.belongsTo(models.Categoria, {foreignKey: 'CATEGORIA_ID', });

  //   this.hasMany(models.Fotos_Dos_Produtos, {foreignKey: 'PRODUTO_ID'});

  //   this.belongsToMany(models.Carrinho, {through: 'Carrinho_Produto', foreignKey: 'PRODUTO_ID'});


  // }

  // Vamos criar um metodo de instancia para gerar um codigo para o produto

  async GerarCodigo(nome_produto, categoria_produto, sequencial = 1) {
    // Garantir que os parâmetros sejam strings e tratar espaços em excesso
    const nome = nome_produto.trim().toUpperCase();

    const categoria =  await Categoria.findByPk(categoria_produto)

    if(!categoria){

      throw new Error( 'CATEGORIA NÃO ENCONTRADA')
    }
    const categoria_nome = categoria.NOME.trim().toUpperCase();

    // Abreviação da categoria (primeiras 3 letras ou menos, caso seja curta)
    const abreviacaoCategoria = categoria_nome.slice(0, 3);

    // Abreviação do nome (primeiras 3 letras do nome do produto)
    const abreviacaoNome = nome.replace(/\s+/g, "").slice(0, 3);

    // Ano e mês (formato AAAA-MM)
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, "0");

    const milisegundos = dataAtual.getMilliseconds();

    // Sequencial formatado (com 4 dígitos)
    const sequenciaFormatada = String(sequencial).padStart(6, "0");

    // Gera o código final
    const codigoFinal = `${abreviacaoCategoria}-${abreviacaoNome}-${ano}${mes}-${milisegundos}-${sequenciaFormatada}`;
    return codigoFinal;
  }

  static init(sequelize){

    super.init({


      Nome: {

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

        Preco:{

          type: Sequelize.FLOAT,

          allowNull: false,

          validate: {

            isFloat:{

              msg: "O CAMPO DEVE SER UM VALOR DECIMAL"
            },

            notEmpty:{

              msg: "O CAMPO PRECO NÃO PODE ESTAR VAZIO"
            }
          }
     },

        Quantidade:{

          type: Sequelize.INTEGER,

          allowNull: false,

          validate:{


            isInt:{

              msg: "O CAMPO QUANTIDADE NÃO PODE CONTER LETRAS OU SÍMBOLOS"
            },

            notEmpty:{

              msg: "O CAMPO QUANTIDADE NÃO PODE ESTAR VAZIO"
            }
          }

        },

        Codigo:{

          type: Sequelize.STRING,

          allowNull: true,

          unique:{

            msg: "CODIGO JÁ REGISTRADO"

          },

        },

       Descricao:{

          type: Sequelize.STRING,

          allowNull: false,

          validate:{

            notEmpty:{

              msg: "O CAMPO DESCRICAO NÃO PODE ESTAR VAZIO"
            }
          }



        },

        Categoria_ID:{

          type: Sequelize.INTEGER,

          allowNull: false,

          references:{

            model: "Categoria",

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


      if(Produto.changed('Categoria_ID')){

        // Vamos verificar se a categoria existe

        // const categoria = await Categoria.findByPk(Produto.CATEGORIA_ID)

        // if(!categoria){

        //   throw new Error("Categoria não encontrada!");
        // }


      }

      Produto.Codigo = await Produto.GerarCodigo(Produto.Nome, Produto.Categoria_ID)

    })

    return this
  }

}
