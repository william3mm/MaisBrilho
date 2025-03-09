import Sequelize, {Model} from 'sequelize'

import GerarCodigo from '../Funcoes/Gera_Codigo_Produto';

export default class Produto extends Model{


  static associate(models){

    // Todo Produto pertence a uma categoria
    this.belongsTo(models.Categoria, {foreignKey: 'CATEGORIA_ID', });

    // // Um Produto pode estar em vários carrinhos
    // this.belongsToMany(models.Carrinho, {through: 'Carrinho_Produto', foreignKey: 'Produto_ID'});

    // Um Produto pode ser criado por vários vendedores
    this.belongsToMany(models.Vendedor, {through: 'Produto_Vendedor', foreignKey: 'Produto_ID'}, );

    // Podemos acessar diretamente dados na tabela Produto_Vendedor (Quantidade Criada)
    this.hasMany(models.Produto_Vendedor, {foreignKey: 'Produto_ID'})

    // // Podemos acessar diretamente dados na tabela Carrinho_Produto (Quantidade selecionada)
    // this.hasMany(models.Carrinho_Produto, {foreignKey: 'Produto_ID'})


  }

  // Vamos criar um metodo de instancia para gerar um codigo para o produto



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

          type: Sequelize.DECIMAL(10,2),

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

      Produto.Codigo = await GerarCodigo(Produto.Nome, Produto.Categoria_ID);

    })

    return this
  }

}
